import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cross-fades through a list of words in place (used for "Full-stack <word>").
 * Reserves width with the longest word so the layout never shifts.
 */
export default function RotatingWord({ words, interval = 2600, sx }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <Box component="span" sx={{ position: "relative", display: "inline-block", verticalAlign: "bottom", ...sx }}>
      <Box component="span" sx={{ visibility: "hidden", whiteSpace: "nowrap" }}>{longest}</Box>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", left: 0, whiteSpace: "nowrap" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </Box>
  );
}
