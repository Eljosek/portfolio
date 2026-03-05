// ─────────────────────────────────────────────────────────────
//  lib/data.ts — Single source of truth for all portfolio content
//  Jose Miguel Herrera Gutierrez
// ─────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: 'Jose Herrera',
  fullName: 'Jose Miguel Herrera Gutierrez',
  age: 19,
  location: 'Pereira, Colombia',
  email: 'josemiguelherreragutierrez7@gmail.com',
  github: 'https://github.com/Eljosek',
  linkedin: 'https://linkedin.com/in/jose-miguel-herrera-gutiérrez-841319340',
  cvUrl: '/jose_herrera_cv_en.pdf',
  tagline: 'Python Developer · Cloud Engineer · Data Analyst',
  subtitleCycle: [
    'Python Developer 🐍',
    'Cloud Engineer ☁️',
    'Data Analyst 📊',
    'AWS | Azure | Databricks',
    'Full-Stack Freelancer 🚀',
  ],
  bio: `19-year-old Systems Engineering student at UTP (5th semester), 
freelance full-stack developer, and Python enthusiast on a mission 
to become a Cloud & Data Engineer. I build production-ready apps 
for NGOs, insurance companies, and e-commerce businesses — 
and I never stop learning.`,
}

// ─── Projects ────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  tags: { label: string; emoji: string; color: string }[]
  demoUrl: string
  repoUrl: string
  featured: boolean
  color: string
  glowColor: string
}

export const PROJECTS: Project[] = [
  {
    id: 'seguros-prototipo',
    title: 'Seguros Prototipo',
    description: 'Insurance lead management SaaS with real-time dashboard & analytics.',
    longDescription:
      'Full-featured SaaS platform for insurance lead management. Includes a real-time admin dashboard with Recharts analytics, complete Supabase auth system (login, roles, protected routes), and live data updates. Built for a real insurance business.',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts', 'Vercel'],
    tags: [
      { label: 'React', emoji: '⚛️', color: '#61DAFB' },
      { label: 'SaaS', emoji: '🏢', color: '#FF9900' },
      { label: 'Supabase', emoji: '🗄️', color: '#3ECF8E' },
    ],
    demoUrl: 'https://segurosprototipo.vercel.app/',
    repoUrl: 'https://github.com/Eljosek/segurosprototipo',
    featured: true,
    color: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.3)',
  },
  {
    id: 'linear-programming-toolkit',
    title: 'Linear Programming Toolkit',
    description: 'Educational OR solver with 7 algorithms: Simplex, Dual, Transport, Dijkstra…',
    longDescription:
      'Operations Research educational tool built with Python + Flask backend. Implements 7 complete algorithms: Simplex Method, Dual Simplex, Two-Phase Method, Big-M, Transportation (NW Corner, Vogel), Dijkstra, and Kruskal. Used by UTP students.',
    tech: ['Python', 'Flask', 'NumPy', 'Matplotlib', 'JavaScript', 'Bootstrap 5', 'Vercel'],
    tags: [
      { label: 'Python', emoji: '🐍', color: '#3776AB' },
      { label: 'Math', emoji: '📐', color: '#FF9900' },
      { label: 'Flask', emoji: '🔥', color: '#000000' },
    ],
    demoUrl: 'https://linear-programming-toolkit.vercel.app/',
    repoUrl: 'https://github.com/Eljosek/linear-programming-toolkit',
    featured: true,
    color: '#FF9900',
    glowColor: 'rgba(255, 153, 0, 0.3)',
  },
  {
    id: 'electroeventos-store',
    title: 'ElectroEventos Store',
    description: 'Modern e-commerce platform with animated UI and persistent cart.',
    longDescription:
      'Modern e-commerce platform built with the latest Next.js 15 + React 19 stack. Features animated product transitions with Framer Motion, persistent cart via Zustand, Tailwind CSS v4, and a fully responsive App Router architecture. Production-deployed.',
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Zustand', 'Tailwind CSS v4', 'Framer Motion', 'Vercel'],
    tags: [
      { label: 'Next.js', emoji: '▲', color: '#ffffff' },
      { label: 'E-Commerce', emoji: '🛒', color: '#3ECF8E' },
      { label: 'Framer Motion', emoji: '🎬', color: '#0055FF' },
    ],
    demoUrl: 'https://electroeventos-store.vercel.app/',
    repoUrl: 'https://github.com/Eljosek/electroeventos-store',
    featured: true,
    color: '#0078D4',
    glowColor: 'rgba(0, 120, 212, 0.3)',
  },
  {
    id: 'prototipo-funco',
    title: 'Prototipo FUNCO',
    description: 'NGO website with impact metrics, testimonials, and WhatsApp integration.',
    longDescription:
      'Complete website for a Colombian NGO/foundation. Features scroll animations, impact metrics counter, testimonials carousel, donation flow, WhatsApp CTA integration, and Radix UI accessible components. Built from scratch, requirements to deployment.',
    tech: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Radix UI', 'Vercel'],
    tags: [
      { label: 'NGO', emoji: '💚', color: '#3ECF8E' },
      { label: 'React', emoji: '⚛️', color: '#61DAFB' },
      { label: 'Animation', emoji: '🎨', color: '#FF9900' },
    ],
    demoUrl: 'https://prototipofunco.vercel.app/',
    repoUrl: 'https://github.com/Eljosek/prototipofunco',
    featured: false,
    color: '#3ECF8E',
    glowColor: 'rgba(62, 207, 142, 0.3)',
  },
]

