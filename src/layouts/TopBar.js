import { useEffect, useState } from "react";
import { Box, Button, Container, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import StreamingText from "../components/StreamingText";
import { useContent } from "../content/ContentContext";

// Distinct roles (no repeated "Full-…" pattern), streamed in word-by-word.
const ROLES = ["Full-stack developer", "Problem solver", "React specialist", "Product-minded engineer", "Relentless shipper"];

function useKolkataClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function TopBar({ themeKey, onPickTheme, themes = [] }) {
  const { personal } = useContent();
  const time = useKolkataClock();
  const [copied, setCopied] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const current = themes.find((t) => t.key === themeKey);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = personal.socials.email;
    }
  };

  return (
    <Box component="header" sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.default" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 56, gap: 2 }}>
          {/* identity */}
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{personal.name}</Typography>
            <Box component="span" sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}>·</Box>
            <Box sx={{ color: "text.secondary", display: { xs: "none", sm: "block" }, fontSize: "0.875rem", whiteSpace: "nowrap" }}>
              <StreamingText phrases={ROLES} />
            </Box>
          </Stack>

          {/* controls */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 1 }}>
            {/* theme switcher */}
            <Tooltip title="Switch theme" arrow>
              <Button
                onClick={(e) => setAnchor(e.currentTarget)}
                size="small"
                startIcon={<PaletteOutlinedIcon sx={{ fontSize: 17 }} />}
                sx={{ color: "text.secondary", display: { xs: "none", sm: "inline-flex" }, fontSize: "0.82rem", "&:hover": { color: "text.primary", background: "transparent" } }}
              >
                {current ? current.name : "Theme"}
              </Button>
            </Tooltip>
            <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small" aria-label="Theme" sx={{ display: { xs: "inline-flex", sm: "none" }, color: "text.secondary" }}>
              <PaletteOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              {themes.map((t) => (
                <MenuItem key={t.key} onClick={() => { onPickTheme(t.key); setAnchor(null); }} selected={themeKey === t.key} sx={{ fontSize: "0.9rem", gap: 1.25, minWidth: 196 }}>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: t.bg, border: "1px solid", borderColor: "divider" }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: t.accent }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>{t.name}</Box>
                  {t.mode === "light" && <LightModeRoundedIcon sx={{ fontSize: 14, color: "text.secondary" }} />}
                  {themeKey === t.key && <CheckRoundedIcon sx={{ fontSize: 16 }} />}
                </MenuItem>
              ))}
            </Menu>

            {/* clock — extra gap from the email button */}
            <Stack direction="row" alignItems="center" spacing={0.8} sx={{ display: { xs: "none", md: "flex" }, color: "text.secondary", mr: { md: 1.5 } }}>
              <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "text.secondary", opacity: 0.5 }} />
              <Typography variant="body2" sx={{ fontFamily: '"Fira Code", monospace', fontSize: "0.8rem" }}>Kolkata · {time}</Typography>
            </Stack>

            <Tooltip title={copied ? "Copied!" : personal.email} arrow>
              <Button onClick={copyEmail} variant="outlined" size="small" startIcon={copied ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />} sx={{ py: 0.5, px: 1.6, fontSize: "0.85rem", color: copied ? "success.main" : "text.primary", borderColor: copied ? "success.main" : "divider" }}>
                {copied ? "Copied" : "Copy email"}
              </Button>
            </Tooltip>

            <Button variant="contained" size="small" href={personal.resumeUrl} download sx={{ py: 0.5, px: 1.8, fontSize: "0.85rem", display: { xs: "none", sm: "inline-flex" } }}>Résumé</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
