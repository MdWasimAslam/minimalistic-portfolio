import { Box, Typography } from "@mui/material";

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
export const TECH_ICONS = {
  React: `${DEV}/react/react-original.svg`,
  "React.js": `${DEV}/react/react-original.svg`,
  "React Native": `${DEV}/react/react-original.svg`,
  "Next.js": `${DEV}/nextjs/nextjs-original.svg`,
  TypeScript: `${DEV}/typescript/typescript-original.svg`,
  JavaScript: `${DEV}/javascript/javascript-original.svg`,
  Redux: `${DEV}/redux/redux-original.svg`,
  Tailwind: `${DEV}/tailwindcss/tailwindcss-original.svg`,
  "Material UI": `${DEV}/materialui/materialui-original.svg`,
  "Node.js": `${DEV}/nodejs/nodejs-original.svg`,
  Express: `${DEV}/express/express-original.svg`,
  MongoDB: `${DEV}/mongodb/mongodb-original.svg`,
  PostgreSQL: `${DEV}/postgresql/postgresql-original.svg`,
  Redis: `${DEV}/redis/redis-original.svg`,
  Git: `${DEV}/git/git-original.svg`,
  Docker: `${DEV}/docker/docker-original.svg`,
  Figma: `${DEV}/figma/figma-original.svg`,
  "D3.js": `${DEV}/d3js/d3js-original.svg`,
  Expo: `${DEV}/react/react-original.svg`,
};

export default function TechChip({ name, dense = false }) {
  const icon = TECH_ICONS[name];
  const tile = dense ? 15 : 18;
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, pl: icon ? 0.45 : 0.95, pr: 0.95, py: dense ? 0.3 : 0.4, borderRadius: 1.25, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
      {icon && (
        <Box sx={{ width: tile, height: tile, borderRadius: "4px", bgcolor: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <Box component="img" src={icon} alt="" width={tile - 5} height={tile - 5} loading="lazy" onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
        </Box>
      )}
      <Typography sx={{ fontSize: dense ? "0.68rem" : "0.74rem", color: "text.primary", fontWeight: 500 }}>{name}</Typography>
    </Box>
  );
}
