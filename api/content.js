// Vercel Serverless Function — reads/writes the editable site content as one
// JSON document in Neon Postgres. Credentials come from Vercel env vars
// (DATABASE_URL); they are NEVER in the client bundle or the repo.
const { neon } = require("@neondatabase/serverless");
const config = require("./_config");

const CONNECTION = config.DATABASE_URL;
const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

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
  if (!CONNECTION) {
    return res.status(500).json({ error: "Database is not configured (set DATABASE_URL in Vercel)." });
  }
  const sql = neon(CONNECTION);

  try {
    await sql`CREATE TABLE IF NOT EXISTS site_content (
      id int PRIMARY KEY DEFAULT 1,
      data jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT site_content_single CHECK (id = 1)
    )`;

    if (req.method === "GET") {
      const rows = await sql`SELECT data FROM site_content WHERE id = 1`;
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json((rows[0] && rows[0].data) || {});
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      if (!ADMIN_PASSWORD || !body || body.password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const data = body.data && typeof body.data === "object" ? body.data : {};
      await sql`
        INSERT INTO site_content (id, data, updated_at)
        VALUES (1, ${JSON.stringify(data)}::jsonb, now())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
      `;
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
};
