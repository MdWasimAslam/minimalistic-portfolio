import { useEffect, useState } from "react";
import { Box } from "@mui/material";

/**
 * Typewriter / streaming effect: types a phrase out character-by-character,
 * pauses, erases it, then types the next — with a blinking caret.
 */
export default function StreamingText({ phrases, sx }) {
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(reduce ? phrases[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const full = phrases[idx];

    // finished typing → hold, then start deleting
    if (!deleting && sub === full) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    // finished deleting → move to next phrase
    if (deleting && sub === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
      return undefined;
    }
    const t = setTimeout(
      () => setSub((s) => (deleting ? full.substring(0, s.length - 1) : full.substring(0, s.length + 1))),
      deleting ? 45 : 80
    );
    return () => clearTimeout(t);
  }, [sub, deleting, idx, phrases, reduce]);

  return (
    <Box component="span" sx={{ display: "inline-block", whiteSpace: "nowrap", ...sx }}>
      {sub}
      {!reduce && (
        <Box
          component="span"
          aria-hidden
          sx={{
            display: "inline-block",
            width: "1px",
            ml: "1px",
            alignSelf: "stretch",
            borderRight: "1.5px solid currentColor",
            animation: "st-blink 1s step-end infinite",
            "@keyframes st-blink": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } },
          }}
        >
          &nbsp;
        </Box>
      )}
    </Box>
  );
}
