// ============================================================
//  data.js  —  TODOS LOS DATOS DE TU PORTFOLIO
//  Edita este archivo para actualizar tu portfolio.
//  NO necesitas tocar App.jsx para cambiar contenido.
// ============================================================

// ============================================================
//  SISTEMA DE IMÁGENES POR MÓDULO
//
//  Cada carpeta tiene su propio contexto.
//  Estructura de carpetas en src/assets/:
//
//  src/assets/
//  ├── hero/          → tu foto de perfil
//  ├── projects/      → capturas de proyectos
//  ├── experience/    → logos de empresas / universidades
//  └── certificates/  → diplomas y certificaciones
//
//  ¿CÓMO AGREGAR UNA IMAGEN?
//  1. Ponla en la carpeta correcta (ej: src/assets/projects/mi-app.png)
//  2. Úsala con el contexto de esa carpeta (ej: projectImages('./mi-app.png'))
//  ¡Sin imports manuales, sin límite de imágenes!
// ============================================================

// — Contexto para cada módulo —
const heroImages        = require.context('./assets/hero',         false, /\.(png|jpe?g|svg|webp)$/);
const projectImages     = require.context('./assets/projects',     false, /\.(png|jpe?g|svg|webp)$/);
const experienceImages  = require.context('./assets/experience',   false, /\.(png|jpe?g|svg|webp)$/);
const certImages        = require.context('./assets/certificates', false, /\.(png|jpe?g|svg|webp)$/);

// — Helper seguro: si la imagen no existe, no rompe la app —
const safeImg = (context, path) => {
  try { return context(path); }
  catch { return null; }
};

// ============================================================
//  DEVICONS — Logos de tecnologías
//  1. Ve a https://devicon.dev
//  2. Busca la tecnología → copia la clase
//     (ej: "devicon-flutter-plain colored")
//  3. Pégala en el campo "icon"
//  Si no existe en Devicons → usa "iconText" con 2-3 letras.
// ============================================================

