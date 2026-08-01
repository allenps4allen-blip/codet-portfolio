"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(8px)", "blur(0px)"]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, scale, y, filter }}>
        {children}
      </motion.div>
    </div>
  );
}
