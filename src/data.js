// ============================================================
//  data.js  —  TODOS LOS DATOS DE TU PORTFOLIO
//  Edita este archivo para actualizar tu portfolio.
//  NO necesitas tocar App.jsx para cambiar contenido.
// ============================================================

// ============================================================
//  SISTEMA DE IMÁGENES AUTOMÁTICO
//  Escanea toda la carpeta src/assets automáticamente.
//  Para agregar una imagen nueva:
//    1. Ponla en src/assets/ o src/assets/projects/
//    2. Úsala con: images['nombre-del-archivo.png']
//  Sin imports manuales, sin límite de imágenes.
// ============================================================
const imagenesContext = require.context('./assets', true, /\.(png|jpe?g|svg|webp)$/);

const images = {};
imagenesContext.keys().forEach((item) => {
  const rutaProcesada = imagenesContext(item);
  const claveLimpia   = item.replace('./', '');   // 'joan.png' o 'projects/AutoGest_Pro.png'
  const nombreArchivo = item.split('/').pop();    // 'joan.png' o 'AutoGest_Pro.png'
  images[claveLimpia]   = rutaProcesada;
  images[nombreArchivo] = rutaProcesada;
});

// ============================================================
//  DEVICONS — Logos de tecnologías
//  1. Ve a https://devicon.dev
//  2. Busca la tecnología → copia la clase (ej: "devicon-flutter-plain colored")
//  3. Pégala en el campo "icon"
//  Si no existe en Devicons, usa "iconText" con 2-3 letras.
// ============================================================

export const ME = {
  name:       "Joan Francisco Rojas Varela",
  shortName:  "Joan Rojas",
  initials:   "JOAN",
  role:       "Estudiante de Ingeniería en Computación",
  location:   "Costa Rica 🇨🇷",
  email:      "joan@email.com",           // ← cambia esto
  linkedin:   "linkedin.com/in/joarojas", // ← cambia esto
  github:     "joarojas",
  cv:         "/cv.pdf",                  // pon tu CV en public/
  photo:      images['joan.png'],         // src/assets/joan.png
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

// ============================================================
//  PROYECTOS
//
//  image: usa images['nombre.png'] si tienes imagen,
//         o null para mostrar el icono de Devicon.
//
//  PARA AGREGAR UN PROYECTO NUEVO:
//  1. Pon la imagen en src/assets/projects/
//  2. Copia un bloque { } de abajo
//  3. Rellena los campos
//  4. En image: usa images['mi-imagen.png']
// ============================================================
export const PROJECTS = [
  {
    id:       1,
    icon:     "devicon-react-original colored",
    iconText: null,
    title:    "AutoFix Pro",
    desc:     "Programa de gestión para talleres mecánicos, con citas, clientes, facturación y gestión de reparaciones.",
    tags: [
      { name: "React",   icon: "devicon-react-original colored",  iconText: null },
      { name: "Node.js", icon: "devicon-nodejs-plain colored",    iconText: null },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored",   iconText: null },
      { name: "Stripe",  icon: null,                              iconText: "STR" },
    ],
    accent: "#ff3cac",
    demo:   "#",
    repo:   "https://github.com/joarojas/ecommerce",
    image:  images['AutoGest_Pro.png'],  // ← src/assets/projects/AutoGest_Pro.png
  },
  {
    id:       2,
    icon:     "devicon-javascript-plain colored",
    iconText: null,
    title:    "Weather Dashboard",
    desc:     "App del tiempo con geolocalización, pronóstico de 7 días y visualizaciones animadas según el clima en tiempo real.",
    tags: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored", iconText: null },
      { name: "D3.js",      icon: "devicon-d3js-plain colored",       iconText: null },
      { name: "API REST",   icon: null,                                iconText: "API" },
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
      { name: "Python",       icon: "devicon-python-plain colored", iconText: null },
      { name: "scikit-learn", icon: null,                           iconText: "SKL" },
      { name: "Flask",        icon: "devicon-flask-original",       iconText: null },
    ],
    accent: "#f6f740",
    demo:   "#",
    repo:   "https://github.com/joarojas/ml-classifier",
    image:  null,
  },

  // ─── AGREGA TU PRÓXIMO PROYECTO AQUÍ ───
  // {
  //   id:       4,
  //   icon:     "devicon-flutter-plain colored",
  //   iconText: null,
  //   title:    "Mi App",
  //   desc:     "Descripción del proyecto.",
  //   tags: [
  //     { name: "Flutter",  icon: "devicon-flutter-plain colored",  iconText: null },
  //     { name: "Firebase", icon: "devicon-firebase-plain colored", iconText: null },
  //   ],
  //   accent: "#a855f7",
  //   demo:   "https://mi-app.vercel.app",
  //   repo:   "https://github.com/joarojas/mi-app",
  //   image:  images['mi-app.png'],  // ← pon la imagen en src/assets/projects/
  // },
];

