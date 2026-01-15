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
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Navbar({
  language,
  onLanguageChange,
}: NavbarProps) {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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
      const response = await fetch("/api/contact", {
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
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = cn(
    "mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm font-normal outline-none transition-all",
    "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30 hover:border-indigo-500/40"
  );

  const contactFormContent = (
    <DialogContent className="max-w-sm gap-4 rounded-2xl px-6 py-5 text-left">
      <DialogHeader className="space-y-1 text-left">
        <DialogTitle className="font-general text-lg font-bold uppercase text-indigo-50">
          {t.contact.title}
        </DialogTitle>
        <DialogDescription className="font-general text-sm text-indigo-100/70">
          {t.contact.description}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="font-general text-[10px] font-semibold uppercase tracking-wide text-indigo-100/60">
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
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="font-general text-[10px] font-semibold uppercase tracking-wide text-indigo-100/60">
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
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="font-general text-[10px] font-semibold uppercase tracking-wide text-indigo-100/60">
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
              "border-indigo-500/20 bg-zinc-950/60 text-indigo-50 placeholder:text-indigo-100/30 hover:border-indigo-500/40"
            )}
          />
        </label>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full justify-center gap-2 text-xs"
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
        <div className="border-b border-white/10 bg-gray-950/80 backdrop-blur-md transition-colors">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="font-ferron text-xl font-bold uppercase tracking-wider text-indigo-50 transition hover:opacity-80"
            >
              <Image
                src="/mislogos/logodaniel.png"
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
                  className="font-general text-sm uppercase tracking-wider text-indigo-100/80 transition hover:text-indigo-400"
                >
                  {item.label}
                </Link>
              ))}
              <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogTrigger asChild>
                  <button className="font-general text-sm uppercase tracking-wider text-indigo-100/80 transition hover:text-indigo-400">
                    {t.nav.contact}
                  </button>
                </DialogTrigger>
                {contactFormContent}
              </Dialog>
            </nav>

            {/* Desktop Controls */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="relative" ref={languageMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-full text-indigo-100/80 hover:bg-white/10 hover:text-indigo-50"
                  onClick={() => setLanguageMenuOpen((prev) => !prev)}
                  aria-label="Select language"
                >
                  <Languages className="h-6 w-6" />
                </Button>
                {languageMenuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-gray-900/95 shadow-xl backdrop-blur-md">
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
                            : "text-indigo-100 hover:bg-white/5"
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
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-indigo-100 transition hover:bg-white/10"
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
                    className="h-10 w-10 rounded-full text-indigo-100 hover:bg-white/10"
                    aria-label={t.nav.contact}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                {contactFormContent}
              </Dialog>

              <button
                className="flex h-10 w-10 items-center justify-center rounded-full text-indigo-100 transition hover:bg-white/10"
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
              mobileMenuOpen ? "max-h-80" : "max-h-0"
            )}
          >
            <nav className="flex flex-col gap-1 border-t border-white/5 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-general text-sm uppercase tracking-wider text-indigo-100 transition hover:bg-white/5"
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
        isDark={true}
        duration={5000}
      />

      <Toast
        open={showError}
        onClose={() => setShowError(false)}
        title={t.toast.error}
        description={t.toast.errorDescription}
        isDark={true}
        duration={5000}
      />
    </>
  );
}
