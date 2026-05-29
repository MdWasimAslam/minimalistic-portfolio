import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AnimatePresence, motion } from "framer-motion";
import CuteCat from "./CuteCat";

const MotionBox = motion(Box);
const SIZE = 46;

// Find a spot peeking over the top edge of a random panel card.
function getSpot() {
  if (typeof document === "undefined") return null;
  const panels = Array.from(document.querySelectorAll("#desk > section"));
  if (panels.length) {
    const r = panels[Math.floor(Math.random() * panels.length)].getBoundingClientRect();
    const left = Math.min(Math.max(r.left + r.width * (0.18 + Math.random() * 0.55), 8), window.innerWidth - SIZE - 8);
    const top = Math.max(r.top - SIZE * 0.5, 62);
    return { left, top };
  }
  return { left: window.innerWidth - SIZE - 24, top: window.innerHeight - SIZE - 8 };
}

export default function CatEasterEgg() {
  const [spot, setSpot] = useState({ left: 40, top: 80 });
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const scheduleNext = useCallback(() => {
    clearTimers();
    const appearIn = 4000 + Math.random() * 9000;
    timers.current.push(
      setTimeout(() => {
        const s = getSpot();
        if (s) setSpot(s);
        setVisible(true);
        timers.current.push(setTimeout(() => setVisible(false), 5200));
        timers.current.push(setTimeout(scheduleNext, 5700));
      }, appearIn)
    );
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const s = getSpot();
      if (s) setSpot(s);
      setVisible(true);
      return undefined;
    }
    scheduleNext();
    return clearTimers;
  }, [scheduleNext]);

  const onCatClick = () => {
    setVisible(false); // ducks away…
    clearTimers();
    setTimeout(() => setOpen(true), 220); // …then reveals Oreo
  };

  const onClose = () => {
    setOpen(false);
    scheduleNext();
  };

  return (
    <>
      <AnimatePresence>
        {visible && !open && (
          <Box sx={{ position: "fixed", left: spot.left, top: spot.top, zIndex: 1400, pointerEvents: "none" }}>
            <MotionBox
              role="button"
              aria-label="A cat is peeking — click it"
              onClick={onCatClick}
              initial={{ y: "85%", opacity: 0, rotate: -4 }}
              animate={{ y: "0%", opacity: 1, rotate: 0 }}
              exit={{ y: "90%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              whileHover={{ y: "-12%", scale: 1.06 }}
              sx={{ pointerEvents: "auto", cursor: "pointer", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.45))" }}
            >
              <CuteCat size={SIZE} />
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, bgcolor: "background.paper", border: "1px solid", borderColor: "divider" } }}>
        <Box sx={{ position: "relative", p: { xs: 2.5, sm: 3 } }}>
          <IconButton onClick={onClose} aria-label="Close" sx={{ position: "absolute", top: 8, right: 8, color: "text.secondary", zIndex: 2 }}>
            <CloseRoundedIcon />
          </IconButton>
          <DialogContent sx={{ p: 0 }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>You caught him</Typography>
            <Typography variant="h5" sx={{ mb: 0.75, mt: 0.5 }}>Meet Oreo 🐾</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              My senior code reviewer — approves PRs by sitting on the keyboard, ships to <code>main</code> by walking across it. Say hi.
            </Typography>
            <Box
              component="video"
              src="/projects/cat_vid.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              sx={{ width: "100%", height: "auto", maxHeight: "60vh", objectFit: "contain", borderRadius: 2, display: "block", border: "1px solid", borderColor: "divider", bgcolor: "#000" }}
            />
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
