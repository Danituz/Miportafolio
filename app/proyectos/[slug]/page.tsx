"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Figma,
  Calendar,
  ExternalLink,
} from "lucide-react";

import { ParticlesBackground } from "@/components/particles-background";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";
import {
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/projects";

type Theme = "light" | "dark";

// Category styling
const categoryStyles = {
  "desarrollo-web": {
    dark: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    light: "bg-indigo-100 text-indigo-700 border-indigo-200",
    icon: Globe,
  },
  prototipado: {
    dark: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    light: "bg-purple-100 text-purple-700 border-purple-200",
    icon: Figma,
  },
  apps: {
    dark: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    light: "bg-cyan-100 text-cyan-700 border-cyan-200",
    icon: Smartphone,
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setMounted(true);
    const savedTheme = window.localStorage.getItem("miportafolio-theme") as Theme | null;
    const savedLang = window.localStorage.getItem("miportafolio-language") as Language | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("miportafolio-theme", theme);
    window.localStorage.setItem("miportafolio-language", language);
  }, [theme, language, mounted]);

  const isDark = theme === "dark";
  const t = translations[language];

  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-950" />;
  }

  if (!project) {
    notFound();
  }

  const categoryStyle = categoryStyles[project.category];
  const CategoryIcon = categoryStyle.icon;

  return (
    <div
      className={cn(
        "relative min-h-screen w-full transition-colors duration-300",
        isDark ? "bg-gray-950 text-indigo-50" : "bg-white text-slate-900"
      )}
    >
      {/* Particles Background */}
      <ParticlesBackground isDark={isDark} />

      {/* Fixed Controls - On top of hero */}
      <motion.div
        className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/proyectos"
          className={cn(
            "group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium uppercase tracking-wider backdrop-blur-md transition-all",
            isDark
              ? "bg-white/10 text-indigo-100 hover:bg-white/20"
              : "bg-black/10 text-slate-800 hover:bg-black/20"
          )}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">{t.projectsPage.back}</span>
        </Link>
      </motion.div>

      <motion.div
        className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => {
            const newLang = language === "es" ? "en" : "es";
            setLanguage(newLang);
            window.localStorage.setItem("miportafolio-language", newLang);
          }}
          className={cn(
            "rounded-full px-3 py-2 text-xs font-semibold uppercase backdrop-blur-md transition-all",
            isDark
              ? "bg-white/10 text-indigo-100 hover:bg-white/20"
              : "bg-black/10 text-slate-800 hover:bg-black/20"
          )}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </motion.div>

      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden sm:h-[65vh]">
        <motion.div
          className="absolute -inset-x-0 -top-20 -bottom-20"
          style={{ y: imageY }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-gradient-to-b from-gray-950/40 via-gray-950/60 to-gray-950"
                : "bg-gradient-to-b from-white/40 via-white/60 to-white"
            )}
          />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category Badge */}
              <span
                className={cn(
                  "mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium",
                  isDark ? categoryStyle.dark : categoryStyle.light
                )}
              >
                <CategoryIcon className="h-4 w-4" />
                {t.projectsPage.categories[project.category]}
              </span>

              {/* Title + Year */}
              <div className="flex items-baseline gap-4">
                <h1
                  className={cn(
                    "font-ferron text-4xl uppercase leading-none sm:text-5xl lg:text-6xl",
                    isDark ? "text-indigo-50" : "text-slate-900"
                  )}
                >
                  {project.title}
                </h1>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-sm",
                    isDark ? "text-indigo-200/70" : "text-slate-500"
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  {project.year}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* About Section */}
          <h2
            className={cn(
              "font-general text-xs font-semibold uppercase tracking-widest",
              isDark ? "text-indigo-400" : "text-indigo-600"
            )}
          >
            {t.projectsPage.detail.about}
          </h2>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              isDark ? "text-indigo-100/80" : "text-slate-600"
            )}
          >
            {project.longDescription[language]}
          </p>

          {/* Technologies Section */}
          <div className="mt-12">
            <h2
              className={cn(
                "font-general text-xs font-semibold uppercase tracking-widest",
                isDark ? "text-indigo-400" : "text-indigo-600"
              )}
            >
              {project.type === "prototype"
                ? t.projectsPage.detail.tools
                : t.projectsPage.detail.technologies}
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool.name}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium",
                    isDark
                      ? "bg-indigo-500/10 text-indigo-200"
                      : "bg-indigo-50 text-indigo-700"
                  )}
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links */}
          {(project.links.live || project.links.figma || project.links.github) && (
            <div className="mt-12 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-normal uppercase transition-colors",
                    isDark
                      ? "border-indigo-300/60 text-indigo-50 hover:border-indigo-200 hover:text-indigo-50"
                      : "border-indigo-200 text-indigo-900 hover:border-indigo-300 hover:text-indigo-800"
                  )}
                >
                  {t.projectsPage.detail.liveDemo}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.links.figma && (
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-normal uppercase transition-colors",
                    isDark
                      ? "border-indigo-300/60 text-indigo-50 hover:border-indigo-200 hover:text-indigo-50"
                      : "border-indigo-200 text-indigo-900 hover:border-indigo-300 hover:text-indigo-800"
                  )}
                >
                  <Figma className="h-4 w-4" />
                  {t.projectsPage.detail.viewFigma}
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Project Navigation */}
        <motion.div
          className={cn(
            "mt-20 flex items-center justify-between border-t pt-10",
            isDark ? "border-white/10" : "border-slate-200"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {prev ? (
            <Link
              href={`/proyectos/${prev.slug}`}
              className={cn(
                "group flex items-center gap-3 transition-colors",
                isDark
                  ? "text-indigo-200/70 hover:text-indigo-200"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <span
                  className={cn(
                    "block text-xs uppercase tracking-wider",
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  )}
                >
                  {t.projectsPage.detail.previousProject}
                </span>
                <span className="font-medium">{prev.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/proyectos/${next.slug}`}
              className={cn(
                "group flex items-center gap-3 text-right transition-colors",
                isDark
                  ? "text-indigo-200/70 hover:text-indigo-200"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              <div>
                <span
                  className={cn(
                    "block text-xs uppercase tracking-wider",
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  )}
                >
                  {t.projectsPage.detail.nextProject}
                </span>
                <span className="font-medium">{next.title}</span>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </main>

      <Footer isDark={isDark} language={language} />
    </div>
  );
}
