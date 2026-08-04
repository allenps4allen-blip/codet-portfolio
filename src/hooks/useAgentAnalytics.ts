"use client";

import { useCallback, useEffect, useRef } from "react";

const DEMO_VISITED_KEY = "codet-demo-visited";
const QUEUE_KEY = "codet-analytics-queue";
const FLUSH_INTERVAL = 5000;

type EventPayload =
  | { type: "demo_visit" }
  | { type: "demo_message"; topic: string }
  | { type: "demo_prompt_click"; prompt: string }
  | { type: "widget_click"; page: string }
  | { type: "whatsapp_click"; page: string; afterDemo: boolean }
  | { type: "contact_submit"; afterDemo: boolean };

function hasVisitedDemo(): boolean {
  try {
    return sessionStorage.getItem(DEMO_VISITED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markDemoVisited(): void {
  try {
    sessionStorage.setItem(DEMO_VISITED_KEY, "1");
  } catch {}
}

function enqueue(event: EventPayload): void {
  try {
    const queue: EventPayload[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    queue.push(event);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {}
}

async function flush(): Promise<void> {
  let queue: EventPayload[];
  try {
    queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    if (queue.length === 0) return;
    localStorage.setItem(QUEUE_KEY, "[]");
  } catch {
    return;
  }

  try {
    const res = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: queue }),
    });
    if (!res.ok) {
      const existing: EventPayload[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
      localStorage.setItem(QUEUE_KEY, JSON.stringify([...queue, ...existing]));
    }
  } catch {
    const existing: EventPayload[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    localStorage.setItem(QUEUE_KEY, JSON.stringify([...queue, ...existing]));
  }
}

export function useAgentAnalytics() {
  const flusherRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    flusherRef.current = setInterval(flush, FLUSH_INTERVAL);
    const handleUnload = () => flush();
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      if (flusherRef.current) clearInterval(flusherRef.current);
      window.removeEventListener("beforeunload", handleUnload);
      flush();
    };
  }, []);

  const trackDemoVisit = useCallback(() => {
    markDemoVisited();
    enqueue({ type: "demo_visit" });
  }, []);

  const trackMessage = useCallback((topic: string) => {
    enqueue({ type: "demo_message", topic });
  }, []);

  const trackPromptClick = useCallback((prompt: string) => {
    enqueue({ type: "demo_prompt_click", prompt });
  }, []);

  const trackWidgetClick = useCallback((page: string) => {
    enqueue({ type: "widget_click", page });
  }, []);

  const trackWhatsAppClick = useCallback((page: string) => {
    enqueue({ type: "whatsapp_click", page, afterDemo: hasVisitedDemo() });
  }, []);

  const trackContactSubmit = useCallback(() => {
    enqueue({ type: "contact_submit", afterDemo: hasVisitedDemo() });
  }, []);

  return {
    trackDemoVisit,
    trackMessage,
    trackPromptClick,
    trackWidgetClick,
    trackWhatsAppClick,
    trackContactSubmit,
  };
}
