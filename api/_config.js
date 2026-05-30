// Central constants for the serverless API.
// All values are read from environment variables (Vercel Environment Variables
// in production, a local .env.local in development). NEVER hardcode credentials
// here — anything committed to the repo is considered leaked.
//
// The Neon–Vercel integration provisions the DB vars with a `portfolio_` prefix;
// we fall back to the unprefixed names so a plain `.env.local` works locally too.
const DATABASE_URL =
  process.env.portfolio_DATABASE_URL || process.env.DATABASE_URL || "";

const DATABASE_URL_UNPOOLED =
  process.env.portfolio_DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL_UNPOOLED ||
  "";

// Not provided by the Neon integration — add ADMIN_PASSWORD in Vercel yourself.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

module.exports = {
  DATABASE_URL,
  DATABASE_URL_UNPOOLED,
  ADMIN_PASSWORD,
};
