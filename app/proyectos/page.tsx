"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type Language = "es" | "en";

const projects = [
  {
    title: "ISC Producciones",
    description: "App de gestión de eventos para el área de audio y multimedia. Sistema mobile-first que permite administrar eventos y visualizar información en tiempo real.",
    image: "/images/projects/01.svg",
    tech: ["Next.js", "Supabase", "shadcn/ui"],
    link: "https://isc-producciones.vercel.app",
    size: "large",
  },
  {
    title: "Tarjetas Digitales",
    description: "Generador de tarjetas personalizadas para colaboradores con integración a redes sociales.",
    image: "/images/projects/02.svg",
    tech: ["React", "Node.js", "Tailwind"],
    link: null,
    size: "medium",
  },
  {
    title: "CMS Luxtar",
    description: "Panel de gestión de contenido con módulos de métricas y análisis SEO.",
    image: "/images/projects/03.svg",
    tech: ["React", "Supabase"],
    link: null,
    size: "medium",
  },
  {
    title: "Proyecto Personal",
    description: "Exploración de animaciones y microinteracciones.",
    image: "/images/projects/04.svg",
    tech: ["Framer Motion"],
    link: null,
    size: "small",
  },
  {
    title: "Landing Page",
    description: "Diseño y desarrollo de landing para campaña.",
    image: "/images/projects/05.svg",
    tech: ["Astro", "Tailwind"],
    link: null,
    size: "small",
  },
];

export default function ProyectosPage() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (
      (window.localStorage.getItem("miportafolio-theme") as Theme | null) ??
      "dark"
    );
  });
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "es";
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

      <div className="relative mx-auto w-full max-w-6xl">
        <main className="relative flex flex-col pb-12 pt-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link
              href="/"
              className={cn(
                "mb-4 inline-flex items-center gap-2 text-sm transition hover:gap-3",
                isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <h1
              className={cn(
                "font-ferron text-5xl uppercase leading-none sm:text-7xl lg:text-8xl",
                isDark ? "text-indigo-100" : "text-indigo-800",
              )}
            >
              PROYECTOS
            </h1>
            <p
              className={cn(
                "mx-auto max-w-2xl font-general text-base leading-relaxed sm:text-lg",
                isDark ? "text-indigo-100/80" : "text-slate-600",
              )}
            >
              Una selección de trabajos recientes y conceptos experimentales.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="mt-12 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            {/* Large card */}
            <motion.a
              href={projects[0].link || "#"}
              target={projects[0].link ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={cn(
                "group relative col-span-2 row-span-2 overflow-hidden rounded-2xl border transition-all hover:-translate-y-1",
                isDark
                  ? "border-indigo-100/10 bg-white/[0.02] hover:border-indigo-100/20"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300",
              )}
            >
              <div className="absolute inset-0">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  className="object-cover opacity-80 transition-transform group-hover:scale-105"
                />
                <div
                  className={cn(
                    "absolute inset-0",
                    isDark
                      ? "bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"
                      : "bg-gradient-to-t from-white via-white/60 to-transparent",
                  )}
                />
              </div>
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6 text-left">
                <div className="mb-2 flex flex-wrap gap-2">
                  {projects[0].tech.map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        isDark
                          ? "bg-indigo-500/20 text-indigo-200"
                          : "bg-indigo-100 text-indigo-700",
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3
                  className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-indigo-50" : "text-slate-900",
                  )}
                >
                  {projects[0].title}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    isDark ? "text-indigo-100/60" : "text-slate-600",
                  )}
                >
                  {projects[0].description}
                </p>
                {projects[0].link && (
                  <span
                    className={cn(
                      "mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider",
                      isDark ? "text-indigo-400" : "text-indigo-600",
                    )}
                  >
                    Ver proyecto
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </motion.a>

            {/* Medium cards */}
            {projects.slice(1, 3).map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx + 1) * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border transition-all hover:-translate-y-1",
                  isDark
                    ? "border-indigo-100/10 bg-white/[0.02] hover:border-indigo-100/20"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300",
                )}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 transition-transform group-hover:scale-105"
                  />
                  <div
                    className={cn(
                      "absolute inset-0",
                      isDark
                        ? "bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40"
                        : "bg-gradient-to-t from-white via-white/80 to-white/40",
                    )}
                  />
                </div>
                <div className="relative flex h-full min-h-[160px] flex-col justify-end p-4 text-left">
                  <div className="mb-1.5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[9px] font-medium",
                          isDark
                            ? "bg-indigo-500/20 text-indigo-200"
                            : "bg-indigo-100 text-indigo-700",
                        )}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    className={cn(
                      "text-base font-semibold",
                      isDark ? "text-indigo-50" : "text-slate-900",
                    )}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-0.5 line-clamp-2 text-xs",
                      isDark ? "text-indigo-100/50" : "text-slate-500",
                    )}
                  >
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Small cards */}
            {projects.slice(3, 5).map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx + 3) * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border transition-all hover:-translate-y-1",
                  isDark
                    ? "border-indigo-100/10 bg-white/[0.02] hover:border-indigo-100/20"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300",
                )}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40 transition-transform group-hover:scale-105"
                  />
                  <div
                    className={cn(
                      "absolute inset-0",
                      isDark
                        ? "bg-gradient-to-t from-gray-950 via-gray-950/90 to-gray-950/60"
                        : "bg-gradient-to-t from-white via-white/90 to-white/60",
                    )}
                  />
                </div>
                <div className="relative flex h-full min-h-[120px] flex-col justify-end p-4 text-left">
                  <h3
                    className={cn(
                      "text-sm font-semibold",
                      isDark ? "text-indigo-50" : "text-slate-900",
                    )}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-0.5 line-clamp-1 text-[11px]",
                      isDark ? "text-indigo-100/50" : "text-slate-500",
                    )}
                  >
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="mt-12 flex items-center justify-center">
            <Button
              variant="outline"
              className={cn(
                "gap-2 border-indigo-300/60 px-6 text-sm font-normal uppercase text-indigo-50 hover:border-indigo-200 hover:text-indigo-50",
                !isDark &&
                  "border-indigo-200 text-indigo-900 hover:border-indigo-300 hover:text-indigo-800",
              )}
              asChild
            >
              <a
                href="https://github.com/danieltuz"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                Ver más en GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
