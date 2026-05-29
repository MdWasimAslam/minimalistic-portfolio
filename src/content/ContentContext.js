import { createContext, useContext, useEffect, useState } from "react";
import { personal as personalDefault } from "../data/personal";
import { projects as projectsDefault } from "../data/projects";
import { experiences as experiencesDefault } from "../data/experience";
import { education as educationDefault } from "../data/achievements";

// The full editable document, assembled from the static data files.
export const defaultContent = {
  personal: personalDefault,
  projects: projectsDefault,
  experiences: experiencesDefault,
  education: educationDefault,
};

// Merge a saved (partial) document from the DB over the defaults.
export function mergeContent(saved) {
  const s = saved || {};
  return {
    personal: { ...defaultContent.personal, ...(s.personal || {}) },
    projects: Array.isArray(s.projects) ? s.projects : defaultContent.projects,
    experiences: Array.isArray(s.experiences) ? s.experiences : defaultContent.experiences,
    education: Array.isArray(s.education) ? s.education : defaultContent.education,
  };
}

const ContentContext = createContext(defaultContent);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    let alive = true;
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : {}))
      .then((saved) => {
        if (alive && saved && Object.keys(saved).length) setContent(mergeContent(saved));
      })
      .catch(() => {
        /* no API locally / not configured yet — defaults are fine */
      });
    return () => {
      alive = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export default ContentContext;