// ─── Tech Stack ───────────────────────────────────────────────
export interface Tech {
  name: string
  icon: string
  category: 'core' | 'data' | 'cloud' | 'web' | 'devops'
  proficiency: number // 0–100
  projects: number
  color: string
  description: string
}

export const TECH_STACK: Tech[] = [
  // Core
  { name: 'Python', icon: '🐍', category: 'core', proficiency: 85, projects: 8, color: '#3776AB', description: 'Primary language — scripting, data, web, automation' },
  { name: 'TypeScript', icon: '🔷', category: 'core', proficiency: 80, projects: 6, color: '#3178C6', description: 'Typed JS for all modern projects' },
  { name: 'JavaScript', icon: '🟡', category: 'core', proficiency: 80, projects: 10, color: '#F7DF1E', description: 'Foundation of all web work' },
  // Data & ML
  { name: 'NumPy', icon: '🔢', category: 'data', proficiency: 75, projects: 4, color: '#4DABCF', description: 'Numerical computing in Python' },
  { name: 'Pandas', icon: '🐼', category: 'data', proficiency: 75, projects: 4, color: '#150458', description: 'Data manipulation & analysis' },
  { name: 'Matplotlib', icon: '📊', category: 'data', proficiency: 70, projects: 3, color: '#11557C', description: 'Data visualization & plotting' },
  { name: 'Scikit-learn', icon: '🤖', category: 'data', proficiency: 60, projects: 2, color: '#F7931E', description: 'Machine learning basics' },
  { name: 'Jupyter', icon: '📓', category: 'data', proficiency: 75, projects: 5, color: '#F37626', description: 'Interactive data exploration' },
  // Cloud (Learning)
  { name: 'AWS', icon: '☁️', category: 'cloud', proficiency: 35, projects: 0, color: '#FF9900', description: 'Currently learning — EC2, S3, Lambda' },
  { name: 'Azure', icon: '🔵', category: 'cloud', proficiency: 30, projects: 0, color: '#0078D4', description: 'Currently learning — ADF, ADB' },
  { name: 'Databricks', icon: '⚡', category: 'cloud', proficiency: 20, projects: 0, color: '#FF3621', description: 'Learning — Spark + ML platform' },
  { name: 'GCP', icon: '🌐', category: 'cloud', proficiency: 20, projects: 0, color: '#4285F4', description: 'Exploring Google Cloud' },
  // Web
  { name: 'React', icon: '⚛️', category: 'web', proficiency: 85, projects: 8, color: '#61DAFB', description: 'Component-based UI development' },
  { name: 'Next.js', icon: '▲', category: 'web', proficiency: 80, projects: 5, color: '#ffffff', description: 'Full-stack React framework' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'web', proficiency: 90, projects: 10, color: '#06B6D4', description: 'Utility-first CSS framework' },
  { name: 'Framer Motion', icon: '🎬', category: 'web', proficiency: 75, projects: 4, color: '#0055FF', description: 'Production animations & transitions' },
  { name: 'Supabase', icon: '🗄️', category: 'web', proficiency: 75, projects: 3, color: '#3ECF8E', description: 'Backend-as-a-service, PostgreSQL' },
  { name: 'Node.js', icon: '🟢', category: 'web', proficiency: 65, projects: 4, color: '#339933', description: 'Server-side JavaScript' },
  { name: 'Flask', icon: '🔥', category: 'web', proficiency: 70, projects: 3, color: '#ffffff', description: 'Lightweight Python web framework' },
  // DevOps
  { name: 'Git', icon: '🔀', category: 'devops', proficiency: 80, projects: 20, color: '#F05032', description: 'Version control for all projects' },
  { name: 'Docker', icon: '🐳', category: 'devops', proficiency: 45, projects: 1, color: '#2496ED', description: 'Containerization basics' },
  { name: 'Vercel', icon: '▲', category: 'devops', proficiency: 85, projects: 10, color: '#ffffff', description: 'Primary deployment platform' },
  { name: 'PostgreSQL', icon: '🐘', category: 'devops', proficiency: 65, projects: 3, color: '#336791', description: 'Relational database' },
]

