// Project category types
export type ProjectCategory = "prototipado" | "desarrollo-web" | "apps";
export type ProjectType = "prototype" | "code";

// Project links interface
export interface ProjectLinks {
  github?: string;
  figma?: string;
  live?: string;
  appStore?: string;
  playStore?: string;
}

// Project image interface
export interface ProjectImage {
  src: string;
  alt: string;
}

// Project tool interface
export interface ProjectTool {
  name: string;
  category?: "frontend" | "backend" | "ui" | "database" | "design" | "language" | "other";
}

// Main project interface
export interface Project {
  slug: string;
  title: string;
  description: {
    es: string;
    en: string;
  };
  longDescription: {
    es: string;
    en: string;
  };
  category: ProjectCategory;
  type: ProjectType;
  featured: boolean;
  thumbnail: string;
  images: ProjectImage[];
  tools: ProjectTool[];
  links: ProjectLinks;
  year: number;
  accentColor: string;
}

// Category metadata
export interface CategoryMeta {
  id: ProjectCategory;
  label: {
    es: string;
    en: string;
  };
  icon: string;
}

// Categories data
export const categories: CategoryMeta[] = [
  {
    id: "desarrollo-web",
    label: { es: "Desarrollo Web", en: "Web Development" },
    icon: "Globe",
  },
  {
    id: "prototipado",
    label: { es: "Prototipado", en: "Prototyping" },
    icon: "Figma",
  },
  {
    id: "apps",
    label: { es: "Apps", en: "Apps" },
    icon: "Smartphone",
  },
];

