import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Pick any theme from the header switcher. Carbon is the default.
export const THEMES = [
  // — dark —
  { key: "carbon", name: "Carbon", mode: "dark", bg: "#0D0D0F", paper: "#18181B", panel: "#242428", ink: "#FAFAFA", muted: "#A1A1AA", line: "#2C2C31", accent: "#E4E4E7" },
  { key: "graphite", name: "Graphite", mode: "dark", bg: "#19191A", paper: "#242322", panel: "#2F2D2B", ink: "#F4F2EF", muted: "#ABA8A2", line: "#353331", accent: "#E9E2D6" },
  { key: "midnight", name: "Midnight", mode: "dark", bg: "#0B1020", paper: "#141B30", panel: "#1E2742", ink: "#E7ECF6", muted: "#93A0B8", line: "#27314E", accent: "#6AA1FF" },
  { key: "tokyo", name: "Tokyo Night", mode: "dark", bg: "#1A1B26", paper: "#24283B", panel: "#2E3350", ink: "#C0CAF5", muted: "#8B93B5", line: "#353B52", accent: "#7AA2F7" },
  { key: "dracula", name: "Dracula", mode: "dark", bg: "#21222C", paper: "#282A36", panel: "#343746", ink: "#F8F8F2", muted: "#ABB2D6", line: "#44475A", accent: "#BD93F9" },
  { key: "mocha", name: "Catppuccin", mode: "dark", bg: "#181825", paper: "#1E1E2E", panel: "#2A2B3C", ink: "#CDD6F4", muted: "#9399B2", line: "#313244", accent: "#CBA6F7" },
  { key: "solarized", name: "Solarized", mode: "dark", bg: "#002B36", paper: "#073642", panel: "#0E4B59", ink: "#EEE8D5", muted: "#93A1A1", line: "#0E4B59", accent: "#B58900" },
  // — light —
  { key: "paper", name: "Paper", mode: "light", bg: "#F4F3EF", paper: "#FFFFFF", panel: "#EFEEE8", ink: "#1A1A17", muted: "#6B6B62", line: "#E5E3DB", accent: "#57564E" },
  { key: "daylight", name: "Daylight", mode: "light", bg: "#F6F8FB", paper: "#FFFFFF", panel: "#EEF1F5", ink: "#1B1E24", muted: "#69707A", line: "#E2E6EC", accent: "#2D6CDF" },
];

const map = Object.fromEntries(THEMES.map((t) => [t.key, t]));

function fill(c) {
  const dark = c.mode === "dark";
  return {
    ...c,
    headerBg: dark ? c.paper : "rgba(255,255,255,0.9)",
    scrollThumb: dark ? "rgba(255,255,255,0.18)" : "#cfccc4",
    scrollThumbHover: dark ? "rgba(255,255,255,0.30)" : "#b8b5ac",
    skeleton: c.panel,
    skeletonShine: c.line,
    eventTint: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.045)",
    contrastText: dark ? c.bg : "#FFFFFF",
  };
}

function build(t) {
  let theme = createTheme({
    palette: {
      mode: t.mode,
      primary: { main: t.ink, contrastText: t.contrastText },
      success: { main: t.accent },
      background: { default: t.bg, paper: t.paper },
      text: { primary: t.ink, secondary: t.muted },
      divider: t.line,
      custom: {
        panel: t.panel, headerBg: t.headerBg, scrollThumb: t.scrollThumb, scrollThumbHover: t.scrollThumbHover,
        skeleton: t.skeleton, skeletonShine: t.skeletonShine, eventTint: t.eventTint, accent: t.accent,
      },
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 },
      h2: { fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1 },
      h3: { fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 },
      h4: { fontWeight: 600, letterSpacing: "-0.015em" },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 400, color: t.muted },
      button: { fontWeight: 500, textTransform: "none", letterSpacing: 0 },
      body1: { fontSize: "1.0625rem", lineHeight: 1.7, color: t.ink },
      body2: { fontSize: "0.95rem", lineHeight: 1.65, color: t.muted },
      overline: { letterSpacing: "0.14em", fontWeight: 600, fontSize: "0.72rem" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: { body: { backgroundColor: t.bg } } },
      MuiContainer: { defaultProps: { maxWidth: "lg" } },
      MuiButton: {
        disableElevation: true,
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 22, paddingBlock: 10, fontSize: "0.95rem", transition: "background-color .3s ease, color .3s ease, border-color .3s ease, opacity .3s ease" },
          containedPrimary: { backgroundColor: t.ink, color: t.contrastText, "&:hover": { backgroundColor: t.ink, opacity: 0.88 } },
          outlined: { borderColor: t.line, color: t.ink, backgroundColor: t.paper, "&:hover": { borderColor: t.ink, backgroundColor: t.paper } },
          text: { color: t.ink, "&:hover": { backgroundColor: "transparent", opacity: 0.6 } },
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 6, fontWeight: 500, fontSize: "0.8rem", color: t.muted, background: t.paper, border: `1px solid ${t.line}` } } },
      MuiLink: { defaultProps: { underline: "none" }, styleOverrides: { root: { transition: "opacity .25s ease" } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiMenu: { styleOverrides: { paper: { backgroundColor: t.paper, border: `1px solid ${t.line}` } } },
      MuiTooltip: { styleOverrides: { tooltip: { background: t.ink, color: t.contrastText, fontSize: 12, fontWeight: 500 } } },
    },
  });
  return responsiveFontSizes(theme);
}

export function getTheme(key = "carbon") {
  return build(fill(map[key] || map.carbon));
}

export function themeMode(key) {
  return (map[key] || map.carbon).mode;
}

export default getTheme;
