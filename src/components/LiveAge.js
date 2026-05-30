import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Age in years, ticking live to ~10 decimals — the little detail that makes
 * the page feel alive. Pauses under reduced-motion (shows a steady value).
 */
export default function LiveAge({ birthDate }) {
  const birth = useRef(new Date(birthDate).getTime()).current;
  const [age, setAge] = useState(() => (Date.now() - birth) / YEAR_MS);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setAge((Date.now() - birth) / YEAR_MS);
      return;
    }
    let raf;
    const loop = () => {
      setAge((Date.now() - birth) / YEAR_MS);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [birth]);

  return (
    <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
      {Number.isFinite(age) ? `${age.toFixed(10)} years old` : "—"}
    </Box>
  );
}
