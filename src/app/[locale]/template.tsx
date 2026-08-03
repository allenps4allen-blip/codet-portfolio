"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const content = pathname.includes("/demo/")
    ? children
    : <PageTransition>{children}</PageTransition>;

  return (
    <MotionConfig reducedMotion="user">
      {content}
    </MotionConfig>
  );
}
