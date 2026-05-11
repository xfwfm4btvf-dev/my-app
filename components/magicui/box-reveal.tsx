"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BoxRevealProps {
  children: ReactNode;
  className?: string;
  boxColor?: string;
  duration?: number;
}

export function BoxReveal({
  children,
  className,
  boxColor = "#5046e6",
  duration = 0.5,
}: BoxRevealProps) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 1, width: "100%" }}
        animate={{ opacity: 0, width: "0%" }}
        transition={{ duration, ease: "easeInOut" }}
        style={{ backgroundColor: boxColor }}
        className="absolute inset-0 z-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: duration }}
      >
        {children}
      </motion.div>
    </div>
  );
}