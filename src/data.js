// ============================================================
//  data.js  —  TODOS LOS DATOS DE TU PORTFOLIO
//  Edita este archivo para actualizar tu portfolio.
//  NO necesitas tocar App.jsx para cambiar contenido.
// ============================================================

// ============================================================
//  DEVICONS — Cómo funciona:
//  Usamos la librería "devicons" vía CDN de jsDelivr.
//  Cada ícono es una etiqueta <i> con una clase especial.
//  
//  PARA AGREGAR UN ÍCONO NUEVO:
//  1. Ve a https://devicon.dev
//  2. Busca la tecnología (ej: "flutter")
//  3. Haz clic → copia el nombre de clase (ej: "devicon-flutter-plain")
//  4. Pégalo en el campo "icon" de tu skill o proyecto
//
//  Si una tecnología NO está en Devicons (ej: "Scrum"),
//  usa el campo "iconText" con 1-3 letras en vez de "icon".
// ============================================================
// 1. Esto escanea la carpeta assets y sus subcarpetas buscando cualquier archivo .png, .jpg o .jpeg
const imagenesContext = require.context('./assets', true, /\.(png|jpe?g|svg)$/);

const images = {};
imagenesContext.keys().forEach((item) => {
  const claveLimpia = item.replace('./', '');
  images[claveLimpia] = imagenesContext(item);
});



export const ME = {
  name:       "Joan Francisco Rojas Varela",
  shortName:  "Joan Rojas",
  initials:   "JOAN",
  role:       "Estudiante de Ingeniería en Computación",
  location:   "Costa Rica 🇨🇷",
  email:      "joan@email.com",
  linkedin:   "linkedin.com/in/joarojas",
  github:     "joarojas",
  cv:         "/cv.pdf",
  photo:      "/joan.png",
  openToWork: true,

  bio: [
    "Soy Joan Francisco Rojas Varela, estudiante de Ingeniería en Computación en Costa Rica. Desde que escribí mi primer \"Hola Mundo\", supe que quería pasar la vida construyendo cosas con código.",
    "Me apasiona el desarrollo full-stack y la intersección entre ingeniería y diseño. Creo que el mejor software es el que simplemente funciona sin que nadie lo note.",
    "También me fascina el espacio y la astrofísica — quizá por eso me gusta pensar en grande. Siempre buscando el siguiente reto imposible.",
  ],

  stats: [
    { n: "3+",  label: "Proyectos",   color: "#ff3cac" },
    { n: "2+",  label: "Años code",   color: "#2de2e6" },
    { n: "10+", label: "Tecnologías", color: "#f6f740" },
    { n: "∞",   label: "Curiosidad",  color: "#4ade80" },
  ],

  roles: [
    "Full Stack Developer",
    "Computer Science Student",
    "Problem Solver",
    "Open Source Enthusiast",
    "UI/UX Explorer",
  ],
};

export const PROJECTS = [
  {
    id:       1,
    icon:     "devicon-react-original colored",  // ← logo de React
    iconText: null,
    title:    "AutoFix Pro",
    desc:     "Programa de gestión para talleres mecánicos, con citas, clientes, facturación y gestión de reparaciones. ",
    tags: [
      { name: "React",    icon: "devicon-react-original colored" },
      { name: "Node.js",  icon: "devicon-nodejs-plain colored" },
      { name: "MongoDB",  icon: "devicon-mongodb-plain colored" },
      { name: "Stripe",   icon: null, iconText: "STR" },
    ],
    accent: "#ff3cac",
    demo:   "#",
    repo:   "https://github.com/joarojas/ecommerce",
    image:  "/projects/AutoGest_Pro.png",
  },
  {
    id:       2,
    icon:     "devicon-javascript-plain colored",
    iconText: null,
    title:    "Weather Dashboard",
    desc:     "App del tiempo con geolocalización, pronóstico de 7 días y visualizaciones animadas según el clima en tiempo real.",
    tags: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "D3.js",      icon: "devicon-d3js-plain colored" },
      { name: "API REST",   icon: null, iconText: "API" },
    ],
    accent: "#2de2e6",
    demo:   "#",
    repo:   "https://github.com/joarojas/weather-dashboard",
    image:  null,
  },
  {
    id:       3,
    icon:     "devicon-python-plain colored",
    iconText: null,
    title:    "Clasificador ML",
    desc:     "Modelo que predice deserción estudiantil con 87% de precisión, entrenado con scikit-learn y expuesto con Flask.",
    tags: [
      { name: "Python",      icon: "devicon-python-plain colored" },
      { name: "scikit-learn",icon: null, iconText: "SKL" },
      { name: "Flask",       icon: "devicon-flask-original" },
    ],
    accent: "#f6f740",
    demo:   "#",
    repo:   "https://github.com/joarojas/ml-classifier",
    image:  null,
  },

  // ─── AGREGA TU PRÓXIMO PROYECTO AQUÍ ───
  // {
  //   id:       4,
  //   icon:     "devicon-flutter-plain colored",  // busca en devicon.dev
  //   iconText: null,
  //   title:    "Mi App",
  //   desc:     "Descripción.",
  //   tags: [
  //     { name: "Flutter", icon: "devicon-flutter-plain colored" },
  //     { name: "Firebase",icon: "devicon-firebase-plain colored" },
  //   ],
  //   accent: "#a855f7",
  //   demo:   "https://mi-app.vercel.app",
  //   repo:   "https://github.com/joarojas/mi-app",
  //   image:  "/projects/mi-app.png",
  // },
];

