"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type Language = "es" | "en";

const experiences = [
  {
    name: "Cocity Loft",
    role: "Desarrollador Web",
    period: "Abr - Nov 2025",
    description:
      "Gestión y mantenimiento del sitio web principal, reestructuración de la sección de blogs y optimización de contenido bajo estándares de SEO. Desarrollo de aplicaciones internas para diferentes departamentos, utilizando estrategias mobile-first.",
    tech: ["WordPress", "Elementor", "HTML", "CSS,", "Next.js", "Supabase", "shadcn/ui"],
    link: "https://cocityloft.com",
    logo: "/images/empresas/cocitylogo-bco.png",
  },
  {
    name: "Luxtar Media",
    role: "Desarrollador Full Stack",
    period: "Ene - Abr 2025",
    description:
      "Desarrollo de una aplicación web para generación de tarjetas digitales personalizadas de colaboradores, con integración a redes sociales. Creación de un CMS interno para gestión de contenido del sitio web, incluyendo módulos de métricas y análisis SEO.",
    tech: ["React", "Node.js", "Tailwind", "shadcn/ui", "Supabase"],
    link: null,
    logo: "/images/empresas/luxtar-icono.png",
  },
  {
    name: "Go1 Technologies",
    role: "Practicante de Desarrollo Frontend",
    period: "May - Ago 2024",
    description:
      "Participación en el desarrollo frontend de una plataforma de recursos humanos, implementando distintos módulos siguiendo el sistema de diseño y guías de estilo de la empresa.",
    tech: ["React", "CSS"],
    link: null,
    logo: "/images/empresas/go1-logo.webp",
  },
];

const stackSections = [
  {
    label: "Lenguajes",
    items: [
      { name: "JavaScript", logo: "/images/logos/javascript.svg" },
      { name: "TypeScript", logo: "/images/logos/ts-logo-512.svg" },
      { name: "PHP", logo: "/images/logos/php_dark.svg" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", logo: "/images/logos/react_dark.svg" },
      { name: "Next.js", logo: "/images/logos/nextjs_icon_dark.svg" },
      { name: "Astro", logo: "/images/logos/astro-icon-light-gradient.svg" },
      { name: "Node.js", logo: "/images/logos/nodejs.svg" },
    ],
  },
  {
    label: "Diseño",
    items: [
      { name: "Figma", logo: "/images/logos/figma.svg" },
      { name: "Affinity", logo: "/images/logos/affinity_designer.svg" },
    ],
  },
  {
    label: "UI & Motion",
    items: [
      { name: "shadcn/ui", logo: "/images/logos/shadcn-ui_dark.svg" },
      { name: "Framer Motion", logo: "/images/logos/motion_dark.svg" },
    ],
  },
  {
    label: "Bases de datos",
    items: [
      { name: "Supabase", logo: "/images/logos/supabase.svg" },
      { name: "MySQL", logo: "/images/logos/mysql-icon-dark.svg" },
    ],
  },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return (
      (window.localStorage.getItem("miportafolio-theme") as Theme | null) ??
      "dark"
    );
  });
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "es";
    }
    return (
      (window.localStorage.getItem("miportafolio-language") as Language | null) ??
      "es"
    );
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("miportafolio-theme", theme);
    window.localStorage.setItem("miportafolio-language", language);
  }, [theme, language]);

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden px-4 pb-12 pt-0 sm:px-6 lg:px-8",
        isDark ? "bg-gray-950 text-indigo-50" : "bg-white text-slate-900",
      )}
    >
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <Navbar
          isDark={isDark}
          language={language}
          onLanguageChange={setLanguage}
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <main className="relative flex flex-1 flex-col pb-26 pt-6">
          <section className="relative flex min-h-[calc(100vh-80px)] flex-col lg:min-h-0 lg:flex-1 lg:flex-row lg:items-center lg:gap-12">
            {/* Mobile: Avatar como fondo desvanecido */}
            <div className="absolute inset-x-0 top-0 h-[70vh] lg:hidden">
              <Image
                src="/avatar.png"
                alt="Avatar de Daniel Tuz"
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
              />
              <div
                className={cn(
                  "absolute inset-0",
                  isDark
                    ? "bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950"
                    : "bg-gradient-to-b from-transparent via-white/50 to-white",
                )}
              />
            </div>

            {/* Desktop: Avatar normal */}
            <div className="hidden flex-1 items-end justify-start lg:flex">
              <div className="relative h-[600px] w-[600px] translate-y-[70px]">
                <Image
                  src="/avatar.png"
                  alt="Avatar de Daniel Tuz"
                  fill
                  sizes="420px"
                  className="rounded-[40px] object-cover shadow-[0_45px_70px_rgba(2,6,23,0.65)]"
                  priority
                />
              </div>
            </div>

            {/* Texto */}
            <div className="relative z-10 mt-auto flex flex-col items-center pb-12 text-center lg:mt-0 lg:flex-1 lg:items-end lg:pb-0 lg:text-right">
              <span
                className={cn(
                  "font-allison text-6xl leading-none text-indigo-100 sm:text-7xl lg:text-9xl",
                  !isDark && "text-indigo-700",
                )}
              >
                Portafolio
              </span>
              <h1
                className={cn(
                  "font-ferron text-5xl uppercase leading-none text-indigo-50 sm:text-7xl lg:text-9xl",
                  !isDark && "text-slate-900",
                )}
              >
                DANIEL TUZ
              </h1>
              <div className="flex flex-wrap items-center justify-center pt-6 lg:justify-end lg:pt-4">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "gap-3",
                    !isDark &&
                      "bg-indigo-600 text-indigo-50 hover:bg-indigo-500",
                  )}
                >
                  <a href="#proyectos">
                    Explorar
                    <ArrowDown className="size-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section
            id="sobre-mi"
            className="relative flex flex-col items-center gap-6 px-4 py-24 text-center sm:py-32"
          >
            <h2
              className={cn(
                "font-ferron text-6xl uppercase leading-none text-indigo-100 sm:text-8xl lg:text-9xl",
                !isDark && "text-indigo-800",
              )}
            >
              SOBRE MI
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg",
                !isDark && "text-slate-600",
              )}
            >