export const ME = {
  name:       "Joan Francisco Rojas Varela",
  shortName:  "Joan Rojas",
  initials:   "JOAN",
  role:       "Estudiante de Ingeniería en Computación",
  location:   "Costa Rica 🇨🇷",
  email:      "jofarova214@gmail.com",           // ← cambia esto
  linkedin:   "linkedin.com/in/joarojas", // ← cambia esto
  github:     "joarojas",
  cv:         "/cv.pdf",                  // pon tu CV en public/
  photo:      safeImg(heroImages, './joan.png'), // → src/assets/hero/joan.png
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
//  image: safeImg(projectImages, './mi-imagen.png')
//         → src/assets/projects/mi-imagen.png
//         Si no tienes imagen → pon null y se muestra el icono
//
//  PARA AGREGAR UN PROYECTO NUEVO:
//  1. Pon la imagen en src/assets/projects/
//  2. Copia un bloque { } de abajo y rellena los campos
//  3. En image: safeImg(projectImages, './mi-imagen.png')
// ============================================================
export const PROJECTS = [
  {
    id:       1,
    icon:     "devicon-react-original colored",
    iconText: null,
    title:    "AutoFix Pro",
    desc:{
      es:"Programa de gestión para talleres mecánicos, con citas, clientes, facturación y gestión de reparaciones.",
      en:"Management program for auto repair shops, with appointments, clients, invoicing and repair management."
    },   
    tags: [
      { name: "React",   icon: "devicon-react-original colored", iconText: null },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain colored",   iconText: null },
      { name: "FireBase", icon: "devicon-firebase-plain colored",  iconText: null },
    ],
    accent: "#ff3cac",
    demo:   "#",
    repo:   "https://github.com/joarojas/ecommerce",
    image:  safeImg(projectImages, './AutoGest_Pro.png'), // → src/assets/projects/AutoGest_Pro.png
  },
  {
    id:       2,
    icon:     "devicon-javascript-plain colored",
    iconText: null,
    title:    "Parking Dashboard",
    desc:{
      es:"Dashboard para la gestión de estacionamiento, con visualizaciones en tiempo real y control de acceso.",
      en:"Dashboard for parking management, with real-time visualizations and access control."
    },
    tags: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored", iconText: null },
      { name: "React",      icon: "devicon-react-plain colored",      iconText: null },
      { name: "Bootstrap",   icon: "devicon-bootstrap-plain colored",                                iconText: "API" },
    ],
    accent: "#2de2e6",
    demo:   "#",
    repo:   "https://github.com/joarojas/weather-dashboard",
    image:  null, // ← sin imagen aún, muestra el icono
  },
  {
    id:       3,
    icon:     "devicon-python-plain colored",
    iconText: null,
    title:    "Clasificador ML",
    desc:{
      es:"Modelo que predice deserción estudiantil con 87% de precisión, entrenado con scikit-learn y expuesto con Flask.",
      en:"Model that predicts student dropout with 87% accuracy, trained with scikit-learn and exposed with Flask."
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
  //   image:  safeImg(projectImages, './mi-app.png'),
  // },
];

// ============================================================
//  SKILLS — Stack tecnológico
//
//  PARA AGREGAR UNA SKILL:
//  1. Ve a devicon.dev → busca la tecnología → copia la clase
//  2. Agrégala al array items de la categoría correcta
//  Si no existe en Devicons → iconText con 2-3 letras
//
//  PARA AGREGAR UNA CATEGORÍA NUEVA:
//  Copia un bloque { cat, color, items } completo
// ============================================================
export const SKILLS = [
  {
    cat:   "Frontend",
    color: "#ff3cac",
    items: [
      { name: "HTML5",      icon: "devicon-html5-plain colored",       iconText: null },
      { name: "CSS3",       icon: "devicon-css3-plain colored",        iconText: null },
      { name: "JavaScript", icon: "devicon-javascript-plain colored",  iconText: null },
      { name: "React",      icon: "devicon-react-plain colored",    iconText: null },
      { name: "Bootstrap",   icon: "devicon-bootstrap-plain colored",  iconText: "API" },
    ],
  },
  {
    cat:   "Backend",
    color: "#2de2e6",
    items: [
      { name: "Python",   icon: "devicon-python-plain colored",  iconText: null },
      { name: "Java",     icon: "devicon-java-plain colored",    iconText: null },
      { name: "C",  icon: "devicon-c-plain colored", iconText: null },
      {name: "C++", icon: "devicon-cplusplus-plain colored", iconText: null },
      {name: "C#", icon: "devicon-csharp-plain colored", iconText: null },
      {name: "Rust", icon: "devicon-rust-plain colored", iconText: null },
    ],
  },
  {
    cat:   "Bases de datos",
    color: "#f6f740",
    items: [
      { name: "MySQL",      icon: "devicon-mysql-plain colored",      iconText: null },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", iconText: null },
      { name: "Firebase",   icon: "devicon-firebase-plain colored",   iconText: null },
      {name: "Microsoft SQL Server", icon: "devicon-microsoftsqlserver-plain colored", iconText: null},
    ],
  },
  {
    cat:   "DevOps",
    color: "#a855f7",
    items: [
      { name: "Git",    icon: "devicon-git-plain colored",    iconText: null },
      { name: "Linux",  icon: "devicon-linux-plain",          iconText: null },
      { name: "GitHub", icon: "devicon-github-original",      iconText: null },
    ],
  },
  {
    cat:   "Herramientas",
    color: "#ff6b35",
    items: [
      { name: "VS Code", icon: "devicon-vscode-plain colored",  iconText: null },
      { name: "Figma",   icon: "devicon-figma-plain colored",   iconText: null },
      { name: "JetBrains", icon: "devicon-jetbrains-plain colored", iconText: null },
      { name: "Bash", icon: "devicon-bash-plain colored", iconText: null},
      {name: "IntelliJ", icon: "devicon-intellij-plain colored", iconText: null},
    ],
  },
];

// ============================================================
//  EXPERIENCIA Y EDUCACIÓN
//
//  logo: safeImg(experienceImages, './empresa.png')
//        → src/assets/experience/empresa.png
//        Si no tienes logo → pon null y se muestra el icono
//
//  type: "education" | "work" | "certification"
//
//  PARA AGREGAR UNA ENTRADA NUEVA:
//  1. (Opcional) Pon el logo en src/assets/experience/
//  2. Copia un bloque { } y rellena los campos
// ============================================================
export const EXPERIENCE = [
  {
    // Mantenemos tus configuraciones visuales intactas
    icon: "fab fa-github", 
    color: "#e2d266",
    
    // Convertimos los textos en objetos bilingües
    date: {
      es: "2022 – Presente",
      en: "2022 – Present"
    },
    title: {
      es: "INGENIERÍA EN COMPUTACIÓN",
      en: "COMPUTER ENGINEERING"
    },
    subtitle: {
      es: "Tecnológico de Costa Rica · Costa Rica 🇨🇷",
      en: "Costa Rica Institute of Technology · Costa Rica 🇨🇷"
    },
    desc: {
      es: "Carrera centrada en desarrollo de software, algoritmos, estructuras de datos, redes y sistemas operativos. Participación activa en proyectos académicos y grupos de estudio.",
      en: "Degree focused on software development, algorithms, data structures, networking, and operating systems. Active participation in academic projects and study groups."
    }
  },
  {
    icon: "fab fa-react",
    color: "#00f3ff",
    date: {
      es: "Ene-May 2024",
      en: "Jan-May 2024"
    },
    title: {
      es: "PASANTE DESARROLLADOR WEB",
      en: "WEB DEVELOPER INTERN"
    },
    subtitle: {
      es: "[Empresa] · [Ciudad]",
      en: "[Company] · [City]"
    },
    desc: {
      es: "Desarrollé features con React, colaboré con el equipo backend y participé en code reviews semanales.",
      en: "Developed features using React, collaborated with the backend team, and participated in weekly code reviews."
    }
  }
  // Puedes seguir agregando el resto de tus certificaciones o puestos con esta misma estructura...
];


// ============================================================
//  CERTIFICADOS (sección opcional)
//
//  Si quieres mostrar una sección de certificados,
//  agrega tus certificados aquí. La imagen va en
//  src/assets/certificates/
// ============================================================
export const CERTIFICATES = [
   {
     title:    "React - The Complete Guide",
     issuer:   "Udemy",
     date:     "2023",
     url:      "https://udemy.com/certificate/...",
     image:    safeImg(certImages, './react-cert.png'),
     color:    "#61dafb",
   },
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
    { t: "info",   v: "Estudiante de Ingeniería en Computación " },
    { t: "info",   v: "Costa Rica 🇨🇷  |  Open to work " },
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
    return [{ t: "accent", v: "Abriendo github.com/joarojas... " }];
  },
  cv: () => {
    window.open("/cv.pdf", "_blank");
    return [{ t: "accent", v: "Descargando CV... " }];
  },
  secret: () => [
    { t: "accent", v: " ACCESO CLASIFICADO CONCEDIDO" },
    { t: "info",   v: "Si llegaste hasta aquí, ya demostraste curiosidad." },
    { t: "info",   v: "Eso es exactamente lo que busco en un equipo." },
    { t: "accent", v: "→  Escríbeme: joan@email.com" },
  ],
};