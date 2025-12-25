"use client";

import Image from "next/image";
import Link from "next/link";
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
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Quote,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParticlesBackground } from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";
import { projects } from "@/lib/projects";

type StackItem = {
  name: string;
  logo: string;
};

type StackSection = {
  labelKey: "languages" | "frameworks" | "design" | "uiMotion" | "databases";
  items: StackItem[];
};

const stackSections: StackSection[] = [
  {
    labelKey: "languages",
    items: [
      { name: "JavaScript", logo: "/images/logos/javascript.svg" },
      { name: "TypeScript", logo: "/images/logos/ts-logo-512.svg" },
    ],
  },
  {
    labelKey: "frameworks",
    items: [
      { name: "React", logo: "/images/logos/react_dark.svg" },
      { name: "Next.js", logo: "/images/logos/nextjs_icon_dark.svg" },
      { name: "Astro", logo: "/images/logos/astro-icon-dark.svg" },
      { name: "Node.js", logo: "/images/logos/nodejs.svg" },
    ],
  },
  {
    labelKey: "design",
    items: [
      { name: "Figma", logo: "/images/logos/figma.svg" },
      { name: "Affinity", logo: "/images/logos/affinity_designer.svg" },
    ],
  },
  {
    labelKey: "uiMotion",
    items: [
      { name: "shadcn/ui", logo: "/images/logos/shadcn-ui_dark.svg" },
      { name: "Framer Motion", logo: "/images/logos/motion_dark.svg" },
    ],
  },
  {
    labelKey: "databases",
    items: [
      { name: "Supabase", logo: "/images/logos/supabase.svg" },
      { name: "MySQL", logo: "/images/logos/mysql-icon-dark.svg" },
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
  const [language, setLanguage] = useLocalStorage<Language>(
    "miportafolio-language",
    "es"
  );

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
    <div className="relative min-h-screen w-full bg-gray-950 text-indigo-50">
      {/* Bokeh Lights Background */}
      <ParticlesBackground />

      <Navbar
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950" />
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
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
              </div>
            </div>

            {/* Texto */}
            <div className="relative z-10 mt-auto flex flex-col items-center pb-12 text-center lg:mt-0 lg:flex-1 lg:items-end lg:pb-0 lg:text-right">
              <span className="font-allison text-6xl leading-none text-indigo-100 sm:text-7xl lg:text-9xl">
                {t.hero.portfolio}
              </span>
              <h1 className="font-ferron text-5xl uppercase leading-none text-indigo-50 whitespace-nowrap sm:text-7xl lg:text-9xl">
                DANIEL TUZ
              </h1>
              <div className="flex flex-wrap items-center justify-center pt-6 lg:justify-end lg:pt-4">
                <Button
                  asChild
                  size="lg"
                  className="gap-3"
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
            <h2 className="font-ferron text-6xl uppercase leading-none text-indigo-100 sm:text-8xl lg:text-9xl">
              {t.about.title}
            </h2>
            <p className="mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg">
              {t.about.description}
            </p>
            <div className="flex items-center gap-3 pt-4">
              <a href="/CV/CV_DanielTuz.pdf" download>
                <Button
                  variant="outline"
                  className="border-indigo-300/60 px-6 text-sm font-normal uppercase text-indigo-50 hover:border-indigo-200 hover:text-indigo-50"
                >
                  {t.about.downloadCV}
                  <ArrowDown className="size-4" />
                </Button>
              </a>
              <a
                href="https://github.com/Pulparindo70"
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-indigo-300/60 text-indigo-50 transition hover:border-indigo-200 hover:text-indigo-50"
              >
                <Github className="size-5" />
              </a>
            </div>
          </section>

          <section
            id="stack"
            className="relative flex flex-col items-center gap-6 px-4 py-24 text-center"
          >
            <h2 className="font-ferron text-5xl uppercase leading-none text-indigo-100 sm:text-7xl">
              {t.stack.title}
            </h2>
            <p className="mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg">
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
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-100/40">
                    {t.stack.categories[section.labelKey]}
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
                            loading="lazy"
                            className="h-10 w-10 object-contain"
                          />
                        </div>
                        <span className="text-[11px] font-medium text-indigo-100/50">
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
            className="relative flex flex-col gap-6 px-4 py-24"
          >
            <h2 className="text-center font-ferron text-5xl uppercase leading-none text-indigo-100 sm:text-7xl">
              {t.experience.title}
            </h2>
            <p className="mx-auto max-w-3xl font-general text-base leading-relaxed text-indigo-100/80 sm:text-lg">
              {t.experience.description}
            </p>
            <div className="relative mx-auto w-full max-w-3xl pt-4">
              {/* Timeline line */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[19px] top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-indigo-500/50 via-indigo-100/20 to-transparent"
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
                    <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-all group-hover:scale-110 bg-gray-950 ring-2 ring-indigo-500/50 group-hover:ring-indigo-400">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.name}
                          width={28}
                          height={28}
                          loading="lazy"
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-indigo-300">
                          {exp.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Content card */}
                    <div className="rounded-xl border p-5 transition-all group-hover:-translate-y-0.5 border-indigo-100/10 bg-white/[0.02] group-hover:border-indigo-100/20 group-hover:bg-white/[0.04]">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-indigo-50">
                            {exp.name}
                          </h3>
                          <span className="text-sm text-indigo-100/70">
                            {t.experience.roles[exp.roleKey]}
                          </span>
                        </div>
                        <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-300">
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-sm leading-relaxed text-indigo-100/60">
                        {t.experience.companies[exp.descriptionKey].description}
                      </p>

                      {/* Tech stack */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full px-2.5 py-1 text-[10px] font-medium bg-indigo-100/10 text-indigo-200"
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
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors text-indigo-400 hover:text-indigo-300"
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
          <ProjectsSection t={t} language={language} />

          {/* Testimonials Section */}
          <TestimonialsSection t={t} language={language} />

          {/* Contact CTA Section */}
          <ContactCTASection t={t} />
        </main>
      </div>

      {/* Footer - Full width */}
      <Footer language={language} />
    </div>
  );
}


// Testimonials data
const testimonials = [
  {
    name: "Irving Chan",
    role: { es: "Docente UT Cancún", en: "Professor at UT Cancún" },
    company: "UT Cancún",
    content: {
      es: "Daniel es un desarrollador excepcional. Su atención al detalle y capacidad para crear interfaces intuitivas supera las expectativas.",
      en: "Daniel is an exceptional developer. His attention to detail and ability to create intuitive interfaces exceeds expectations.",
    },
    date: "2024-11-15",
  },
  {
    name: "Yanel Noh",
    role: { es: "Lic. en Mercadotecnia", en: "Marketing Graduate" },
    company: "Luxtar Media",
    content: {
      es: "Trabajar con Daniel fue una experiencia increíble. Entregó el proyecto antes de tiempo y con una calidad impresionante.",
      en: "Working with Daniel was an incredible experience. He delivered the project ahead of time and with impressive quality.",
    },
    date: "2025-02-20",
  },
  {
    name: "Gustavo Nava",
    role: { es: "Administrador", en: "Administrator" },
    company: "Cocity Loft",
    content: {
      es: "La colaboración con Daniel fue fluida y productiva. Traduce perfectamente los diseños a código funcional y elegante.",
      en: "The collaboration with Daniel was smooth and productive. He perfectly translates designs into functional and elegant code.",
    },
    date: "2025-09-08",
  },
  {
    name: "Dania",
    role: { es: "Marketing", en: "Marketing" },
    company: "Cocity Loft",
    content: {
      es: "Trabajar con Daniel fue una experiencia increíble. Su entrega puntual lo hace ser de confianza.",
      en: "Working with Daniel was an incredible experience. His punctual delivery makes him trustworthy.",
    },
    date: "2025-08-12",
  },
];

// Projects Section Component with Swiper Carousel
function ProjectsSection({
  t,
  language,
}: {
  t: (typeof translations)["es"] | (typeof translations)["en"];
  language: Language;
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
      background-color: #818cf8 !important;
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
      <h2 className="text-center font-ferron text-5xl uppercase leading-none sm:text-7xl text-indigo-100">
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
            <SwiperSlide key={project.slug}>
              <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-gray-900">
                {/* Project Image */}
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={index < 2}
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="font-ferron text-2xl uppercase text-white sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-general text-sm text-white/70">
                    {project.description[language]}
                  </p>

                  {/* Ver más Button */}
                  <div className="mt-4">
                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      {t.projects.viewMore}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* View All Button */}
              <Link href="/proyectos">
                <Button
                  variant="outline"
                  className="border-indigo-300/60 px-6 text-sm font-normal uppercase text-indigo-50 hover:border-indigo-200 hover:text-indigo-50"
                >
                  {t.projects.viewAll}
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>

    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection({
  t,
  language,
}: {
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
        <h2 className="font-ferron text-5xl uppercase leading-none sm:text-7xl text-indigo-100">
          {t.testimonials.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-general text-base text-indigo-100/60">
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
            className="group relative rounded-2xl border p-6 transition-all hover:-translate-y-1 border-indigo-500/20 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.04]"
          >
            <Quote className="absolute right-4 top-4 h-8 w-8 opacity-10 text-indigo-300" />
            <p className="font-general text-sm leading-relaxed text-indigo-100/70">
              &ldquo;{testimonial.content[language]}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-semibold text-indigo-50">
                  {testimonial.name}
                </p>
                <p className="text-xs text-indigo-100/50">
                  {testimonial.role[language]} · {testimonial.company}
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-100/30">
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
  t,
}: {
  t: (typeof translations)["es"] | (typeof translations)["en"];
}) {
  return (
    <section className="relative px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl overflow-hidden rounded-3xl p-16 sm:p-30 bg-indigo-700/90"
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
              href="mailto:danieltuz.mio@gmail.com"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-2 sm:px-6 sm:py-3"
            >
              <Mail className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden font-general text-sm uppercase tracking-wider sm:inline">
                {t.cta.email}
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-tuz-b83918389"
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
              href="https://wa.me/529995436203"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-2 sm:px-6 sm:py-3"
            >
              <svg className="h-5 w-5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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