Desarrollador web, full stack. Creo experiencias web que combinan diseño atractivo con código limpio. Me enfoco en interfaces intuitivas, animaciones fluidas y arquitectura escalable.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                className={cn(
                  "border-indigo-300/60 px-6 text-sm font-normal uppercase text-indigo-50 hover:border-indigo-200 hover:text-indigo-50",
                  !isDark &&
                    "border-indigo-200 text-indigo-900 hover:border-indigo-300 hover:text-indigo-800",
                )}
              >
                Descargar CV
                <ArrowDown className="size-4" />
              </Button>
              <a
                href="https://github.com/danieltuz"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-indigo-300/60 text-indigo-50 transition hover:border-indigo-200 hover:text-indigo-50",
                  !isDark &&
                    "border-indigo-200 text-indigo-800 hover:border-indigo-300 hover:text-indigo-900",
                )}
              >
                <Github className="size-5" />
              </a>
            </div>
          </section>

          <section
            id="stack"
            className="relative flex flex-col items-center gap-6 px-4 py-20 text-center"
          >
            <h2
              className={cn(
                "font-ferron text-5xl uppercase leading-none text-indigo-100 sm:text-7xl",
                !isDark && "text-indigo-800",
              )}
            >
              Stack
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg",
                !isDark && "text-slate-600",
              )}
            >
              Tecnologías y herramientas que uso en mi día a día.
            </p>

            <div className="flex flex-wrap items-start justify-center gap-12 pt-8">
              {stackSections.map((section, idx) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-[0.2em]",
                      isDark ? "text-indigo-100/40" : "text-slate-400",
                    )}
                  >
                    {section.label}
                  </span>
                  <div className="flex items-center gap-6">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="flex h-12 w-12 items-center justify-center transition group-hover:-translate-y-1">
                          <Image
                            src={item.logo}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                          />
                        </div>
                        <span
                          className={cn(
                            "text-[11px] font-medium",
                            isDark ? "text-indigo-100/50" : "text-slate-500",
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section
            id="experiencia"
            className="relative mt-16 flex flex-col gap-6 px-4 pb-20 pt-4"
          >
            <h2
              className={cn(
                "font-ferron text-5xl uppercase leading-none text-center text-indigo-100 sm:text-7xl",
                !isDark && "text-indigo-800",
              )}
            >
              Experiencia
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg",
                !isDark && "text-slate-600",
              )}
            >
              Te cuento aquí sobre mi experiencia, trabajando como desarrollador web.
            </p>
            <div className="relative mx-auto w-full max-w-3xl pt-4">
              {/* Timeline line */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-[19px] top-8 h-[calc(100%-4rem)] w-px",
                  isDark
                    ? "bg-gradient-to-b from-indigo-500/50 via-indigo-100/20 to-transparent"
                    : "bg-gradient-to-b from-indigo-400/60 via-slate-300/40 to-transparent",
                )}
              />

              <div className="flex flex-col gap-10">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={exp.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="group relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-0 top-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-all group-hover:scale-110",
                        isDark
                          ? "bg-gray-950 ring-2 ring-indigo-500/50 group-hover:ring-indigo-400"
                          : "bg-white ring-2 ring-indigo-400/50 group-hover:ring-indigo-500",
                      )}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.name}
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <span
                          className={cn(
                            "text-xs font-bold",
                            isDark ? "text-indigo-300" : "text-indigo-600",
                          )}
                        >
                          {exp.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Content card */}
                    <div
                      className={cn(
                        "rounded-xl border p-5 transition-all group-hover:-translate-y-0.5",
                        isDark
                          ? "border-indigo-100/10 bg-white/[0.02] group-hover:border-indigo-100/20 group-hover:bg-white/[0.04]"
                          : "border-slate-200 bg-slate-50/50 group-hover:border-slate-300 group-hover:bg-white",
                      )}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <h3
                            className={cn(
                              "text-lg font-semibold",
                              isDark ? "text-indigo-50" : "text-slate-900",
                            )}
                          >
                            {exp.name}
                          </h3>
                          <span
                            className={cn(
                              "text-sm",
                              isDark ? "text-indigo-100/70" : "text-slate-600",
                            )}
                          >
                            {exp.role}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                            isDark
                              ? "bg-indigo-500/10 text-indigo-300"
                              : "bg-indigo-100 text-indigo-700",
                          )}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed",
                          isDark ? "text-indigo-100/60" : "text-slate-600",
                        )}
                      >
                        {exp.description}
                      </p>

                      {/* Tech stack */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10px] font-medium",
                              isDark
                                ? "bg-indigo-100/10 text-indigo-200"
                                : "bg-slate-200/80 text-slate-600",
                            )}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                            isDark
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-700",
                          )}
                        >
                          Ver sitio
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
