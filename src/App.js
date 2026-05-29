import { useEffect, useMemo, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme, themeMode, THEMES } from "./theme/theme";
import { ContentProvider } from "./content/ContentContext";
import TopBar from "./layouts/TopBar";
import AboutPanel from "./sections/AboutPanel";
import CareerPanel from "./sections/CareerPanel";
import WorkPanel from "./sections/WorkPanel";
import SidePanel from "./sections/SidePanel";
import CatEasterEgg from "./components/CatEasterEgg";
import Admin from "./admin/Admin";

const TOPBAR = 56;

function App() {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      return localStorage.getItem("themeKey") || "carbon";
    } catch (e) {
      return "carbon";
    }
  });

  const theme = useMemo(() => getTheme(themeKey), [themeKey]);

  useEffect(() => {
    document.documentElement.dataset.mode = themeMode(themeKey);
    try {
      localStorage.setItem("themeKey", themeKey);
      localStorage.setItem("mode", themeMode(themeKey));
    } catch (e) {}
  }, [themeKey]);

  const isAdmin = typeof window !== "undefined" && window.location.pathname.replace(/\/+$/, "") === "/admin";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        component="a"
        href="#desk"
        sx={{ position: "absolute", left: -9999, top: 8, zIndex: 3000, p: 1.5, borderRadius: 1, background: (t) => t.palette.primary.main, color: (t) => t.palette.primary.contrastText, fontWeight: 600, "&:focus": { left: 8 } }}
      >
        Skip to content
      </Box>

      {isAdmin ? (
        <Admin />
      ) : (
        <ContentProvider>
          <TopBar themeKey={themeKey} onPickTheme={setThemeKey} themes={THEMES} />
          <Box
            id="desk"
            component="main"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(4, 1fr)" },
              gap: { xs: 1.5, md: 2 },
              p: { xs: 1.5, md: 2 },
              height: { lg: `calc(100dvh - ${TOPBAR}px)` },
              overflow: { lg: "hidden" },
            }}
          >
            <AboutPanel />
            <CareerPanel />
            <WorkPanel />
            <SidePanel />
          </Box>
          <CatEasterEgg />
        </ContentProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