// ============================================================
//  SKILLS — Stack tecnológico
//
//  PARA AGREGAR UNA SKILL:
//  1. Ve a devicon.dev → busca la tecnología
//  2. Copia la clase → pégala en "icon"
//  3. Si no existe en Devicons → usa iconText con 2-3 letras
//
//  PARA AGREGAR UNA CATEGORÍA NUEVA:
//  Copia un bloque { cat, color, items } completo
// ============================================================
export const SKILLS = [
  {
    cat:   "Frontend",
    color: "#ff3cac",
    items: [
      { name: "React",      icon: "devicon-react-original colored",    iconText: null },
      { name: "TypeScript", icon: "devicon-typescript-plain colored",  iconText: null },
      { name: "CSS3",       icon: "devicon-css3-plain colored",        iconText: null },
      { name: "HTML5",      icon: "devicon-html5-plain colored",       iconText: null },
      { name: "Tailwind",   icon: "devicon-tailwindcss-plain colored", iconText: null },
    ],
  },
  {
    cat:   "Backend",
    color: "#2de2e6",
    items: [
      { name: "Node.js",  icon: "devicon-nodejs-plain colored",   iconText: null },
      { name: "Python",   icon: "devicon-python-plain colored",   iconText: null },
      { name: "Java",     icon: "devicon-java-plain colored",     iconText: null },
      { name: "GraphQL",  icon: "devicon-graphql-plain colored",  iconText: null },
      { name: "Express",  icon: "devicon-express-original",       iconText: null },
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
      { name: "Git",    icon: "devicon-git-plain colored",    iconText: null },
      { name: "Docker", icon: "devicon-docker-plain colored", iconText: null },
      { name: "Linux",  icon: "devicon-linux-plain",          iconText: null },
      { name: "GitHub", icon: "devicon-github-original",      iconText: null },
    ],
  },
  {
    cat:   "IA / ML",
    color: "#4ade80",
    items: [
      { name: "Python",     icon: "devicon-python-plain colored",        iconText: null },
      { name: "TensorFlow", icon: "devicon-tensorflow-original colored", iconText: null },
      { name: "pandas",     icon: "devicon-pandas-original colored",     iconText: null },
      { name: "NumPy",      icon: "devicon-numpy-original colored",      iconText: null },
    ],
  },
  {
    cat:   "Herramientas",
    color: "#ff6b35",
    items: [
      { name: "VS Code", icon: "devicon-vscode-plain colored",  iconText: null },
      { name: "Figma",   icon: "devicon-figma-plain colored",   iconText: null },
      { name: "Postman", icon: "devicon-postman-plain colored", iconText: null },
      { name: "Scrum",   icon: null,                            iconText: "SCR" },
    ],
  },
];

// ============================================================
//  EXPERIENCIA Y EDUCACIÓN
//  Orden: más reciente primero.
//
//  type: "education" | "work" | "certification"
//  icon: clase de Devicon que representa el rol
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

  // ─── AGREGA EXPERIENCIA AQUÍ ───
  // {
  //   date:  "Jun–Ago 2025",
  //   role:  "Desarrollador Freelance",
  //   place: "Cliente independiente",
  //   desc:  "Desarrollé una app web para gestión de inventario.",
  //   color: "#a855f7",
  //   type:  "work",
  //   icon:  "devicon-nodejs-plain colored",
  // },
];

// ============================================================
//  TERMINAL INTERACTIVA
//  Edita las respuestas de cada comando aquí.
// ============================================================
export const TERMINAL_COMMANDS = {
  help: () => [
    { t: "cmd",  v: "Comandos disponibles:" },
    { t: "info", v: "  about    → Sobre Joan" },
    { t: "info", v: "  skills   → Stack tecnológico" },
    { t: "info", v: "  projects → Proyectos" },
    { t: "info", v: "  contact  → Información de contacto" },
    { t: "info", v: "  github   → Abre perfil de GitHub" },
    { t: "info", v: "  cv       → Descarga el CV" },
    { t: "info", v: "  clear    → Limpia la terminal" },
    { t: "info", v: "  secret   → ???" },
  ],
  about: () => [
    { t: "accent", v: "Joan Francisco Rojas Varela" },
    { t: "info",   v: "Estudiante de Ingeniería en Computación 🎓" },
    { t: "info",   v: "Costa Rica 🇨🇷  |  Open to work ✅" },
    { t: "muted",  v: "Apasionado por el código limpio, el espacio y los retos imposibles." },
  ],
  skills: () => [
    { t: "cmd",  v: "Stack tecnológico:" },
    { t: "info", v: "  Frontend → React, TypeScript, CSS3, HTML5, Tailwind" },
    { t: "info", v: "  Backend  → Node.js, Python, Java, GraphQL" },
    { t: "info", v: "  Datos    → MySQL, PostgreSQL, MongoDB, Firebase" },
    { t: "info", v: "  DevOps   → Git, Docker, Linux, GitHub" },
    { t: "info", v: "  IA/ML    → TensorFlow, pandas, NumPy" },
  ],
  projects: () => [
    { t: "cmd",    v: "Proyectos destacados:" },
    { t: "accent", v: "  [01] AutoFix Pro" },
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