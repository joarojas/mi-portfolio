// ============================================================
//  data.js — TODOS LOS DATOS DEL PORTFOLIO
//  Edita este archivo para actualizar el contenido.
//  NO toques App.jsx ni los componentes para cambiar datos.
// ============================================================

// ── IMÁGENES POR MÓDULO ──────────────────────────────────────
// Cada carpeta tiene su contexto. Para agregar una imagen:
//   1. Ponla en src/assets/carpeta-correcta/
//   2. Úsala con safeImg(contexto, './nombre.png')
const heroImages       = require.context('./assets/hero',         false, /\.(png|jpe?g|svg|webp)$/);
const projectImages    = require.context('./assets/projects',     false, /\.(png|jpe?g|svg|webp)$/);
const experienceImages = require.context('./assets/experience',   false, /\.(png|jpe?g|svg|webp)$/);
const certImages       = require.context('./assets/certificates', false, /\.(png|jpe?g|svg|webp)$/);

// Helper: si la imagen no existe, no rompe la app
const safeImg = (context, path) => {
  try   { return context(path); }
  catch { return null; }
};

// ── INFO PERSONAL ────────────────────────────────────────────
export const ME = {
  name:      "Joan Francisco Rojas Varela",
  shortName: "Joan Rojas",
  initials:  "JOAN",
  role:      "Estudiante de Ingeniería en Computación",
  location:  "Costa Rica 🇨🇷",
  email:     "jofarova214@gmail.com",
  linkedin:  "linkedin.com/in/joan-francisco-rojas-varela",
  github:    "joarojas",
  cv:        "/cv.pdf",
  photo:     safeImg(heroImages, './joan.png'),
  openToWork: true,
  roles: [
    "Full Stack Developer",
    "Computer Science Student",
    "Problem Solver",
    "Open Source Enthusiast",
    "UI/UX Explorer",
  ],
};

// ── PROYECTOS ────────────────────────────────────────────────
// desc: objeto {es, en} para soporte bilingüe
// image: safeImg(projectImages, './mi-imagen.png') o null
// ─── Para agregar un proyecto: copia un bloque { } y rellena
export const PROJECTS = [
  {
    id:    1,
    icon:  "devicon-react-original colored",
    title: "AutoFix Pro",
    desc: {
      es: "Programa de gestión para talleres mecánicos, con citas, clientes, facturación y gestión de reparaciones.",
      en: "Management program for auto repair shops, with appointments, clients, invoicing and repair management.",
    },
    tags: [
      { name: "React",     icon: "devicon-react-original colored",    iconText: null },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain colored",   iconText: null },
      { name: "Firebase",  icon: "devicon-firebase-plain colored",    iconText: null },
    ],
    accent: "#ff3cac",
    demo:   "#",
    repo:   "https://github.com/joarojas/autofix-pro",
    image:  safeImg(projectImages, './AutoGest_Pro.png'),
  },
  {
    id:    2,
    icon:  "devicon-javascript-plain colored",
    title: "Parking Dashboard",
    desc: {
      es: "Dashboard para la gestión de estacionamiento, con visualizaciones en tiempo real y control de acceso.",
      en: "Dashboard for parking management, with real-time visualizations and access control.",
    },
    tags: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored", iconText: null },
      { name: "React",      icon: "devicon-react-plain colored",      iconText: null },
      { name: "Bootstrap",  icon: "devicon-bootstrap-plain colored",  iconText: null },
    ],
    accent: "#2de2e6",
    demo:   "#",
    repo:   "https://github.com/joarojas/parking-dashboard",
    image:  null,
  },
  {
    id:    3,
    icon:  "devicon-python-plain colored",
    title: "Clasificador ML",
    desc: {
      es: "Modelo que predice deserción estudiantil con 87% de precisión, entrenado con scikit-learn y expuesto con Flask.",
      en: "Model that predicts student dropout with 87% accuracy, trained with scikit-learn and exposed with Flask.",
    },
    tags: [
      { name: "Python",       icon: "devicon-python-plain colored", iconText: null },
      { name: "scikit-learn", icon: null,                           iconText: "SKL" },
      { name: "Flask",        icon: "devicon-flask-original",       iconText: null },
    ],
    accent: "#f6f740",
    demo:   "#",
    repo:   "https://github.com/joarojas/ml-classifier",
    image:  null,
  },

  // ─── AGREGA TU PRÓXIMO PROYECTO AQUÍ ───────────────────────
  // {
  //   id:    4,
  //   icon:  "devicon-flutter-plain colored",
  //   title: "Mi App",
  //   desc:  { es: "Descripción en español.", en: "Description in English." },
  //   tags:  [{ name: "Flutter", icon: "devicon-flutter-plain colored", iconText: null }],
  //   accent: "#a855f7",
  //   demo:  "https://mi-app.vercel.app",
  //   repo:  "https://github.com/joarojas/mi-app",
  //   image: safeImg(projectImages, './mi-app.png'),
  // },
];

