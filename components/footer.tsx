"use client";

import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

import { translations, type Language } from "@/lib/translations";

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: t.footer.sections.about, href: "/#sobre-mi" },
    { label: t.footer.sections.stack, href: "/#stack" },
    { label: t.footer.sections.experience, href: "/#experiencia" },
    { label: t.footer.sections.projects, href: "/#proyectos" },
    { label: t.footer.sections.testimonials, href: "/#comentarios" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-900 via-purple-500 to-indigo-600" />

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/material/imagen_footer2.webp"
          alt=""
          role="presentation"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center lg:items-start">
            <span className="font-allison text-2xl -my-1 text-indigo-200">
              {t.footer.portfolio}
            </span>
            <span className="font-ferron text-2xl uppercase leading-none text-white">
              Daniel Tuz
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-general text-xs uppercase tracking-wider text-indigo-100/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/daniel-tuz-b83918389"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-300/30 text-indigo-200 transition-colors hover:border-indigo-300/60 hover:bg-white/10 hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Pulparindo70"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-300/30 text-indigo-200 transition-colors hover:border-indigo-300/60 hover:bg-white/10 hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="font-general text-[10px] uppercase tracking-wider text-indigo-100/50">
            ©DanielTuzPortafolio {currentYear}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
