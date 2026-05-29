import { Box, Typography } from "@mui/material";

/**
 * A card column in the "desk" grid: rounded, bordered, elevated surface.
 * On desktop it fills the grid row height and scrolls internally (sticky
 * header + thin scrollbar); on mobile it's a normal stacked card.
 */
export default function Panel({ label, action, children, bodySx }) {
  return (
    <Box
      component="section"
      sx={{
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        height: { lg: "100%" },
      }}
    >
      <Box
        sx={{
          position: { lg: "sticky" },
          top: 0,
          zIndex: 2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: { xs: 2.5, md: 2.75 },
          py: 1.6,
          bgcolor: "custom.headerBg",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          {label}
        </Typography>
        {action}
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: { lg: "auto" },
          px: { xs: 2.5, md: 2.75 },
          py: { xs: 3, md: 3 },
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": (theme) => ({ background: theme.palette.custom.scrollThumb, borderRadius: 999 }),
          "&::-webkit-scrollbar-thumb:hover": (theme) => ({ background: theme.palette.custom.scrollThumbHover }),
          ...bodySx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