// Projects data
export const projects: Project[] = [
  {
    slug: "isc-producciones",
    title: "ISC Producciones",
    description: {
      es: "App de gestión de eventos para el área de audio y multimedia.",
      en: "Event management app for audio and multimedia.",
    },
    longDescription: {
      es: "Sistema mobile-first que permite administrar eventos y visualizar información en tiempo real. Incluye dashboard administrativo, calendario de eventos, gestión de equipos técnicos y seguimiento de proyectos multimedia. Diseñado para optimizar la coordinación entre equipos de producción audiovisual.",
      en: "Mobile-first system for managing events and viewing real-time information. Includes admin dashboard, event calendar, technical equipment management, and multimedia project tracking. Designed to optimize coordination between audiovisual production teams.",
    },
    category: "desarrollo-web",
    type: "code",
    featured: true,
    thumbnail: "/images/proyectos/isc producciones.webp",
    images: [
      { src: "/images/proyectos/isc producciones.webp", alt: "ISC Dashboard" },
    ],
    tools: [
      { name: "Next.js", category: "frontend" },
      { name: "Supabase", category: "backend" },
      { name: "shadcn/ui", category: "ui" },
      { name: "TypeScript", category: "language" },
      { name: "Tailwind CSS", category: "ui" },
    ],
    links: {
      live: "https://isc-producciones.vercel.app",
    },
    year: 2025,
    accentColor: "#6366f1",
  },
  {
    slug: "luxtar-cards",
    title: "Luxtar Cards",
    description: {
      es: "Sistema de tarjetas de presentación digitales para equipos.",
      en: "Digital business card system for teams.",
    },
    longDescription: {
      es: "Sistema que permite a equipos de trabajo generar tarjetas de presentación digitales de forma sencilla. Cada miembro ingresa sus datos personales y enlaces a redes sociales para obtener su tarjeta personalizada. Ideal para empresas que buscan unificar la imagen de su equipo con tarjetas digitales profesionales y fáciles de compartir.",
      en: "System that allows work teams to easily generate digital business cards. Each member enters their personal data and social media links to get their personalized card. Ideal for companies looking to unify their team's image with professional, easy-to-share digital cards.",
    },
    category: "desarrollo-web",
    type: "code",
    featured: false,
    thumbnail: "/images/proyectos/luxtar cards.webp",
    images: [
      { src: "/images/proyectos/luxtar cards.webp", alt: "Luxtar Cards" },
    ],
    tools: [
      { name: "React", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Tailwind CSS", category: "ui" },
      { name: "MongoDB", category: "database" },
    ],
    links: {
      live: "https://luxtar-sam.vercel.app/",
    },
    year: 2024,
    accentColor: "#8b5cf6",
  },
  {
    slug: "mapdam",
    title: "Mapdam",
    description: {
      es: "App de seguridad para mujeres con mapa de zonas seguras y botón de pánico.",
      en: "Women's safety app with safe zone mapping and panic button.",
    },
    longDescription: {
      es: "Prototipo de aplicación móvil enfocada en la seguridad de las mujeres. Incluye un mapa interactivo que muestra zonas seguras e inseguras, instituciones de apoyo para la mujer y alertas creadas por la comunidad. Las usuarias pueden registrar sus señas del día (vestimenta y foto) para compartir con familiares en caso de emergencia, guardar ubicaciones frecuentes como casa o trabajo, y acceder a un botón de pánico que contacta directamente al 911.",
      en: "Mobile app prototype focused on women's safety. Features an interactive map showing safe and unsafe zones, women's support institutions, and community-created alerts. Users can register their daily signs (clothing and photo) to share with family in case of emergency, save frequent locations like home or work, and access a panic button that directly contacts 911.",
    },
    category: "prototipado",
    type: "prototype",
    featured: false,
    thumbnail: "/images/proyectos/Mapdam.webp",
    images: [
      { src: "/images/proyectos/Mapdam.webp", alt: "Mapdam Prototype" },
    ],
    tools: [
      { name: "Figma", category: "design" },
    ],
    links: {
      figma: "https://www.figma.com/proto/u4D7U9YbqQU0nIgBpNAid2/Mapdam?node-id=4-4&p=f&t=hGIT5XN82Sy9gHGm-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=11%3A503",
    },
    year: 2024,
    accentColor: "#a855f7",
  },
  {
    slug: "mensajeros",
    title: "Mensajeros",
    description: {
      es: "PWA para gestión de rutas de mensajeros con soporte offline.",
      en: "PWA for courier route management with offline support.",
    },
    longDescription: {
      es: "Aplicación web progresiva diseñada para mensajeros. Cada usuario selecciona su perfil y visualiza la ruta asignada del día con los lugares a visitar. El sistema cuenta con roles rotativos que se actualizan semanalmente, mostrando tanto el rol actual como el de la próxima semana para mejor planificación. La vista destaca visualmente los lugares de recolección, y son iluminados al llegar la hora según el horario programado. Incluye vista general de todas las rutas y funciona completamente offline.",
      en: "Progressive web application designed for couriers. Each user selects their profile and views their assigned daily route with pickup locations. The system features rotating roles that update weekly, showing both current and upcoming week's schedule for better planning. The view visually highlights pickup locations, which are illuminated when their scheduled time arrives. Includes an overview of all routes and works completely offline.",
    },
    category: "apps",
    type: "code",
    featured: false,
    thumbnail: "/images/proyectos/mensajeros.webp",
    images: [
      { src: "/images/proyectos/mensajeros.webp", alt: "Mensajeros App" },
    ],
    tools: [
      { name: "Next.js", category: "frontend" },
      { name: "TypeScript", category: "language" },
      { name: "Tailwind CSS", category: "ui" },
      { name: "PWA", category: "other" },
    ],
    links: {
      live: "https://rutas-laclicsa.vercel.app/semana",
    },
    year: 2024,
    accentColor: "#06b6d4",
  },
  {
    slug: "raf-app",
    title: "RAF App",
    description: {
      es: "Plataforma de cursos y recursos de programación para estudiantes.",
      en: "Programming courses and resources platform for students.",
    },
    longDescription: {
      es: "Página web diseñada para estudiantes de programación. Permite acceder a cursos y recursos educativos organizados por el profesor. Incluye sección de contacto donde los estudiantes pueden enviar mensajes directamente al profesor para resolver dudas o solicitar información adicional.",
      en: "Website designed for programming students. Provides access to courses and educational resources organized by the professor. Includes a contact section where students can send messages directly to the professor to resolve questions or request additional information.",
    },
    category: "desarrollo-web",
    type: "code",
    featured: false,
    thumbnail: "/images/proyectos/raf.app.webp",
    images: [
      { src: "/images/proyectos/raf.app.webp", alt: "RAF App" },
    ],
    tools: [
      { name: "React", category: "frontend" },
      { name: "Tailwind CSS", category: "ui" },
    ],
    links: {
      live: "https://landing-contacto-omega.vercel.app/",
    },
    year: 2024,
    accentColor: "#14b8a6",
  },
];

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
