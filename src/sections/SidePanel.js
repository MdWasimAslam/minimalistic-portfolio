import { Box, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { motion } from "framer-motion";
import Panel from "../components/Panel";
import { useContent } from "../content/ContentContext";
import { reveal, staggerContainer, viewportOnce } from "../animations/variants";

const MotionBox = motion(Box);
const COLORS = ["#5B8CFF", "#46D67E", "#BD93F9", "#F2A65A", "#EC6A8C"];

export default function SidePanel() {
  const { projects } = useContent();
  const side = projects.filter((p) => !p.featured);
  return (
    <Panel label="Side Projects">
      <MotionBox variants={staggerContainer(0.06)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        {side.map((p, i) => {
          const href = p.link || p.github;
          const color = COLORS[i % COLORS.length];
          return (
            <motion.div key={p.title} variants={reveal}>
              <Box
                component={href ? "a" : "div"}
                href={href || undefined}
                target={href ? "_blank" : undefined}
                rel="noopener noreferrer"
                sx={{
                  display: "block",
                  p: 1.75,
                  mb: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  transition: "border-color .25s ease, background-color .25s ease",
                  "&:hover": { borderColor: "text.secondary", bgcolor: "custom.eventTint" },
                  "&:hover .r-arrow": { opacity: 1 },
                  "&:hover .r-title": { color: "text.primary" },
                }}
              >
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ minWidth: 0 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, flexShrink: 0, display: "grid", placeItems: "center", mt: 0.2, color, bgcolor: `${color}22`, fontWeight: 700, fontSize: "0.95rem" }}>
                      {p.title[0]}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography className="r-title" sx={{ fontWeight: 600, transition: "color .3s ease" }}>{p.title}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{p.kind}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.86rem" }}>{p.description}</Typography>
                    </Box>
                  </Stack>
                  {href && <NorthEastRoundedIcon className="r-arrow" sx={{ fontSize: 16, color: "text.secondary", opacity: 0.4, transition: "all .3s ease", flexShrink: 0, mt: 0.3 }} />}
                </Stack>
              </Box>
            </motion.div>
          );
        })}
      </MotionBox>
    </Panel>
  );
}
