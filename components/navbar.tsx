"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Languages, Menu, MessageCircle, SunMoon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Language = "es" | "en";

export type NavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  isDark: boolean;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onThemeToggle: () => void;
}

export function Navbar({
  isDark,
  language,
  onLanguageChange,
  onThemeToggle,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ContactDialog = ({ children }: { children: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "text-left",
          !isDark && "border-indigo-200 bg-white/95 text-slate-900 shadow-2xl",
        )}
      >
        <DialogHeader className="space-y-4 text-left">
          <DialogTitle className="font-general text-2xl font-bold uppercase text-indigo-50">
            CONTACTAME
          </DialogTitle>
          <DialogDescription
            className={cn(
              "font-general text-base leading-relaxed",
              isDark ? "text-indigo-100" : "text-slate-600",
            )}
          >
            Compárteme tu idea o proyecto y te responderé a la brevedad.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4 space-y-4">
          <label className="block font-general text-xs uppercase">
            Nombre
            <input
              type="text"
              placeholder="¿Cómo te llamas?"
              className={cn(
                "mt-2 w-full rounded-2xl border px-4 py-3 text-base font-normal outline-none transition focus:ring-2 focus:ring-indigo-500",
                isDark
                  ? "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30"
                  : "border-indigo-200 bg-white text-slate-900 placeholder:text-slate-400",
              )}
            />
          </label>
          <label className="block font-general text-xs uppercase">
            Email
            <input
              type="email"
              placeholder="nombre@correo.com"
              className={cn(
                "mt-2 w-full rounded-2xl border px-4 py-3 text-base font-normal outline-none transition focus:ring-2 focus:ring-indigo-500",
                isDark
                  ? "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30"
                  : "border-indigo-200 bg-white text-slate-900 placeholder:text-slate-400",
              )}
            />
          </label>
          <label className="block font-general text-xs uppercase">
            Mensaje
            <textarea
              rows={4}
              placeholder="Cuéntame sobre tu proyecto"
              className={cn(
                "mt-2 w-full rounded-2xl border px-4 py-3 text-base font-normal outline-none transition focus:ring-2 focus:ring-indigo-500",
                isDark
                  ? "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30"
                  : "border-indigo-200 bg-white text-slate-900 placeholder:text-slate-400",
              )}
            />
          </label>
          <Button type="submit" className="w-full justify-center">
            Enviar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "border-b backdrop-blur-md transition-colors",
          isDark
            ? "border-white/5 bg-gray-950/80"
            : "border-slate-200/50 bg-white/80",
        )}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-ferron text-xl font-bold uppercase tracking-wider transition hover:opacity-80",
              isDark ? "text-indigo-50" : "text-indigo-900",
            )}
          >
            <Image
              src="/mislogos/logodaniel.png"
              alt="Daniel Tuz Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-general text-sm uppercase tracking-wider transition hover:text-indigo-400",
                  isDark ? "text-indigo-100/80" : "text-slate-600",
                )}
              >
                {item.label}
              </Link>
            ))}
            <ContactDialog>
              <button
                className={cn(
                  "font-general text-sm uppercase tracking-wider transition hover:text-indigo-400",
                  isDark ? "text-indigo-100/80" : "text-slate-600",
                )}
              >
                Contáctame
              </button>
            </ContactDialog>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-11 w-11 rounded-full",
                isDark
                  ? "text-indigo-100/80 hover:bg-white/10 hover:text-indigo-50"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
              onClick={onThemeToggle}
              aria-label="Cambiar tema"
            >
              <SunMoon className="h-6 w-6" />
            </Button>

            <div className="relative" ref={languageMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-11 w-11 rounded-full",
                  isDark
                    ? "text-indigo-100/80 hover:bg-white/10 hover:text-indigo-50"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
                aria-label="Seleccionar idioma"
              >
                <Languages className="h-6 w-6" />
              </Button>
              {languageMenuOpen && (
                <div
                  className={cn(
                    "absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border shadow-xl",
                    isDark
                      ? "border-white/10 bg-gray-900/95 backdrop-blur-md"
                      : "border-slate-200 bg-white",
                  )}
                >
                  {(["es", "en"] as Language[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onLanguageChange(option);
                        setLanguageMenuOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-sm transition",
                        option === language
                          ? "bg-indigo-600 text-white"
                          : isDark
                            ? "text-indigo-100 hover:bg-white/5"
                            : "text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      {option === "es" ? "Español" : "English"}
                      <span className="text-[10px] font-semibold uppercase opacity-60">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ContactDialog>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  isDark
                    ? "text-indigo-100 hover:bg-white/10"
                    : "text-slate-700 hover:bg-slate-100",
                )}
                aria-label="Contáctame"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </ContactDialog>

            <button
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition",
                isDark
                  ? "text-indigo-100 hover:bg-white/10"
                  : "text-slate-700 hover:bg-slate-100",
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            mobileMenuOpen ? "max-h-80" : "max-h-0",
          )}
        >
          <nav
            className={cn(
              "flex flex-col gap-1 border-t px-4 py-4",
              isDark ? "border-white/5" : "border-slate-100",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 font-general text-sm uppercase tracking-wider transition",
                  isDark
                    ? "text-indigo-100 hover:bg-white/5"
                    : "text-slate-700 hover:bg-slate-50",
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Controls */}
            <div
              className={cn(
                "mt-2 flex items-center gap-2 border-t pt-4",
                isDark ? "border-white/5" : "border-slate-100",
              )}
            >
              <Button
                variant="ghost"
                size="default"
                className={cn(
                  "flex-1 justify-start gap-2 rounded-xl px-4 py-3",
                  isDark
                    ? "text-indigo-100 hover:bg-white/5"
                    : "text-slate-700 hover:bg-slate-50",
                )}
                onClick={onThemeToggle}
              >
                <SunMoon className="h-5 w-5" />
                {isDark ? "Modo claro" : "Modo oscuro"}
              </Button>

              <Button
                variant="ghost"
                size="default"
                className={cn(
                  "rounded-xl px-4 py-3",
                  isDark
                    ? "text-indigo-100 hover:bg-white/5"
                    : "text-slate-700 hover:bg-slate-50",
                )}
                onClick={() => onLanguageChange(language === "es" ? "en" : "es")}
              >
                {language === "es" ? "EN" : "ES"}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
