import { useState } from "react";
import { Box } from "@mui/material";

// Use the registrable (apex) domain — subdomains like get./try./www. often
// have no favicon of their own.
function apex(host) {
  const p = host.split(".");
  return p.length > 2 ? p.slice(-2).join(".") : host;
}

/**
 * A site favicon that never renders blank: tries DuckDuckGo, then Google,
 * then falls back to a monogram letter.
 */
export default function Favicon({ url, label = "", size = 20 }) {
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch (e) {
    host = "";
  }
  const sources = host
    ? [`https://icons.duckduckgo.com/ip3/${apex(host)}.ico`, `https://www.google.com/s2/favicons?domain=${apex(host)}&sz=64`]
    : [];
  const [i, setI] = useState(0);
  const done = i >= sources.length;

  return (
    <Box sx={{ width: size, height: size, borderRadius: "5px", flexShrink: 0, bgcolor: "#fff", border: "1px solid", borderColor: "divider", display: "grid", placeItems: "center", overflow: "hidden" }}>
      {!done ? (
        <Box
          component="img"
          src={sources[i]}
          alt=""
          width={size - 6}
          height={size - 6}
          loading="lazy"
          onError={() => setI((n) => n + 1)}
          sx={{ display: "block" }}
        />
      ) : (
        <Box sx={{ color: "#1a1a17", fontWeight: 700, fontSize: size * 0.5, lineHeight: 1 }}>{(label[0] || "•").toUpperCase()}</Box>
      )}
    </Box>
  );
}
