import { useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionImg = motion.img;

/**
 * Image with a proper loading experience:
 *  - holds an aspect-ratio box so layout never shifts
 *  - shimmer skeleton until decoded
 *  - soft fade + scale-in on load
 *  - graceful fallback (gradient + initials) if the source errors
 *
 * Pass `fallbackLabel` to control the fallback monogram text.
 */
export default function SmartImage({
  src,
  alt,
  fallbackLabel = "",
  ratio = "16 / 10",
  radius = 2,
  sx,
  objectPosition = "center",
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // No source → behave like an error so the fallback monogram shows instead of
  // shimmering forever (the <img> that fires onLoad/onError never mounts).
  const failed = errored || !src;

  const initials = fallbackLabel
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: "hidden",
        bgcolor: "custom.panel",
        border: "1px solid",
        borderColor: "divider",
        ...sx,
      }}
    >
      {/* skeleton / fallback layer */}
      {(!loaded || failed) && (
        <Box
          aria-hidden
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: failed
              ? theme.palette.custom.skeleton
              : `linear-gradient(100deg, ${theme.palette.custom.skeleton} 30%, ${theme.palette.custom.skeletonShine} 50%, ${theme.palette.custom.skeleton} 70%)`,
            backgroundSize: failed ? "auto" : "200% 100%",
            animation: failed ? "none" : "smartimg-shimmer 1.4s ease-in-out infinite",
            "@keyframes smartimg-shimmer": {
              "0%": { backgroundPosition: "200% 0" },
              "100%": { backgroundPosition: "-200% 0" },
            },
          })}
        >
          {failed && initials && (
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ fontSize: { xs: "2.4rem", md: "3.4rem" }, fontWeight: 700, letterSpacing: "-0.04em", color: "text.primary" }}>
                {initials}
              </Box>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main", mx: "auto", mt: 1.5 }} />
            </Box>
          )}
        </Box>
      )}

      {src && !errored && (
        <MotionImg
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          initial={false}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block" }}
        />
      )}
    </Box>
  );
}
