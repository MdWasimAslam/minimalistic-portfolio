import { Box, Divider, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { motion } from "framer-motion";
import Panel from "../components/Panel";
import SmartImage from "../components/SmartImage";
import LiveAge from "../components/LiveAge";
import TechChip from "../components/TechChip";
import { useContent } from "../content/ContentContext";
import { reveal, staggerContainer } from "../animations/variants";

const MotionBox = motion(Box);

function Sep() {
  return <Divider sx={{ my: 2.25, borderColor: "divider" }} />;
}

function DefRow({ label, children }) {
  return (
    <motion.div variants={reveal}>
      <Box>
        <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 0.4 }}>{label}</Typography>
        <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.95rem", lineHeight: 1.6 }}>{children}</Typography>
      </Box>
    </motion.div>
  );
}

export default function AboutPanel() {
  const { personal } = useContent();
  return (
    <Panel label="About">
      <MotionBox variants={staggerContainer(0.07)} initial="hidden" animate="visible">
        {/* small portrait */}
        <motion.div variants={reveal}>
          <Box sx={{ width: 150, mb: 2.5 }}>
            <SmartImage src={personal.avatar} alt={`${personal.name} — ${personal.title}`} fallbackLabel={personal.name} ratio="1 / 1" radius={2} priority objectPosition="center" />
          </Box>
        </motion.div>

        <motion.div variants={reveal}>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.7rem", md: "1.9rem" }, mb: 1.75 }}>{personal.greeting}</Typography>
        </motion.div>
        <motion.div variants={reveal}>
          <Typography variant="body1" sx={{ color: "text.primary", mb: 1.75 }}>{personal.intro}</Typography>
        </motion.div>
        <motion.div variants={reveal}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>{personal.introNote}</Typography>
        </motion.div>

        {/* separators start after the Kolkata line */}
        <Sep />

        {(personal.about || []).map((row, i) => (
          <Box key={row.label}>
            <DefRow label={row.label}>{row.value}</DefRow>
            <Sep />
          </Box>
        ))}

        {/* Stack as colorful chips */}
        <motion.div variants={reveal}>
          <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 1 }}>Stack</Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.6}>
            {(personal.tools || []).map((t) => (
              <TechChip key={t} name={t} dense />
            ))}
          </Stack>
        </motion.div>
        <Sep />

        <motion.div variants={reveal}>
          <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 0.4 }}>Age</Typography>
          <Typography variant="body2" sx={{ color: "text.primary", fontFamily: '"Fira Code", monospace', fontSize: "0.9rem" }}>
            <LiveAge birthDate={personal.birthDate} />
          </Typography>
        </motion.div>
        <Sep />

        {/* contact links */}
        <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 0.75 }}>Find me</Typography>
        <MotionBox variants={staggerContainer(0.05)} initial="hidden" animate="visible">
          {(personal.contacts || []).map((c) => (
            <motion.div key={c.label} variants={reveal}>
              <Box
                component="a"
                href={c.href}
                target={c.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1.5,
                  px: 1.25,
                  mx: -1.25,
                  py: 1.1,
                  borderRadius: 1.5,
                  transition: "background-color .25s ease",
                  "&:hover": { bgcolor: "custom.eventTint" },
                  "&:hover .c-h": { color: "text.primary" },
                  "&:hover .c-a": { opacity: 1 },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="baseline" sx={{ minWidth: 0 }}>
                  <Typography variant="overline" sx={{ color: "text.secondary", minWidth: 64 }}>{c.label}</Typography>
                  <Typography className="c-h" sx={{ fontWeight: 500, fontSize: "0.95rem", transition: "color .3s ease", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.handle}</Typography>
                </Stack>
                <NorthEastRoundedIcon className="c-a" sx={{ fontSize: 15, color: "text.secondary", opacity: 0.4, transition: "all .3s ease", flexShrink: 0 }} />
              </Box>
            </motion.div>
          ))}
        </MotionBox>
      </MotionBox>
    </Panel>
  );
}