// ============================================================
//  SKILLS — Stack tecnológico
//
//  Cada skill tiene:
//  name:     nombre que se muestra
//  icon:     clase de Devicon (busca en https://devicon.dev)
//  iconText: texto corto si NO hay Devicon para esa tecnología
//
//  EJEMPLO para agregar "Flutter":
//  1. Ve a devicon.dev → busca "flutter"
//  2. Copia la clase: "devicon-flutter-plain colored"
//  3. Agrégala: { name: "Flutter", icon: "devicon-flutter-plain colored", iconText: null }
// ============================================================
export const SKILLS = [
  {
    cat:   "Frontend",
    color: "#ff3cac",
    items: [
      { name: "React",      icon: "devicon-react-original colored",     iconText: null },
      { name: "TypeScript", icon: "devicon-typescript-plain colored",   iconText: null },
      { name: "CSS3",       icon: "devicon-css3-plain colored",         iconText: null },
      { name: "HTML5",      icon: "devicon-html5-plain colored",        iconText: null },
      { name: "Tailwind",   icon: "devicon-tailwindcss-plain colored",  iconText: null },
    ],
  },
  {
    cat:   "Backend",
    color: "#2de2e6",
    items: [
      { name: "Node.js",  icon: "devicon-nodejs-plain colored",      iconText: null },
      { name: "Python",   icon: "devicon-python-plain colored",      iconText: null },
      { name: "Java",     icon: "devicon-java-plain colored",        iconText: null },
      { name: "GraphQL",  icon: "devicon-graphql-plain colored",     iconText: null },
      { name: "Express",  icon: "devicon-express-original",          iconText: null },
    ],
  },
  {
    cat:   "Bases de datos",
    color: "#f6f740",
    items: [
      { name: "MySQL",      icon: "devicon-mysql-plain colored",      iconText: null },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", iconText: null },
      { name: "MongoDB",    icon: "devicon-mongodb-plain colored",    iconText: null },
      { name: "Firebase",   icon: "devicon-firebase-plain colored",   iconText: null },
    ],
  },
  {
    cat:   "DevOps",
    color: "#a855f7",
    items: [
      { name: "Git",     icon: "devicon-git-plain colored",    iconText: null },
      { name: "Docker",  icon: "devicon-docker-plain colored", iconText: null },
      { name: "Linux",   icon: "devicon-linux-plain",          iconText: null },
      { name: "GitHub",  icon: "devicon-github-original",      iconText: null },
    ],
  },
  {
    cat:   "IA / ML",
    color: "#4ade80",
    items: [
      { name: "Python",     icon: "devicon-python-plain colored",    iconText: null },
      { name: "TensorFlow", icon: "devicon-tensorflow-original colored", iconText: null },
      { name: "pandas",     icon: "devicon-pandas-original colored", iconText: null },
      { name: "NumPy",      icon: "devicon-numpy-original colored",  iconText: null },
    ],
  },
  {
    cat:   "Herramientas",
    color: "#ff6b35",
    items: [
      { name: "VS Code",  icon: "devicon-vscode-plain colored",   iconText: null },
      { name: "Figma",    icon: "devicon-figma-plain colored",    iconText: null },
      { name: "Postman",  icon: "devicon-postman-plain colored",  iconText: null },
      { name: "Scrum",    icon: null,                             iconText: "SCR" },
    ],
  },
];

