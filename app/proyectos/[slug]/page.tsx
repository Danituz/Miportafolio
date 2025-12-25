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

// Category styling
const categoryStyles = {
  "desarrollo-web": {
    className: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    icon: Globe,
  },
  prototipado: {
    className: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    icon: Figma,
  },
  apps: {
    className: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    icon: Smartphone,
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setMounted(true);
    const savedLang = window.localStorage.getItem("miportafolio-language") as Language | null;
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("miportafolio-language", language);
  }, [language, mounted]);

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
    <div className="relative min-h-screen w-full bg-gray-950 text-indigo-50 transition-colors duration-300">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Fixed Controls - On top of hero */}
      <motion.div
        className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/proyectos"
          className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-indigo-100 backdrop-blur-md transition-all hover:bg-white/20"
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
          className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase text-indigo-100 backdrop-blur-md transition-all hover:bg-white/20"
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
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/60 to-gray-950" />
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
                  categoryStyle.className
                )}
              >
                <CategoryIcon className="h-4 w-4" />
                {t.projectsPage.categories[project.category]}
              </span>

              {/* Title + Year */}
              <div className="flex items-baseline gap-4">
                <h1 className="font-ferron text-4xl uppercase leading-none text-indigo-50 sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <span className="flex items-center gap-1.5 text-sm text-indigo-200/70">
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
          <h2 className="font-general text-xs font-semibold uppercase tracking-widest text-indigo-400">
            {t.projectsPage.detail.about}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-indigo-100/80">
            {project.longDescription[language]}
          </p>

          {/* Technologies Section */}
          <div className="mt-12">
            <h2 className="font-general text-xs font-semibold uppercase tracking-widest text-indigo-400">
              {project.type === "prototype"
                ? t.projectsPage.detail.tools
                : t.projectsPage.detail.technologies}
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool.name}
                  className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-200"
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
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-300/60 px-6 py-3 text-sm font-normal uppercase text-indigo-50 transition-colors hover:border-indigo-200 hover:text-indigo-50"
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
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-300/60 px-6 py-3 text-sm font-normal uppercase text-indigo-50 transition-colors hover:border-indigo-200 hover:text-indigo-50"
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
          className="mt-20 flex items-center justify-between border-t border-white/10 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {prev ? (
            <Link
              href={`/proyectos/${prev.slug}`}
              className="group flex items-center gap-3 text-indigo-200/70 transition-colors hover:text-indigo-200"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-indigo-400">
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
              className="group flex items-center gap-3 text-right text-indigo-200/70 transition-colors hover:text-indigo-200"
            >
              <div>
                <span className="block text-xs uppercase tracking-wider text-indigo-400">
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

      <Footer language={language} />
    </div>
  );
}
