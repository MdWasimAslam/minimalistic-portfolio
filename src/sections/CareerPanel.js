import { Box, Chip, Link, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { motion } from "framer-motion";
import Panel from "../components/Panel";
import { useContent } from "../content/ContentContext";
import { reveal, staggerContainer, viewportOnce } from "../animations/variants";

const MotionBox = motion(Box);
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const COLORS = ["#5B8CFF", "#46D67E", "#BD93F9", "#F2A65A", "#EC6A8C"];

function endFrac(period) {
  const end = period.split(/\s*[—–-]\s*/)[1] || period;
  if (/present|now/i.test(end)) return 9999;
  const y = (end.match(/\d{4}/) || [])[0];
  const m = (end.match(/[A-Za-z]{3}/) || [])[0];
  return y ? parseInt(y, 10) + (m ? MONTHS[m.toLowerCase()] / 12 : 0.99) : 0;
}

function Card({ ev, color }) {
  const work = ev.kind === "work";
  return (
    <motion.div variants={reveal}>
      <Box
        sx={{
          position: "relative",
          mb: 1.75,
          pl: 2,
          pr: 1.75,
          py: 1.75,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
          transition: "border-color .25s ease, transform .25s ease",
          "&:hover": { borderColor: color },
        }}
      >
        {/* colored accent bar */}
        <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, bgcolor: color }} />

        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box sx={{ flexShrink: 0, width: 36, height: 36, borderRadius: 1.5, display: "grid", placeItems: "center", color, bgcolor: `${color}22` }}>
            {work ? <WorkRoundedIcon sx={{ fontSize: 19 }} /> : <SchoolRoundedIcon sx={{ fontSize: 19 }} />}
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={0.75} sx={{ mb: 0.6 }}>
              <Box sx={{ px: 0.85, py: 0.25, borderRadius: 1, bgcolor: `${color}22`, color, fontFamily: '"Fira Code", monospace', fontSize: "0.64rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                {ev.period}
              </Box>
              {ev.designation && <Chip label={ev.designation} size="small" sx={{ height: 19, fontSize: "0.62rem", borderColor: color, color: "text.primary" }} variant="outlined" />}
            </Stack>

            <Typography sx={{ fontWeight: 600, fontSize: "0.98rem", lineHeight: 1.25 }}>{ev.title}</Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.2 }}>{ev.org}</Typography>
            {ev.note && <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.85, fontSize: "0.84rem" }}>{ev.note}</Typography>}

            {ev.link && (
              <Link href={ev.link.url} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, mt: 1.1, fontSize: "0.8rem", fontWeight: 500, color, "&:hover": { opacity: 0.7 } }}>
                {ev.link.label} <NorthEastRoundedIcon sx={{ fontSize: 14 }} />
              </Link>
            )}
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
}

export default function CareerPanel() {
  const { experiences, education } = useContent();
  const events = [
    ...experiences.map((e) => ({ kind: "work", title: e.role, org: e.company, designation: e.designation, period: e.period.replace(/present/i, "Now"), note: e.summary, tech: e.tech, link: e.links && e.links[0] })),
    ...education.map((e) => ({ kind: "edu", title: e.degree, org: e.school, period: e.period, note: e.score, tech: null, link: null })),
  ].sort((a, b) => endFrac(b.period) - endFrac(a.period));

  return (
    <Panel label="Career Journey">
      <MotionBox variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        {events.map((ev, i) => (
          <Card key={ev.title + i} ev={ev} color={COLORS[i % COLORS.length]} />
        ))}
      </MotionBox>
    </Panel>
  );
}
