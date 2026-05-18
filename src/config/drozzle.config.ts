import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/Schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});