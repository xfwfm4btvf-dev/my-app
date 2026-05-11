"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 149, 255, 1)",
  onClick,
}: ShimmerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative z-0 flex items-center justify-center overflow-hidden rounded-full border border-white/10 px-6 py-3 font-medium text-white backdrop-blur-lg transition-shadow duration-300 ease-in-out hover:shadow-xl",
        className
      )}
      style={{
        background,
        borderRadius,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className="pointer-events-none absolute inset-0 z-[-1] animate-shimmer"
        style={{
          background: `radial-gradient(${shimmerSize} ${shimmerSize} at var(--x, 50%) var(--y, 50%), ${shimmerColor} 0%, transparent 100%)`,
          animationDuration: shimmerDuration,
        }}
      />
      {children}
    </motion.button>
  );
}