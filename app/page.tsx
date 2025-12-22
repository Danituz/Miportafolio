"use client";

import Image from "next/image";
import { useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  ExternalLink,
  Figma,
  Github,
  Linkedin,
  Mail,
  Quote,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Navbar } from "@/components/navbar";
import { ParticlesBackground } from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";

type Theme = "light" | "dark";

type StackItem = {
  name: string;
  logoDark: string;
  logoLight: string;
  invertOnLight?: boolean;
};

type StackSection = {
  labelKey: "languages" | "frameworks" | "design" | "uiMotion" | "databases";
  items: StackItem[];
};

const stackSections: StackSection[] = [
  {
    labelKey: "languages",
    items: [
      { name: "JavaScript", logoDark: "/images/logos/javascript.svg", logoLight: "/images/logos/javascript.svg" },
      { name: "TypeScript", logoDark: "/images/logos/ts-logo-512.svg", logoLight: "/images/logos/ts-logo-512.svg" },
    ],
  },
  {
    labelKey: "frameworks",
    items: [
      { name: "React", logoDark: "/images/logos/react_dark.svg", logoLight: "/images/logos/react_dark.svg" },
      { name: "Next.js", logoDark: "/images/logos/nextjs_icon_dark.svg", logoLight: "/images/logos/nextjs_icon_dark.svg", invertOnLight: true },
      { name: "Astro", logoDark: "/images/logos/astro-icon-dark.svg", logoLight: "/images/logos/astro-icon-light.svg" },
      { name: "Node.js", logoDark: "/images/logos/nodejs.svg", logoLight: "/images/logos/nodejs.svg" },
    ],
  },
  {
    labelKey: "design",
    items: [
      { name: "Figma", logoDark: "/images/logos/figma.svg", logoLight: "/images/logos/figma.svg" },
      { name: "Affinity", logoDark: "/images/logos/affinity_designer.svg", logoLight: "/images/logos/affinity_designer.svg" },
    ],
  },
  {
    labelKey: "uiMotion",
    items: [
      { name: "shadcn/ui", logoDark: "/images/logos/shadcn-ui_dark.svg", logoLight: "/images/logos/shadcn-ui_light.svg" },
      { name: "Framer Motion", logoDark: "/images/logos/motion_dark.svg", logoLight: "/images/logos/motion_dark.svg", invertOnLight: true },
    ],
  },
  {
    labelKey: "databases",
    items: [
      { name: "Supabase", logoDark: "/images/logos/supabase.svg", logoLight: "/images/logos/supabase.svg" },
      { name: "MySQL", logoDark: "/images/logos/mysql-icon-dark.svg", logoLight: "/images/logos/mysql-icon-light.svg" },
    ],
  },
];

function useLocalStorage<T extends string>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const subscribe = useCallback(
    (callback: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) callback();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    return (window.localStorage.getItem(key) as T | null) ?? defaultValue;
  }, [key, defaultValue]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (newValue: T) => {
      window.localStorage.setItem(key, newValue);
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key]
  );

  return [value, setValue];
}