// ── SKILLS ───────────────────────────────────────────────────
// Para agregar una skill:  busca en devicon.dev → copia la clase
// Para agregar categoría:  copia un bloque { cat, color, items }
// Si no hay Devicon:       usa iconText con 2-3 letras
export const SKILLS = [
  {
    cat: "Frontend", color: "#ff3cac",
    items: [
      { name: "HTML5",      icon: "devicon-html5-plain colored",      iconText: null },
      { name: "CSS3",       icon: "devicon-css3-plain colored",       iconText: null },
      { name: "JavaScript", icon: "devicon-javascript-plain colored", iconText: null },
      { name: "React",      icon: "devicon-react-plain colored",      iconText: null },
      { name: "Bootstrap",  icon: "devicon-bootstrap-plain colored",  iconText: null },
    ],
  },
  {
    cat: "Backend", color: "#2de2e6",
    items: [
      { name: "Python", icon: "devicon-python-plain colored",    iconText: null },
      { name: "Java",   icon: "devicon-java-plain colored",      iconText: null },
      { name: "C",      icon: "devicon-c-plain colored",         iconText: null },
      { name: "C++",    icon: "devicon-cplusplus-plain colored", iconText: null },
      { name: "C#",     icon: "devicon-csharp-plain colored",    iconText: null },
      { name: "Rust",   icon: "devicon-rust-plain colored",      iconText: null },
    ],
  },
  {
    cat: "Bases de datos", color: "#f6f740",
    items: [
      { name: "MySQL",              icon: "devicon-mysql-plain colored",              iconText: null },
      { name: "PostgreSQL",         icon: "devicon-postgresql-plain colored",         iconText: null },
      { name: "Firebase",           icon: "devicon-firebase-plain colored",           iconText: null },
      { name: "SQL Server",         icon: "devicon-microsoftsqlserver-plain colored", iconText: null },
    ],
  },
  {
    cat: "DevOps", color: "#a855f7",
    items: [
      { name: "Git",    icon: "devicon-git-plain colored",    iconText: null },
      { name: "Linux",  icon: "devicon-linux-plain",          iconText: null },
      { name: "GitHub", icon: "devicon-github-original",      iconText: null },
    ],
  },
  {
    cat: "Herramientas", color: "#ff6b35",
    items: [
      { name: "VS Code",   icon: "devicon-vscode-plain colored",   iconText: null },
      { name: "Figma",     icon: "devicon-figma-plain colored",    iconText: null },
      { name: "IntelliJ",  icon: "devicon-intellij-plain colored", iconText: null },
      { name: "Bash",      icon: "devicon-bash-plain colored",     iconText: null },
    ],
  },
];

// ── EXPERIENCIA Y EDUCACIÓN ──────────────────────────────────
// date, title, subtitle, desc: objetos {es, en} para bilingüe
// logo: safeImg(experienceImages, './empresa.png') o null
// ─── Para agregar: copia un bloque { } y rellena los campos
export const EXPERIENCE = [
  {
    icon:  "devicon-github-original",
    color: "#e2d266",
    date:     { es: "2022 – Presente",    en: "2022 – Present" },
    title:    { es: "INGENIERÍA EN COMPUTACIÓN", en: "COMPUTER ENGINEERING" },
    subtitle: { es: "Tecnológico de Costa Rica · San Carlos 🇨🇷", en: "Costa Rica Institute of Technology · San Carlos 🇨🇷" },
    desc:     {
      es: "Carrera centrada en desarrollo de software, algoritmos, estructuras de datos, redes y sistemas operativos. Participación activa en proyectos académicos.",
      en: "Degree focused on software development, algorithms, data structures, networking, and operating systems. Active participation in academic projects.",
    },
    logo: null,
  },
  {
    icon:  "devicon-react-original colored",
    color: "#2de2e6",
    date:     { es: "Ene–May 2024",        en: "Jan–May 2024" },
    title:    { es: "PASANTE DESARROLLADOR WEB", en: "WEB DEVELOPER INTERN" },
    subtitle: { es: "[Empresa] · [Ciudad]", en: "[Company] · [City]" },
    desc:     {
      es: "Desarrollé features con React, colaboré con el equipo backend y participé en code reviews semanales.",
      en: "Developed features using React, collaborated with the backend team, and participated in weekly code reviews.",
    },
    logo: null,
  },
];

