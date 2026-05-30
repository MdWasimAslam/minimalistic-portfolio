import { Box } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { motion } from "framer-motion";
import Panel from "../components/Panel";
import { useContent } from "../content/ContentContext";
import { reveal, staggerContainer, viewportOnce } from "../animations/variants";

const MotionBox = motion(Box);
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const PX = 116; // pixels per year
const GUTTER = 44; // year-label column
const PALETTE = ["#4285F4", "#34A853", "#8E24AA", "#EF6C00", "#D50000"]; // Google-Calendar-ish

function nowFrac() {
  const d = new Date();
  return d.getFullYear() + d.getMonth() / 12;
}
function toFrac(token) {
  if (!token) return null;
  if (/present|now/i.test(token)) return nowFrac();
  const y = (token.match(/\d{4}/) || [])[0];
  if (!y) return null;
  const m = (token.match(/[A-Za-z]{3}/) || [])[0];
  const month = m ? MONTHS[m.toLowerCase()] : null;
  return parseInt(y, 10) + (month != null ? month / 12 : 0);
}
function parsePeriod(period) {
  const [a, b] = period.split(/\s*[—–-]\s*/);
  const start = toFrac(a);
  const end = toFrac(b) ?? start;
  return start == null ? null : { start, end: Math.max(end, start + 0.5) };
}

// Lanes so overlapping events sit side-by-side (GCal style).
function layout(events) {
  const sorted = [...events].sort((x, y) => x.start - y.start);
  const laneEnds = [];
  sorted.forEach((e) => {
    let lane = laneEnds.findIndex((end) => e.start >= end - 0.001);
    if (lane === -1) { lane = laneEnds.length; laneEnds.push(e.end); }
    else laneEnds[lane] = e.end;
    e.lane = lane;
  });
  const parent = sorted.map((_, i) => i);
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < sorted.length; i++)
    for (let j = i + 1; j < sorted.length; j++)
      if (sorted[i].start < sorted[j].end && sorted[j].start < sorted[i].end) parent[find(i)] = find(j);
  const cols = {};
  sorted.forEach((e, i) => { const g = find(i); cols[g] = Math.max(cols[g] || 1, e.lane + 1); });
  sorted.forEach((e, i) => { e.cols = cols[find(i)]; });
  return sorted;
}

export default function CareerPanel() {
  const { experiences, education } = useContent();

  const raw = [
    ...experiences.map((e) => ({ kind: "work", title: e.role, designation: e.designation, org: e.company, period: e.period.replace(/present/i, "Now"), link: e.links && e.links[0] })),
    ...education.map((e) => ({ kind: "edu", title: e.degree, org: e.school, period: e.period, link: e.link || null })),
  ]
    .map((e, i) => ({ ...e, ...parsePeriod(e.period), color: PALETTE[i % PALETTE.length] }))
    .filter((e) => e.start != null);

  const events = layout(raw);
  const top = Math.ceil(Math.max(...events.map((e) => e.end)));
  const bottom = Math.floor(Math.min(...events.map((e) => e.start)));
  const height = (top - bottom) * PX;
  const y = (frac) => (top - frac) * PX;
  const now = nowFrac();
  const showNow = now <= top && now >= bottom;

  const years = [];
  for (let yr = top; yr >= bottom; yr--) years.push(yr);

  return (
    <Panel label="Career Journey">
      <MotionBox variants={staggerContainer(0.06)} initial="hidden" whileInView="visible" viewport={viewportOnce} sx={{ position: "relative", height, mt: 0.5 }}>
        {/* year gridlines + labels */}
        {years.map((yr) => (
          <Box key={yr} sx={{ position: "absolute", left: 0, right: 0, top: y(yr) }}>
            <Box sx={{ position: "absolute", left: GUTTER - 4, right: 0, top: 0, borderTop: "1px solid", borderColor: "divider" }} />
            <Box sx={{ position: "absolute", left: 0, top: -8, width: GUTTER - 8, textAlign: "right", fontFamily: '"Fira Code", monospace', fontSize: "0.74rem", color: "text.secondary" }}>{yr}</Box>
          </Box>
        ))}

        {/* event area */}
        <Box sx={{ position: "absolute", left: GUTTER, right: 2, top: 0, bottom: 0 }}>
          {events.map((e, i) => {
            const blockTop = y(e.end);
            const blockH = (e.end - e.start) * PX;
            const widthPct = 100 / e.cols;
            const leftPct = (e.lane / e.cols) * 100;
            const Icon = e.kind === "work" ? WorkRoundedIcon : SchoolRoundedIcon;
            const InnerTag = e.link ? "a" : "div";
            return (
              <MotionBox
                key={e.title + i}
                variants={reveal}
                component={InnerTag}
                href={e.link ? e.link.url : undefined}
                target={e.link ? "_blank" : undefined}
                rel="noopener noreferrer"
                sx={{
                  position: "absolute",
                  top: blockTop + 2,
                  height: Math.max(blockH - 5, 44),
                  left: `calc(${leftPct}% + 3px)`,
                  width: `calc(${widthPct}% - 6px)`,
                  display: "block",
                  overflow: "hidden",
                  borderRadius: 2,
                  p: 1.1,
                  color: "#fff",
                  bgcolor: e.color,
                  // subtle gradient sheen for depth (still flat/GCal-ish)
                  backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 55%)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.28)",
                  cursor: e.link ? "pointer" : "default",
                  transition: "transform .2s ease, filter .2s ease, box-shadow .2s ease",
                  "&:hover": { filter: "brightness(1.07)", transform: "scale(1.012)", boxShadow: "0 6px 16px rgba(0,0,0,0.35)" },
                }}
              >
                <Icon sx={{ position: "absolute", top: 7, right: 7, fontSize: 14, opacity: 0.45 }} />
                <Box sx={{ fontWeight: 700, fontSize: "0.8rem", lineHeight: 1.2, pr: 2.2 }}>{e.title}</Box>
                {e.designation && (
                  <Box sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.85, mt: 0.25 }}>{e.designation}</Box>
                )}
                <Box sx={{ fontSize: "0.74rem", opacity: 0.92, lineHeight: 1.25, mt: 0.35 }}>{e.org}</Box>
                <Box sx={{ fontSize: "0.66rem", opacity: 0.85, mt: 0.4, fontFamily: '"Fira Code", monospace' }}>{e.period}</Box>
                {e.link && blockH > 100 && (
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.3, mt: 0.6, fontSize: "0.64rem", fontWeight: 700, bgcolor: "rgba(255,255,255,0.18)", px: 0.7, py: 0.2, borderRadius: 1 }}>
                    {e.link.label} <NorthEastRoundedIcon sx={{ fontSize: 12 }} />
                  </Box>
                )}
              </MotionBox>
            );
          })}
        </Box>

        {/* "now" line — like Google Calendar's current-time indicator */}
        {showNow && (
          <Box sx={{ position: "absolute", left: GUTTER - 10, right: 0, top: y(now), zIndex: 5, display: "flex", alignItems: "center", pointerEvents: "none" }}>
            <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#EA4335", flexShrink: 0, boxShadow: "0 0 0 3px rgba(234,67,53,0.25)" }} />
            <Box sx={{ flex: 1, height: "2px", bgcolor: "#EA4335" }} />
            <Box sx={{ position: "absolute", left: 14, top: -16, px: 0.7, py: 0.1, borderRadius: 1, bgcolor: "#EA4335", color: "#fff", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.05em" }}>NOW</Box>
          </Box>
        )}
      </MotionBox>
    </Panel>
  );
}
