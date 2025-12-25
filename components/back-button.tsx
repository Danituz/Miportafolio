"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  label: string;
  isDark: boolean;
  fixed?: boolean;
}

export function BackButton({ href, label, isDark, fixed = true }: BackButtonProps) {
  return (
    <motion.div
      className={cn(fixed && "fixed left-4 top-4 z-50 sm:left-6 sm:top-6")}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium uppercase tracking-wider backdrop-blur-md transition-all",
          isDark
            ? "bg-white/5 text-indigo-200 hover:bg-white/10 hover:text-indigo-100"
            : "bg-black/5 text-indigo-700 hover:bg-black/10 hover:text-indigo-900"
        )}
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    </motion.div>
  );
}