export default function Home() {
  const [theme, setTheme] = useLocalStorage<Theme>("miportafolio-theme", "dark");
  const [language, setLanguage] = useLocalStorage<Language>(
    "miportafolio-language",
    "es"
  );

  const isDark = theme === "dark";
  const t = translations[language];

  const experiences = [
    {
      name: "Cocity Loft",
      roleKey: "webDeveloper" as const,
      period: language === "es" ? "Abr - Nov 2025" : "Apr - Nov 2025",
      descriptionKey: "cocity" as const,
      tech: [
        "WordPress",
        "Elementor",
        "HTML",
        "CSS",
        "Next.js",
        "Supabase",
        "shadcn/ui",
      ],
      link: "https://cocityloft.com",
      logo: "/images/empresas/cocitylogo-bco.png",
    },
    {
      name: "Luxtar Media",
      roleKey: "fullStackDeveloper" as const,
      period: language === "es" ? "Ene - Abr 2025" : "Jan - Apr 2025",
      descriptionKey: "luxtar" as const,
      tech: ["React", "Node.js", "Tailwind", "shadcn/ui", "Supabase"],
      link: null,
      logo: "/images/empresas/luxtar-icono.png",
    },
    {
      name: "Go1 Technologies",
      roleKey: "frontendIntern" as const,
      period: language === "es" ? "May - Ago 2024" : "May - Aug 2024",
      descriptionKey: "go1" as const,
      tech: ["React", "CSS"],
      link: null,
      logo: "/images/empresas/go1-logo.webp",
    },
  ];

  return (
    <div
      className={cn(
        "relative min-h-screen w-full px-4 pb-0 pt-0 sm:px-6 lg:px-8",
        isDark ? "bg-gray-950 text-indigo-50" : "bg-white text-slate-900"
      )}
    >
      {/* Bokeh Lights Background */}
      <ParticlesBackground isDark={isDark} />

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
          <section className=" relative flex min-h-[calc(100vh-80px)] flex-col lg:min-h-0 lg:flex-1 lg:flex-row lg:items-center lg:gap-12">
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
                    : "bg-gradient-to-b from-transparent via-white/50 to-white"
                )}
              />
            </div>

            {/* Desktop: Avatar con degradado inferior */}
            <div className="hidden flex-1 items-end justify-start lg:flex">
              <div className="relative h-[600px] w-[600px] translate-y-[70px]">
                <Image
                  src="/avatar.png"
                  alt="Avatar de Daniel Tuz"
                  fill
                  sizes="420px"
                  className="object-cover object-top"
                  priority
                />
                {/* Degradado inferior para desvanecer */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-40",
                    isDark
                      ? "bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"
                      : "bg-gradient-to-t from-white via-white/80 to-transparent"
                  )}
                />
              </div>
            </div>

            {/* Texto */}
            <div className="relative z-10 mt-auto flex flex-col items-center pb-12 text-center lg:mt-0 lg:flex-1 lg:items-end lg:pb-0 lg:text-right">
              <span
                className={cn(
                  "font-allison text-6xl leading-none text-indigo-100 sm:text-7xl lg:text-9xl",
                  !isDark && "text-indigo-700"
                )}
              >
                {t.hero.portfolio}
              </span>
              <h1
                className={cn(
                  "font-ferron text-5xl uppercase leading-none text-indigo-50 sm:text-7xl lg:text-9xl",
                  !isDark && "text-slate-900"
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
                    !isDark && "bg-indigo-600 text-indigo-50 hover:bg-indigo-500"
                  )}
                >
                  <a href="#sobre-mi">
                    {t.hero.explore}
                    <ArrowDown className="size-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section
            id="sobre-mi"
            className="relative flex flex-col items-center gap-6 px-4 pb-24 pt-32 text-center sm:pt-64"
          >
            <h2
              className={cn(
                "font-ferron text-6xl uppercase leading-none text-indigo-100 sm:text-8xl lg:text-9xl",
                !isDark && "text-indigo-800"
              )}
            >
              {t.about.title}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg",
                !isDark && "text-slate-600"
              )}
            >
              {t.about.description}
            </p>
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                className={cn(
                  "border-indigo-300/60 px-6 text-sm font-normal uppercase text-indigo-50 hover:border-indigo-200 hover:text-indigo-50",
                  !isDark &&
                    "border-indigo-200 text-indigo-900 hover:border-indigo-300 hover:text-indigo-800"
                )}
              >
                {t.about.downloadCV}
                <ArrowDown className="size-4" />
              </Button>
              <a
                href="https://github.com/danieltuz"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-indigo-300/60 text-indigo-50 transition hover:border-indigo-200 hover:text-indigo-50",
                  !isDark &&
                    "border-indigo-200 text-indigo-800 hover:border-indigo-300 hover:text-indigo-900"
                )}
              >
                <Github className="size-5" />
              </a>
            </div>
          </section>

          <section
            id="stack"
            className="relative flex flex-col items-center gap-6 px-4 py-24 text-center"
          >
            <h2
              className={cn(
                "font-ferron text-5xl uppercase leading-none text-indigo-100 sm:text-7xl",
                !isDark && "text-indigo-800"
              )}
            >
              {t.stack.title}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg",
                !isDark && "text-slate-600"
              )}
            >
              {t.stack.description}
            </p>

            <div className="flex flex-wrap items-start justify-center gap-12 pt-8">
              {stackSections.map((section, idx) => (
                <motion.div
                  key={section.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-[0.2em]",
                      isDark ? "text-indigo-100/40" : "text-slate-400"
                    )}
                  >
                    {t.stack.categories[section.labelKey]}
                  </span>
                  <div className="flex items-center gap-6">
                    {section.items.map((item) => {
                      const logoSrc = isDark ? item.logoDark : item.logoLight;
                      const shouldInvert = !isDark && item.invertOnLight;

                      return (
                        <div
                          key={item.name}
                          className="group flex flex-col items-center gap-2"
                        >
                          <div className="flex h-12 w-12 items-center justify-center transition group-hover:-translate-y-1">
                            <Image
                              src={logoSrc}
                              alt={item.name}
                              width={40}
                              height={40}
                              className={cn(
                                "h-10 w-10 object-contain",
                                shouldInvert && "invert"
                              )}
                            />
                          </div>
                          <span
                            className={cn(
                              "text-[11px] font-medium",
                              isDark ? "text-indigo-100/50" : "text-slate-500"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section
            id="experiencia"
            className="relative flex flex-col gap-6 px-4 py-24"
          >
            <h2
              className={cn(
                "text-center font-ferron text-5xl uppercase leading-none text-indigo-100 sm:text-7xl",
                !isDark && "text-indigo-800"
              )}
            >
              {t.experience.title}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg",
                !isDark && "text-slate-600"
              )}
            >
              {t.experience.description}
            </p>
            <div className="relative mx-auto w-full max-w-3xl pt-4">
              {/* Timeline line */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-[19px] top-8 h-[calc(100%-4rem)] w-px",
                  isDark
                    ? "bg-gradient-to-b from-indigo-500/50 via-indigo-100/20 to-transparent"
                    : "bg-gradient-to-b from-indigo-400/60 via-slate-300/40 to-transparent"
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
                          : "bg-white ring-2 ring-indigo-400/50 group-hover:ring-indigo-500"
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
                            isDark ? "text-indigo-300" : "text-indigo-600"
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
                          : "border-slate-200 bg-slate-50/50 group-hover:border-slate-300 group-hover:bg-white"
                      )}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <h3
                            className={cn(
                              "text-lg font-semibold",
                              isDark ? "text-indigo-50" : "text-slate-900"
                            )}
                          >
                            {exp.name}
                          </h3>
                          <span
                            className={cn(
                              "text-sm",
                              isDark ? "text-indigo-100/70" : "text-slate-600"
                            )}
                          >
                            {t.experience.roles[exp.roleKey]}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                            isDark
                              ? "bg-indigo-500/10 text-indigo-300"
                              : "bg-indigo-100 text-indigo-700"
                          )}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed",
                          isDark ? "text-indigo-100/60" : "text-slate-600"
                        )}
                      >
                        {t.experience.companies[exp.descriptionKey].description}
                      </p>

                      {/* Tech stack */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10px] font-medium",
                              isDark
                                ? "bg-indigo-100/10 text-indigo-200"
                                : "bg-slate-200/80 text-slate-600"
                            )}
                          >
                            {tech}
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
                              : "text-indigo-600 hover:text-indigo-700"
                          )}
                        >
                          {t.experience.viewSite}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <ProjectsSection isDark={isDark} t={t} />

          {/* Testimonials Section */}
          <TestimonialsSection isDark={isDark} t={t} language={language} />

          {/* Contact CTA Section */}
          <ContactCTASection isDark={isDark} t={t} />
        </main>
      </div>

      {/* Footer - Full width */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <Footer isDark={isDark} t={t} />
      </div>
    </div>
  );
}