// ─── Experience & Timeline ────────────────────────────────────
export interface TimelineItem {
  id: string
  type: 'work' | 'education' | 'cert'
  title: string
  organization: string
  period: string
  description: string[]
  tags: string[]
  color: string
  link?: string
}

export const TIMELINE: TimelineItem[] = [
  {
    id: 'freelance',
    type: 'work',
    title: 'Freelance Full-Stack Developer',
    organization: 'Self-employed',
    period: '2024 — Present',
    description: [
      'Developed and deployed production web applications for NGOs, insurance companies, and e-commerce businesses',
      'Built investigative and academic projects for UTP, from requirements to production deployment',
      'Integrated real-time dashboards, auth systems, and third-party APIs (WhatsApp, email services)',
      'Delivered full-stack solutions: Next.js frontends, Python backends, PostgreSQL databases',
    ],
    tags: ['React', 'Next.js', 'Python', 'Supabase', 'Vercel'],
    color: '#3776AB',
    link: 'https://github.com/Eljosek',
  },
  {
    id: 'utp',
    type: 'education',
    title: 'B.Sc. Systems Engineering',
    organization: 'Universidad Tecnológica de Pereira (UTP)',
    period: '2023 — Present',
    description: [
      '5th semester student (halfway through degree)',
      'Focus areas: algorithms, data structures, operating systems, software engineering',
      'Active contributor to academic research projects',
      'Completed Web Development Bootcamp organized by UTP (2024)',
    ],
    tags: ['Algorithms', 'Data Structures', 'Software Engineering'],
    color: '#FF9900',
  },
  {
    id: 'industry40',
    type: 'cert',
    title: 'Industry 4.0 Certification',
    organization: 'Alcaldía de Pereira + UTP',
    period: 'December 2025',
    description: [
      '60-hour intensive program covering AI, industrial automation, and emerging technologies',
      'Focus: Artificial Intelligence, industrial IoT, and digital transformation strategies',
      'Awarded by Alcaldía de Pereira in partnership with Universidad Tecnológica de Pereira',
    ],
    tags: ['AI', 'Industry 4.0', 'IoT', 'Automation'],
    color: '#0078D4',
  },
  {
    id: 'web-bootcamp',
    type: 'cert',
    title: 'Web Development Bootcamp',
    organization: 'Universidad Tecnológica de Pereira',
    period: '2024',
    description: [
      'Intensive full-stack bootcamp covering modern web technologies',
      'HTML, CSS, JavaScript, React, Node.js, database integration',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: '#3776AB',
  },
  {
    id: 'sena',
    type: 'education',
    title: 'Systems Technician',
    organization: 'SENA',
    period: '2022 — 2024',
    description: [
      'Technical degree in Systems — hardware, networking, operating systems',
      'Foundations of programming, databases, and IT infrastructure',
    ],
    tags: ['IT', 'Networking', 'Hardware', 'Databases'],
    color: '#3ECF8E',
  },
  {
    id: 'colombo',
    type: 'education',
    title: 'High School + English B2',
    organization: 'Colombo Americano de Pereira',
    period: '2018 — 2022',
    description: [
      'High School Diploma with bilingual education (Spanish + English)',
      'Achieved B2 English proficiency (CEFR framework)',
    ],
    tags: ['English B2', 'Bilingual'],
    color: '#888888',
  },
]

// ─── Cloud Learning Path ──────────────────────────────────────
export interface PathStep {
  id: string
  title: string
  subtitle: string
  status: 'done' | 'in-progress' | 'next' | 'future'
  color: string
  icon: string
  description: string
  skills: string[]
}

export const CLOUD_PATH: PathStep[] = [
  {
    id: 'python',
    title: 'Python Mastery',
    subtitle: 'The Foundation',
    status: 'done',
    color: '#3776AB',
    icon: '🐍',
    description: 'Solid foundation in Python — scripting, OOP, automation, web backends with Flask/FastAPI.',
    skills: ['Python 3', 'OOP', 'Flask', 'FastAPI', 'NumPy', 'Pandas'],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    subtitle: 'Numbers → Insights',
    status: 'done',
    color: '#FF9900',
    icon: '📊',
    description: 'Data wrangling, visualization, and statistical analysis with the Python data science stack.',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter', 'SQL'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web',
    subtitle: 'Production Apps',
    status: 'done',
    color: '#3ECF8E',
    icon: '🌐',
    description: 'Built and deployed multiple production apps — React, Next.js, Supabase, Tailwind, Vercel.',
    skills: ['React', 'Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel'],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Models → Production',
    status: 'in-progress',
    color: '#F7931E',
    icon: '🤖',
    description: 'Exploring supervised & unsupervised learning, model evaluation, and engineering ML pipelines.',
    skills: ['Scikit-learn', 'Feature Engineering', 'Model Evaluation', 'Jupyter'],
  },
  {
    id: 'cloud',
    title: 'Cloud Platforms',
    subtitle: 'AWS + Azure',
    status: 'in-progress',
    color: '#0078D4',
    icon: '☁️',
    description: 'Currently learning AWS & Azure fundamentals — compute, storage, serverless, data services.',
    skills: ['AWS EC2', 'S3', 'Lambda', 'Azure ADF', 'Azure Databricks', 'IAM'],
  },
  {
    id: 'databricks',
    title: 'Databricks & Spark',
    subtitle: 'Data at Scale',
    status: 'next',
    color: '#FF3621',
    icon: '⚡',
    description: 'Learning Apache Spark and Databricks for large-scale data processing and ML at scale.',
    skills: ['Apache Spark', 'Databricks', 'Delta Lake', 'PySpark', 'MLflow'],
  },
  {
    id: 'de',
    title: 'Data Engineering',
    subtitle: 'Pipelines → Insights',
    status: 'future',
    color: '#9C59D1',
    icon: '🏗️',
    description: 'The goal: build robust data pipelines, ETL processes, and real-time streaming systems.',
    skills: ['dbt', 'Airflow', 'Kafka', 'Data Warehousing', 'ETL', 'ELT'],
  },
]

// ─── Social Links ─────────────────────────────────────────────
export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/Eljosek',
    color: '#ffffff',
    description: '4 public projects + more',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/jose-miguel-herrera-gutiérrez-841319340',
    color: '#0A66C2',
    description: 'Professional network',
  },
  {
    label: 'Email',
    icon: 'mail',
    url: 'mailto:josemiguelherreragutierrez7@gmail.com',
    color: '#EA4335',
    description: 'josemiguelherreragutierrez7@gmail.com',
  },
  {
    label: 'Download CV',
    icon: 'download',
    url: '/jose_herrera_cv_en.pdf',
    color: '#3776AB',
    description: 'Resume (English)',
  },
]
