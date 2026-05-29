// Project data. `featured` projects appear large with a real screenshot under
// "Selected Work"; the rest list under "Other things I've built".
export const projects = [
  {
    title: "CommentSold",
    kind: "Live commerce · Entiovi",
    year: "2025",
    description:
      "A live-selling mobile app — live video, real-time comments, one-tap add-to-cart and checkout. Built with React Native (Expo) for iOS and Android.",
    image: "/projects/commentsold.jpg",
    tags: ["React Native", "Expo", "TypeScript", "WebSockets", "Real-time", "Payments", "Push Notifications", "Deep Linking"],
    link: "https://try.commentsold.com",
    github: null,
    featured: true,
  },
  {
    title: "Pop.store",
    kind: "Creator commerce · Entiovi",
    year: "2025",
    description:
      "A creator link-in-bio storefront — customizable pages, digital products, subscriptions, affiliate links and analytics dashboards. Built in React + TypeScript.",
    image: "/projects/popstore.jpg",
    tags: ["React.js", "TypeScript", "Redux", "REST APIs", "Subscriptions", "Stripe", "Analytics", "SEO"],
    link: "https://get.pop.store/",
    github: null,
    featured: true,
  },
  {
    title: "ClearedTalent",
    kind: "Applicant tracking · NLB",
    year: "2022–25",
    description:
      "An in-house ATS that automates interview scheduling, candidate tracking and résumé parsing. React front end, Node/Express + MongoDB with role-based access — cut time-to-hire by ~30%.",
    image: "/projects/clearedtalent.jpg",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "JWT Auth", "RBAC", "Résumé Parsing"],
    link: "https://www.clearedtalent.com/",
    github: null,
    featured: true,
  },
  {
    title: "FlywheelCars CRM",
    kind: "Automotive CRM · Side project",
    year: "2023",
    description:
      "A customer-management system with IVR call tracking, live inventory and lead management. Later acquired by a dealership.",
    image: "/projects/flywheel.jpg",
    tags: ["React", "Node.js", "IVR"],
    link: "https://crm.flywheelcars.com/",
    github: null,
    featured: false,
  },
  {
    title: "Healthcare Analytics",
    kind: "Data platform · NLB",
    year: "2022–25",
    description:
      "Node/Express data pipelines and interactive D3.js dashboards turning patient data into cohort insights.",
    image: "/projects/healthcare.svg",
    tags: ["React", "D3.js", "Node.js", "Express", "MongoDB", "Data Pipelines", "Cohort Analytics"],
    link: "https://www.linkedin.com/company/actu-real/posts/?feedView=all",
    github: null,
    featured: true,
  },
  {
    title: "DocuVerse",
    kind: "AI · Side project",
    year: "2024",
    description: "Chat with your PDFs — a retrieval-augmented chatbot (LangChain + OpenAI) that answers grounded in your documents.",
    image: null,
    tags: ["LangChain", "OpenAI", "React"],
    link: null,
    github: "https://github.com/MdWasimAslam/DocuVerse",
    featured: false,
  },
  {
    title: "Google Search Clone",
    kind: "UI build · Side project",
    year: "2023",
    description: "A pixel-faithful Google Search clone built with the Google Search API and Material UI.",
    image: "/projects/googleclone.jpg",
    tags: ["React", "Material UI"],
    link: "https://wasim-googleclone-mui.netlify.app/",
    github: "https://github.com/MdWasimAslam/GoogleClone_React_MaterialUI",
    featured: false,
  },
  {
    title: "AniMash",
    kind: "Web app · Side project",
    year: "2022",
    description: "A Facemash-inspired app for rating anime characters, with an Elo-style scoring system.",
    image: null,
    tags: ["React", "JavaScript"],
    link: null,
    github: "https://github.com/MdWasimAslam/AnimeMatch_Frontend",
    featured: false,
  },
];

export default projects;