// Projects data
const projects = [
  {
    name: "ISC Producciones",
    description: "Sitio web corporativo para productora audiovisual",
    image: "/images/proyectos/isc producciones.svg",
    figmaUrl: "#",
    liveUrl: "#",
    githubUrl: null,
  },
  {
    name: "Luxtar Cards",
    description: "Tarjetas digitales personalizadas",
    image: "/images/proyectos/luxtar cards.svg",
    figmaUrl: "#",
    liveUrl: "#",
    githubUrl: null,
  },
  {
    name: "Mapdam",
    description: "Plataforma de mapeo y gestión",
    image: "/images/proyectos/Mapdam.svg",
    figmaUrl: "#",
    liveUrl: "#",
    githubUrl: null,
  },
  {
    name: "Mensajeros",
    description: "Aplicación de mensajería y logística",
    image: "/images/proyectos/mensajeros.svg",
    figmaUrl: null,
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    name: "RAF App",
    description: "Aplicación móvil de gestión",
    image: "/images/proyectos/raf.app.svg",
    figmaUrl: "#",
    liveUrl: "#",
    githubUrl: null,
  },
  {
    name: "Zombies Last Dawn",
    description: "Videojuego de supervivencia zombie",
    image: "/images/proyectos/zombies last dawn.svg",
    figmaUrl: null,
    liveUrl: "#",
    githubUrl: "#",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "María García",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Daniel es un desarrollador excepcional. Su atención al detalle y capacidad para crear interfaces intuitivas superó nuestras expectativas.",
    date: "2024-11-15",
  },
  {
    name: "Carlos López",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "Trabajar con Daniel fue una experiencia increíble. Entregó el proyecto antes de tiempo y con una calidad impresionante.",
    date: "2024-10-20",
  },
  {
    name: "Ana Martínez",
    role: "Diseñadora UX",
    company: "DesignStudio",
    content:
      "La colaboración con Daniel fue fluida y productiva. Traduce perfectamente los diseños a código funcional y elegante.",
    date: "2024-09-08",
  },
  {
    name: "Roberto Sánchez",
    role: "Tech Lead",
    company: "DevAgency",
    content:
      "Su código es limpio, bien documentado y fácil de mantener. Un profesional que recomiendo sin dudarlo.",
    date: "2024-08-12",
  },
];