// ============================================================
//  EXPERIENCIA Y EDUCACIÓN
// ============================================================
export const EXPERIENCE = [
  {
    date:  "2022 — Presente",
    role:  "Ingeniería en Computación",
    place: "[Tu Universidad] · Costa Rica 🇨🇷",
    desc:  "Carrera centrada en algoritmos, estructuras de datos, sistemas operativos, redes y desarrollo de software.",
    color: "#f6f740",
    type:  "education",
    icon:  "devicon-github-original",
  },
  {
    date:  "Ene–May 2024",
    role:  "Pasante Desarrollador Web",
    place: "[Empresa] · [Ciudad]",
    desc:  "Desarrollé features con React, colaboré con el equipo backend y participé en code reviews semanales.",
    color: "#2de2e6",
    type:  "work",
    icon:  "devicon-react-original colored",
  },
  {
    date:  "2023",
    role:  "Certificación: [Nombre]",
    place: "Coursera / Udemy",
    desc:  "Completé formación avanzada en [tecnología], aplicada directamente a proyectos reales.",
    color: "#ff3cac",
    type:  "certification",
    icon:  "devicon-python-plain colored",
  },
];

// ============================================================
//  COMANDOS DE LA TERMINAL
// ============================================================
export const TERMINAL_COMMANDS = {
  help: () => [
    { t: "cmd",  v: "Comandos disponibles:" },
    { t: "info", v: "  about       → Sobre Joan" },
    { t: "info", v: "  skills      → Stack tecnológico" },
    { t: "info", v: "  projects    → Proyectos" },
    { t: "info", v: "  contact     → Información de contacto" },
    { t: "info", v: "  github      → Abre perfil de GitHub" },
    { t: "info", v: "  cv          → Descarga el CV" },
    { t: "info", v: "  clear       → Limpia la terminal" },
    { t: "info", v: "  secret      → ???" },
  ],
  about: () => [
    { t: "accent", v: "Joan Francisco Rojas Varela" },
    { t: "info",   v: "Estudiante de Ingeniería en Computación 🎓" },
    { t: "info",   v: "Costa Rica 🇨🇷  |  Open to work ✅" },
    { t: "muted",  v: "Apasionado por el código limpio, el espacio y los retos imposibles." },
  ],
  skills: () => [
    { t: "cmd",  v: "Stack tecnológico:" },
    { t: "info", v: "  Frontend  → React, TypeScript, CSS3, HTML5, Tailwind" },
    { t: "info", v: "  Backend   → Node.js, Python, Java, GraphQL" },
    { t: "info", v: "  Datos     → MySQL, PostgreSQL, MongoDB, Firebase" },
    { t: "info", v: "  DevOps    → Git, Docker, Linux, GitHub" },
    { t: "info", v: "  IA/ML     → TensorFlow, pandas, NumPy" },
  ],
  projects: () => [
    { t: "cmd",    v: "Proyectos destacados:" },
    { t: "accent", v: "  [01] E-Commerce Platform" },
    { t: "muted",  v: "       React · Node.js · MongoDB · Stripe" },
    { t: "accent", v: "  [02] Weather Dashboard" },
    { t: "muted",  v: "       JavaScript · D3.js · OpenWeather API" },
    { t: "accent", v: "  [03] Clasificador ML" },
    { t: "muted",  v: "       Python · scikit-learn · Flask" },
  ],
  contact: () => [
    { t: "cmd",  v: "Contacto:" },
    { t: "info", v: "  Email    → joan@email.com" },
    { t: "info", v: "  LinkedIn → linkedin.com/in/joarojas" },
    { t: "info", v: "  GitHub   → github.com/joarojas" },
  ],
  github: () => {
    window.open("https://github.com/joarojas", "_blank");
    return [{ t: "accent", v: "Abriendo github.com/joarojas... 🚀" }];
  },
  cv: () => {
    window.open("/cv.pdf", "_blank");
    return [{ t: "accent", v: "Descargando CV... 📄" }];
  },
  secret: () => [
    { t: "accent", v: "🛸  ACCESO CLASIFICADO CONCEDIDO" },
    { t: "info",   v: "Si llegaste hasta aquí, ya demostraste curiosidad." },
    { t: "info",   v: "Eso es exactamente lo que busco en un equipo." },
    { t: "accent", v: "→  Escríbeme: joan@email.com" },
  ],
};
