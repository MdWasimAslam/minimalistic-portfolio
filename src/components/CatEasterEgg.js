import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogContent, IconButton, Tooltip, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AnimatePresence, motion } from "framer-motion";
import CuteCat from "./CuteCat";

const MotionBox = motion(Box);
const SIZE = 48;

// Pick a spot peeking up from behind a random panel card (offsets are relative
// to #desk, which is the cat's offset parent).
function getSpot() {
  if (typeof document === "undefined") return { left: 24, top: 4 };
  const panels = Array.from(document.querySelectorAll("#desk > section"));
  if (panels.length) {
    const el = panels[Math.floor(Math.random() * panels.length)];
    const minL = el.offsetLeft + 8;
    const maxL = el.offsetLeft + el.offsetWidth - SIZE - 8;
    const left = Math.min(Math.max(el.offsetLeft + el.offsetWidth * (0.15 + Math.random() * 0.6), minL), Math.max(maxL, minL));
    const top = Math.max(el.offsetTop - SIZE * 0.62, 2);
    return { left, top };
  }
  return { left: 24, top: 4 };
}

export default function CatEasterEgg() {
  const [spot, setSpot] = useState({ left: 40, top: 6 });
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
        setSpot(getSpot());
        setVisible(true);
        timers.current.push(setTimeout(() => setVisible(false), 5400));
        timers.current.push(setTimeout(scheduleNext, 5900));
      }, appearIn)
    );
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setSpot(getSpot());
      setVisible(true);
      return undefined;
    }
    scheduleNext();
    return clearTimers;
  }, [scheduleNext]);

  const onCatClick = () => {
    setVisible(false);
    clearTimers();
    setTimeout(() => setOpen(true), 220);
  };

  const onClose = () => {
    setOpen(false);
    scheduleNext();
  };

  return (
    <>
      <AnimatePresence>
        {visible && !open && (
          <Tooltip title="don't click me 😼" arrow placement="top">
            <MotionBox
              role="button"
              aria-label="A cat is peeking"
              onClick={onCatClick}
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "65%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              whileHover={{ y: "-14%", scale: 1.05 }}
              sx={{
                position: "absolute",
                left: spot.left,
                top: spot.top,
                width: SIZE,
                height: SIZE,
                zIndex: 0, // behind the panel cards (which sit at zIndex 1)
                cursor: "pointer",
                filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.4))",
              }}
            >
              <CuteCat size={SIZE} />
            </MotionBox>
          </Tooltip>
        )}
      </AnimatePresence>

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, bgcolor: "background.paper", border: "1px solid", borderColor: "divider" } }}>
        <Box sx={{ position: "relative", p: { xs: 2.5, sm: 3 } }}>
          <IconButton onClick={onClose} aria-label="Close" sx={{ position: "absolute", top: 8, right: 8, color: "text.secondary", zIndex: 2 }}>
            <CloseRoundedIcon />
          </IconButton>
          <DialogContent sx={{ p: 0 }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>I told you not to</Typography>
            <Typography variant="h5" sx={{ mb: 0.75, mt: 0.5 }}>Meet Oreo 🐾</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              My senior code reviewer — approves PRs by sitting on the keyboard, ships to <code>main</code> by walking across it. You clicked anyway. Respect.
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
