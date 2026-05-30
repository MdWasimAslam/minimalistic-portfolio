// Work experience (from resume). Most recent first.
export const experiences = [
  {
    company: "Entiovi Technologies Pvt. Ltd.",
    role: "React / React Native Developer",
    designation: "Software Developer",
    period: "Apr 2025 — Jun 2026",
    location: "Remote",
    summary:
      "Building live-commerce and creator social-commerce products used by thousands of sellers and creators.",
    highlights: [
      "Developed an e-commerce live-selling mobile app (CommentSold) with React Native (Expo) — live comments, instant add-to-cart, checkout, catalog, inventory and order management.",
      "Integrated real-time APIs/WebSockets, authentication, payments, push notifications and deep linking, optimizing for low-latency live commerce on iOS & Android.",
      "Shipped web features for Pop.store — a creator-focused link-in-bio storefront: customizable storefronts, subscriptions, affiliate links, checkout flows and creator dashboards.",
      "Collaborated with backend and product teams to deliver responsive, conversion-optimized experiences.",
    ],
    tech: ["React Native", "Expo", "React.js", "TypeScript", "WebSockets", "REST APIs"],
    metric: { value: 2, suffix: "", label: "Products shipped to production" },
    links: [
      { label: "CommentSold", url: "https://try.commentsold.com" },
      { label: "Pop.store", url: "https://get.pop.store/" },
    ],
  },
  {
    company: "NLB Technology Services Pvt. Ltd.",
    role: "Full Stack Developer",
    designation: "Software Developer",
    period: "Feb 2022 — Dec 2024",
    location: "Kolkata, India",
    summary:
      "Built an in-house Applicant Tracking System and contributed across healthcare and customer-support products.",
    highlights: [
      "Created an in-house Applicant Tracking System (ClearedTalent) automating interview scheduling, candidate status tracking and resume parsing.",
      "Built robust Node.js + Express backends with MongoDB and role-based access control (RBAC) for recruiters and candidates.",
      "Designed RESTful APIs connecting frontend and backend — cutting time-to-hire by 30%.",
      "Contributed to a healthcare analytics platform with Node.js data pipelines and interactive React + D3.js dashboards, and an OpenAI-powered support chatbot.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "D3.js", "OpenAI", "RBAC"],
    metric: { value: 30, suffix: "%", label: "Reduction in time-to-hire" },
    links: [{ label: "ClearedTalent", url: "https://www.clearedtalent.com/" }],
  },
];

export default experiences;
