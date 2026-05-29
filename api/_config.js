// Central constants for the serverless API.
// NOTE: credentials are hardcoded here for testing, as requested (the user
// stated these are throwaway/fake). For a real deployment, move these to
// Vercel Environment Variables and read them from process.env instead.
module.exports = {
  DATABASE_URL:
    "postgresql://neondb_owner:npg_oXpMBiI84qyQ@ep-old-frost-aqofei8t-pooler.c-8.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
  DATABASE_URL_UNPOOLED:
    "postgresql://neondb_owner:npg_oXpMBiI84qyQ@ep-old-frost-aqofei8t.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ADMIN_PASSWORD: "admin",
};
