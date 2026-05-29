import { Box, Chip, Link, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { motion } from "framer-motion";
import Panel from "../components/Panel";
import SmartImage from "../components/SmartImage";
import { useContent } from "../content/ContentContext";
import { reveal, staggerContainer, viewportOnce } from "../animations/variants";

const MotionBox = motion(Box);

function faviconOf(url) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
  } catch (e) {
    return null;
  }
}

function WorkCard({ project }) {
  const href = project.link || project.github;
  const fav = project.link ? faviconOf(project.link) : null;
  return (
    <MotionBox variants={reveal} sx={{ mb: 4 }}>
      <Box
        component={href ? "a" : "div"}
        href={href || undefined}
        target={href ? "_blank" : undefined}
        rel="noopener noreferrer"
        sx={{
          display: "block",
          borderRadius: 2.5,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          background: "background.paper",
          transition: "border-color .25s ease, background-color .25s ease",
          "&:hover": { borderColor: "text.secondary", bgcolor: "custom.eventTint" },
        }}
      >
        <SmartImage src={project.image} alt={`${project.title} — screenshot`} fallbackLabel={project.title} ratio="16 / 10" radius={0} objectPosition="top" sx={{ border: "none" }} />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
          {fav && (
            <Box sx={{ width: 20, height: 20, borderRadius: "5px", overflow: "hidden", flexShrink: 0, bgcolor: "#fff", display: "grid", placeItems: "center" }}>
              <Box component="img" src={fav} alt="" width={16} height={16} loading="lazy" onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
            </Box>
          )}
          <Typography sx={{ fontWeight: 600, fontSize: "1.05rem" }} noWrap>{project.title}</Typography>
        </Stack>
        <Typography variant="overline" sx={{ color: "text.secondary", flexShrink: 0 }}>{project.year}</Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>{project.kind}</Typography>
      <Typography variant="body2" sx={{ color: "text.primary", mt: 1 }}>{project.description}</Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.7} sx={{ mt: 1.5 }}>
        {project.tags.map((t) => (
          <Chip key={t} label={t} size="small" sx={{ height: 22, fontSize: "0.72rem" }} />
        ))}
      </Stack>
      {href && (
        <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, mt: 1.5, fontSize: "0.85rem", fontWeight: 500, color: "text.secondary", "&:hover": { color: "success.main" } }}>
          {project.link ? "Visit" : "Code"} <NorthEastRoundedIcon sx={{ fontSize: 14 }} />
        </Link>
      )}
    </MotionBox>
  );
}

export default function WorkPanel() {
  const { projects } = useContent();
  const features = projects.filter((p) => p.featured);
  return (
    <Panel label="Professional Work">
      <MotionBox variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        {features.map((p) => (
          <WorkCard key={p.title} project={p} />
        ))}
      </MotionBox>
    </Panel>
  );
}