// Projects Section Component with Swiper Carousel
function ProjectsSection({
  isDark,
  t,
}: {
  isDark: boolean;
  t: (typeof translations)["es"] | (typeof translations)["en"];
}) {
  const swiperStyles = `
    .projects-carousel {
      width: 100%;
      height: 440px;
      padding-bottom: 50px !important;
    }

    @media (min-width: 640px) {
      .projects-carousel {
        height: 500px;
      }
    }

    .projects-carousel .swiper-slide {
      background-position: center;
      background-size: cover;
      border-radius: 25px;
    }

    .projects-carousel .swiper-pagination-bullet {
      background-color: ${isDark ? "#818cf8" : "#4f46e5"} !important;
      opacity: 0.4;
    }

    .projects-carousel .swiper-pagination-bullet-active {
      opacity: 1;
    }
  `;

  return (
    <section
      id="proyectos"
      className="relative flex flex-col items-center gap-8 px-4 py-24"
    >
      <h2
        className={cn(
          "text-center font-ferron text-5xl uppercase leading-none sm:text-7xl",
          isDark ? "text-indigo-100" : "text-indigo-800"
        )}
      >
        {t.projects.title}
      </h2>

      {/* Swiper Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-4xl px-5"
      >
        <style>{swiperStyles}</style>

        <Swiper
          spaceBetween={0}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          effect="creative"
          grabCursor={true}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={600}
          pagination={{
            clickable: true,
          }}
          creativeEffect={{
            prev: {
              shadow: false,
              translate: ["-20%", 0, -200],
              opacity: 0.5,
            },
            next: {
              translate: ["100%", 0, 0],
              opacity: 0,
            },
          }}
          modules={[EffectCreative, Pagination, Autoplay]}
          className="projects-carousel"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.name}>
              <div
                className={cn(
                  "group relative h-full w-full overflow-hidden rounded-3xl",
                  isDark ? "bg-gray-900" : "bg-white"
                )}
              >
                {/* Project Image */}
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={index < 2}
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  )}
                />

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="font-ferron text-2xl uppercase text-white sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-general text-sm text-white/70">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        {t.projects.live}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <Figma className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* View All Button */}
      <Button
        variant="outline"
        className={cn(
          "mt-4 gap-2 rounded-full font-medium",
          isDark
            ? "border-indigo-500/30 text-indigo-100 hover:bg-indigo-500/10"
            : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        )}
      >
        {t.projects.viewAll}
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection({
  isDark,
  t,
  language,
}: {
  isDark: boolean;
  t: (typeof translations)["es"] | (typeof translations)["en"];
  language: Language;
}) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section
      id="comentarios"
      className="relative flex flex-col items-center gap-8 px-4 py-24"
    >
      <div className="text-center">
        <h2
          className={cn(
            "font-ferron text-5xl uppercase leading-none sm:text-7xl",
            isDark ? "text-indigo-100" : "text-indigo-800"
          )}
        >
          {t.testimonials.title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl font-general text-base",
            isDark ? "text-indigo-100/60" : "text-slate-600"
          )}
        >
          {t.testimonials.description}
        </p>
      </div>

      <div className="mt-8 grid w-full max-w-5xl gap-6 sm:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "group relative rounded-2xl border p-6 transition-all hover:-translate-y-1",
              isDark
                ? "border-indigo-500/20 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.04]"
                : "border-indigo-100 bg-white hover:border-indigo-200 hover:shadow-lg"
            )}
          >
            <Quote
              className={cn(
                "absolute right-4 top-4 h-8 w-8 opacity-10",
                isDark ? "text-indigo-300" : "text-indigo-600"
              )}
            />
            <p
              className={cn(
                "font-general text-sm leading-relaxed",
                isDark ? "text-indigo-100/70" : "text-slate-600"
              )}
            >
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p
                  className={cn(
                    "font-semibold",
                    isDark ? "text-indigo-50" : "text-slate-900"
                  )}
                >
                  {testimonial.name}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    isDark ? "text-indigo-100/50" : "text-slate-500"
                  )}
                >
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider",
                  isDark ? "text-indigo-100/30" : "text-slate-400"
                )}
              >
                {formatDate(testimonial.date)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Contact CTA Section Component
function ContactCTASection({
  isDark,
  t,
}: {
  isDark: boolean;
  t: (typeof translations)["es"] | (typeof translations)["en"];
}) {
  return (
    <section className="relative px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "mx-auto max-w-4xl overflow-hidden rounded-3xl p-16 sm:p-30",
          isDark
            ? "bg-indigo-700/90"
            : "bg-gradient-to-br from-indigo-600 to-indigo-700"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <span className="font-allison text-3xl -my-3 text-indigo-200 sm:text-4xl">
            {t.cta.subtitle}
          </span>
          <h2 className="mt-2 font-ferron text-4xl uppercase text-white sm:text-6xl">
            {t.cta.title}
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:contacto@danieltuz.com"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-2 sm:px-6 sm:py-3"
            >
              <Mail className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden font-general text-sm uppercase tracking-wider sm:inline">
                {t.cta.email}
              </span>
            </a>
            <a
              href="https://linkedin.com/in/danieltuz"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-2 sm:px-6 sm:py-3"
            >
              <Linkedin className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden font-general text-sm uppercase tracking-wider sm:inline">
                {t.cta.linkedin}
              </span>
            </a>
            <a
              href="https://wa.me/529999999999"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-2 sm:px-6 sm:py-3"
            >
              <FaWhatsapp className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden font-general text-sm uppercase tracking-wider sm:inline">
                {t.cta.whatsapp}
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Footer Component
function Footer({
  isDark,
  t,
}: {
  isDark: boolean;
  t: (typeof translations)["es"] | (typeof translations)["en"];
}) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: t.footer.sections.about, href: "#sobre-mi" },
    { label: t.footer.sections.stack, href: "#stack" },
    { label: t.footer.sections.experience, href: "#experiencia" },
    { label: t.footer.sections.projects, href: "#proyectos" },
    { label: t.footer.sections.testimonials, href: "#comentarios" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-900 via-purple-500 to-indigo-600" />

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/material/imagen_footer2.png"
          alt=""
          fill
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
              href="https://linkedin.com/in/danieltuz"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-300/30 text-indigo-200 transition-colors hover:border-indigo-300/60 hover:bg-white/10 hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
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
