// Verifies the admin password (server-side) so the admin UI can gate access
// before showing the editor.
const ADMIN_PASSWORD = require("./_config").ADMIN_PASSWORD;

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: "ADMIN_PASSWORD is not configured." });
  }
  const body = await readBody(req);
  const ok = !!body && body.password === ADMIN_PASSWORD;
  return res.status(ok ? 200 : 401).json({ ok });
};
