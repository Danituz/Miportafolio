"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Languages,
  Loader2,
  Menu,
  MessageCircle,
  Send,
  SunMoon,
  X,
} from "lucide-react";

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
import { Toast } from "@/components/ui/toast";
import { translations, type Language } from "@/lib/translations";

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
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navItems: NavItem[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.projects, href: "/proyectos" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xgowddgj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setContactOpen(false);
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = cn(
    "mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm font-normal outline-none transition-all",
    "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
  );

  const contactFormContent = (
    <DialogContent
      className={cn(
        "max-w-sm gap-4 rounded-2xl px-6 py-5 text-left",
        !isDark && "border-indigo-200 bg-white/95 text-slate-900 shadow-2xl",
      )}
    >
      <DialogHeader className="space-y-1 text-left">
        <DialogTitle
          className={cn(
            "font-general text-lg font-bold uppercase",
            isDark ? "text-indigo-50" : "text-slate-900",
          )}
        >
          {t.contact.title}
        </DialogTitle>
        <DialogDescription
          className={cn(
            "font-general text-sm",
            isDark ? "text-indigo-100/70" : "text-slate-600",
          )}
        >
          {t.contact.description}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span
            className={cn(
              "font-general text-[10px] font-semibold uppercase tracking-wide",
              isDark ? "text-indigo-100/60" : "text-slate-500",
            )}
          >
            {t.contact.name}
          </span>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder={t.contact.namePlaceholder}
            className={cn(
              inputClass,
              isDark
                ? "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30 hover:border-indigo-500/40"
                : "border-indigo-200 bg-white text-slate-900 placeholder:text-slate-400 hover:border-indigo-300",
            )}
          />
        </label>

        <label className="block">
          <span
            className={cn(
              "font-general text-[10px] font-semibold uppercase tracking-wide",
              isDark ? "text-indigo-100/60" : "text-slate-500",
            )}
          >
            {t.contact.email}
          </span>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder={t.contact.emailPlaceholder}
            className={cn(
              inputClass,
              isDark
                ? "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30 hover:border-indigo-500/40"
                : "border-indigo-200 bg-white text-slate-900 placeholder:text-slate-400 hover:border-indigo-300",
            )}
          />
        </label>

        <label className="block">
          <span
            className={cn(
              "font-general text-[10px] font-semibold uppercase tracking-wide",
              isDark ? "text-indigo-100/60" : "text-slate-500",
            )}
          >
            {t.contact.message}
          </span>
          <textarea
            rows={3}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder={t.contact.messagePlaceholder}
            className={cn(
              "mt-1.5 w-full resize-none rounded-xl border px-3 py-2.5 text-sm font-normal outline-none transition-all",
              "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
              isDark
                ? "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30 hover:border-indigo-500/40"
                : "border-indigo-200 bg-white text-slate-900 placeholder:text-slate-400 hover:border-indigo-300",
            )}
          />
        </label>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full justify-center gap-2 text-xs",
            !isDark && "bg-indigo-600 text-white hover:bg-indigo-500",
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {t.contact.sending}
            </>
          ) : (
            <>
              {t.contact.send}
                            <Send className="h-3.5 w-3.5" />


            </>
          )}
        </Button>
      </form>
    </DialogContent>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className={cn(
            "border-b backdrop-blur-xl transition-colors",
            isDark
              ? "border-white/10 bg-gray-950/70"
              : "border-slate-200/60 bg-white/70",
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
                src={isDark ? "/mislogos/logodaniel.png" : "/mislogos/logodaniel_light.png"}
                alt="Daniel Tuz Logo"
                width={60}
                height={60}
                priority
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
              <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogTrigger asChild>
                  <button
                    className={cn(
                      "font-general text-sm uppercase tracking-wider transition hover:text-indigo-400",
                      isDark ? "text-indigo-100/80" : "text-slate-600",
                    )}
                  >
                    {t.nav.contact}
                  </button>
                </DialogTrigger>
                {contactFormContent}
              </Dialog>
            </nav>

            {/* Desktop Controls */}
            <div className="hidden items-center gap-2 md:flex">
              {/* Theme toggle - hidden for now
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
                aria-label={isDark ? t.nav.lightMode : t.nav.darkMode}
              >
                <SunMoon className="h-6 w-6" />
              </Button>
              */}

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
                  aria-label="Select language"
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
              <button
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition",
                  isDark
                    ? "text-indigo-100 hover:bg-white/10"
                    : "text-slate-700 hover:bg-slate-100",
                )}
                onClick={() => onLanguageChange(language === "es" ? "en" : "es")}
                aria-label="Change language"
              >
                {language === "es" ? "EN" : "ES"}
              </button>

              <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full",
                      isDark
                        ? "text-indigo-100 hover:bg-white/10"
                        : "text-slate-700 hover:bg-slate-100",
                    )}
                    aria-label={t.nav.contact}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                {contactFormContent}
              </Dialog>

              <button
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition",
                  isDark
                    ? "text-indigo-100 hover:bg-white/10"
                    : "text-slate-700 hover:bg-slate-100",
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
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

            </nav>
          </div>
        </div>
      </header>

      <Toast
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t.toast.success}
        description={t.toast.successDescription}
        isDark={isDark}
        duration={5000}
      />
    </>
  );
}