// ── CERTIFICADOS ─────────────────────────────────────────────
// Descomenta y rellena para agregar certificados.
// image: safeImg(certImages, './mi-cert.png') o null
export const CERTIFICATES = [
  // {
  //   title:  { es: "React - Guía Completa", en: "React - The Complete Guide" },
  //   issuer: "Udemy",
  //   date:   "2024",
  //   url:    "https://udemy.com/certificate/...",
  //   image:  safeImg(certImages, './react-cert.png'),
  //   color:  "#61dafb",
  // },
];

// ── TERMINAL INTERACTIVA ─────────────────────────────────────
// Cada comando recibe (t) = objeto de traducciones del idioma activo.
// Los textos vienen de translations.js — sin strings quemados.
// Los datos dinámicos (email, github) vienen de ME — sin hardcoding.
export const TERMINAL_COMMANDS = {
  help: t => [
    { t: "cmd",  v: t.terminal.help.title },
    { t: "info", v: `  about    → ${t.terminal.help.about}` },
    { t: "info", v: `  skills   → ${t.terminal.help.skills}` },
    { t: "info", v: `  projects → ${t.terminal.help.projects}` },
    { t: "info", v: `  contact  → ${t.terminal.help.contact}` },
    { t: "info", v: `  github   → ${t.terminal.help.github}` },
    { t: "info", v: `  cv       → ${t.terminal.help.cv}` },
    { t: "info", v: `  clear    → ${t.terminal.help.clear}` },
    { t: "info", v: `  secret   → ${t.terminal.help.secret}` },
  ],
  about: t => [
    { t: "accent", v: t.terminal.about.name   },
    { t: "info",   v: t.terminal.about.career },
    { t: "info",   v: t.terminal.about.status },
    { t: "muted",  v: t.terminal.about.phrase },
  ],
  skills: t => [
    { t: "cmd",  v: t.terminal.skills.title },
    { t: "info", v: "  Frontend → React, Bootstrap, HTML5, CSS3, JavaScript" },
    { t: "info", v: "  Backend  → Python, Java, C, C++, C#, Rust" },
    { t: "info", v: "  Datos    → PostgreSQL, Firebase, MySQL, SQL Server" },
    { t: "info", v: "  DevOps   → Git, GitHub, Linux" },
  ],
  projects: t => [
    { t: "cmd",    v: t.terminal.projects.title },
    { t: "accent", v: "  [01] AutoFix Pro" },
    { t: "muted",  v: "       React · Bootstrap · Firebase" },
    { t: "accent", v: "  [02] Parking Dashboard" },
    { t: "muted",  v: "       React · JavaScript · Bootstrap" },
    { t: "accent", v: "  [03] Clasificador ML" },
    { t: "muted",  v: "       Python · scikit-learn · Flask" },
  ],
  contact: t => [
    { t: "cmd",  v: t.terminal.contact.title },
    {
      t:    "link",
      v:    `  Email    → ${ME.email}`,
      href: `mailto:${ME.email}`,
    },
    {
      t:    "link",
      v:    `  LinkedIn → ${ME.linkedin}`,
      href: `${ME.linkedin}`,
    },
    {
      t:    "link",
      v:    `  GitHub   → github.com/${ME.github}`,
      href: `https://github.com/${ME.github}`,
    },
  ],
  github: t => {
    window.open(`https://github.com/${ME.github}`, "_blank");
    return [{ t: "accent", v: t.terminal.actions.github }];
  },
  cv: t => {
    window.open(ME.cv, "_blank");
    return [{ t: "accent", v: t.terminal.actions.cv }];
  },
  secret: t => [
    { t: "accent", v: t.terminal.secret.title  },
    { t: "info",   v: t.terminal.secret.line1  },
    { t: "info",   v: t.terminal.secret.line2  },
    { t: "accent", v: t.terminal.secret.action },
  ],
};
