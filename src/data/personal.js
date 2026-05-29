// Single source of truth for personal / contact info.
export const personal = {
  name: "Md Wasim Aslam",
  firstName: "Wasim",
  title: "Full-stack developer",
  greeting: "Hey, I'm Wasim.",

  // Two warm, honest opening lines (Mackenzie-style voice — true to Wasim).
  intro:
    "I build internet things — apps thousands of people open every day, and a few experiments only I'll ever use. The part I love is the moment an idea stops being a Figma frame and becomes something real in someone's hands.",
  introNote:
    "I'm based in Kolkata, where my days are React on the front and Node on the back, and my nights are spent poking at whatever new tool just dropped. I learn most by shipping — then quietly rewriting it better the second time.",

  // Labeled "definition list" blocks (Age is rendered live, separately).
  about: [
    { label: "Role", value: "Full-stack developer. I take a feature from an empty migration file all the way to the dashboard someone actually clicks." },
    { label: "Experience", value: "4 years building and shipping production apps — a live-commerce platform, a creator storefront, and an ATS used by real recruiters." },
    { label: "Location", value: "Kolkata, India." },
  ],

  // Age ticks live from this date.
  birthDate: "1998-10-27",

  location: "Kolkata, India",
  email: "wasimaslam2897@gmail.com",
  phone: "+91 91636 70431",
  resumeUrl: "/Md_Wasim_Aslam.pdf",
  avatar: "/avatar.jpeg",
  tools: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Redux", "Tailwind", "Material UI", "Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "REST APIs", "WebSockets", "Git", "Docker", "Figma", "Claude Code"],

  socials: {
    github: "https://github.com/MdWasimAslam",
    linkedin: "https://www.linkedin.com/in/md-wasim-aslam/",
    youtube: "https://www.youtube.com/channel/UCZmOMkYG2aBgbY13ZI_2mJw",
    email: "mailto:wasimaslam2897@gmail.com",
  },

  // Contact handles shown in the About panel.
  contacts: [
    { label: "GitHub", handle: "MdWasimAslam", href: "https://github.com/MdWasimAslam" },
    { label: "LinkedIn", handle: "md-wasim-aslam", href: "https://www.linkedin.com/in/md-wasim-aslam/" },
    { label: "Email", handle: "wasimaslam2897@gmail.com", href: "mailto:wasimaslam2897@gmail.com" },
  ],
};

export default personal;
