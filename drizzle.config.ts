import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/schema.tsx",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});