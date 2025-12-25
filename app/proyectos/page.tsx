"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Globe, Smartphone, Figma } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParticlesBackground } from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";
import {
  projects,
  categories,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

type Theme = "light" | "dark";

// Category colors
const categoryColors = {
  "desarrollo-web": {
    dark: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    light: "bg-indigo-100 text-indigo-700 border-indigo-200",
    accent: "hover:border-indigo-400",
  },
  prototipado: {
    dark: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    light: "bg-purple-100 text-purple-700 border-purple-200",
    accent: "hover:border-purple-400",
  },
  apps: {
    dark: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    light: "bg-cyan-100 text-cyan-700 border-cyan-200",
    accent: "hover:border-cyan-400",
  },
};

const categoryIcons = {
  "desarrollo-web": Globe,
  prototipado: Figma,
  apps: Smartphone,
};

export default function ProyectosPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("es");
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | "all"
  >("all");
  const [mounted, setMounted] = useState(false);

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

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Count projects per category
  const projectCounts: Record<string, number> = {
    all: projects.length,
    ...Object.fromEntries(
      categories.map((cat) => [
        cat.id,
        projects.filter((p) => p.category === cat.id).length,
      ])
    ),
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-950" />
    );
  }

  return (
    <div
      className={cn(
        "relative min-h-screen w-full transition-colors duration-300",
        isDark ? "bg-gray-950 text-indigo-50" : "bg-white text-slate-900"
      )}
    >
      {/* Particles Background */}
      <ParticlesBackground isDark={isDark} />

      <Navbar
        isDark={isDark}
        language={language}
        onLanguageChange={setLanguage}
        onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
      />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className={cn(
              "font-ferron text-5xl uppercase leading-none sm:text-7xl lg:text-8xl",
              isDark ? "text-indigo-100" : "text-indigo-800"
            )}
          >
            {t.projects.title}
          </h1>
          <p
            className={cn(
              "mx-auto max-w-2xl font-general text-base leading-relaxed sm:text-lg",
              isDark ? "text-indigo-100/70" : "text-slate-600"
            )}
          >
            {t.projectsPage.subtitle}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* All filter */}
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
              activeCategory === "all"
                ? isDark
                  ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                  : "border-indigo-500 bg-indigo-100 text-indigo-700"
                : isDark
                  ? "border-white/10 text-indigo-200/70 hover:border-white/20 hover:text-indigo-200"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            {t.projectsPage.filterAll}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px]",
                activeCategory === "all"
                  ? isDark
                    ? "bg-indigo-400/30"
                    : "bg-indigo-200"
                  : isDark
                    ? "bg-white/10"
                    : "bg-slate-100"
              )}
            >
              {projectCounts.all}
            </span>
          </button>

          {/* Category filters */}
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            const isActive = activeCategory === category.id;
            const colors = categoryColors[category.id];

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? isDark
                      ? colors.dark + " border-current"
                      : colors.light + " border-current"
                    : isDark
                      ? "border-white/10 text-indigo-200/70 hover:border-white/20"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                )}
              >
                <Icon className="h-4 w-4" />
                {t.projectsPage.categories[category.id]}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px]",
                    isActive
                      ? "bg-current/20"
                      : isDark
                        ? "bg-white/10"
                        : "bg-slate-100"
                  )}
                >
                  {projectCounts[category.id]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.p
                key="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "py-20 text-center text-lg",
                  isDark ? "text-indigo-200/50" : "text-slate-400"
                )}
              >
                {t.projectsPage.noProjects}
              </motion.p>
            ) : (
              <motion.div
                key="projects-grid"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                layout
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    isDark={isDark}
                    language={language}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            className={cn(
              "gap-2 rounded-full border px-6 py-5 text-sm font-medium uppercase tracking-wider transition-all",
              isDark
                ? "border-white/20 text-indigo-200 hover:border-white/40 hover:bg-white/5"
                : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            )}
            asChild
          >
            <a
              href="https://github.com/Pulparindo70"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
              {language === "es" ? "Ver más en GitHub" : "See more on GitHub"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </main>

      <Footer isDark={isDark} language={language} />
    </div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  isDark,
  language,
  index,
}: {
  project: Project;
  isDark: boolean;
  language: Language;
  index: number;
}) {
  const t = translations[language];
  const colors = categoryColors[project.category];
  const Icon = categoryIcons[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/proyectos/${project.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-xl",
          isDark
            ? "border-white/5 bg-white/[0.02] hover:border-white/10"
            : "border-slate-200 bg-slate-50/50 hover:border-slate-300",
          colors.accent
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 3 ? undefined : "lazy"}
            priority={index < 3}
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              isDark ? "opacity-70" : "opacity-80"
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"
                : "bg-gradient-to-t from-white via-white/50 to-transparent"
            )}
          />

          {/* Category Badge */}
          <div className="absolute left-4 top-4">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm",
                isDark ? colors.dark : colors.light
              )}
            >
              <Icon className="h-3 w-3" />
              {t.projectsPage.categories[project.category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5">
          {/* Tech Stack */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool.name}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  isDark
                    ? "bg-white/5 text-indigo-200/80"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {tool.name}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px]",
                  isDark ? "text-indigo-200/50" : "text-slate-400"
                )}
              >
                +{project.tools.length - 3}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3
            className={cn(
              "text-lg font-semibold transition-colors",
              isDark
                ? "text-indigo-50 group-hover:text-white"
                : "text-slate-900 group-hover:text-indigo-700"
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 line-clamp-2 text-sm leading-relaxed",
              isDark ? "text-indigo-100/60" : "text-slate-500"
            )}
          >
            {project.description[language]}
          </p>

          {/* View Project Link */}
          <div
            className={cn(
              "mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
              "opacity-0 group-hover:opacity-100",
              isDark ? "text-indigo-400" : "text-indigo-600"
            )}
          >
            {t.projectsPage.viewProject}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
