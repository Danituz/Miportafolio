"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  duration?: number;
  isDark?: boolean;
}

export function Toast({
  open,
  onClose,
  title,
  description,
  duration = 4000,
  isDark = true,
}: ToastProps) {
  React.useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -10, x: 20 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "fixed right-4 top-24 z-[100]",
            "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md",
            isDark
              ? "border-emerald-500/30 bg-zinc-950/95 text-indigo-50"
              : "border-emerald-300 bg-white/95 text-slate-900"
          )}
        >
          <CheckCircle2
            className={cn(
              "h-4 w-4 flex-shrink-0",
              isDark ? "text-emerald-400" : "text-emerald-600"
            )}
          />

          <div>
            <p
              className={cn(
                "font-general text-xs font-semibold uppercase tracking-wide",
                isDark ? "text-indigo-50" : "text-slate-900"
              )}
            >
              {title}
            </p>
            {description && (
              <p
                className={cn(
                  "font-general text-xs",
                  isDark ? "text-indigo-100/70" : "text-slate-600"
                )}
              >
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className={cn(
              "ml-2 flex-shrink-0 rounded-full p-1 transition-colors",
              isDark
                ? "text-indigo-100/50 hover:bg-white/10 hover:text-indigo-50"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            )}
            aria-label="Cerrar"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={cn(
              "absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-b-xl",
              isDark ? "bg-emerald-500/50" : "bg-emerald-400/60"
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
