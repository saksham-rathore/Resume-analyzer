import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  serial,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified"),
  password: text("password"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    access_token: text("access_token"),
  },
  (t) => ({
    pk: primaryKey(t.provider, t.providerAccountId),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull(),
  expires: timestamp("expires").notNull(),
});

export const resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title"),
  content: text("content"),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analysis = pgTable("analysis", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id")
    .references(() => resume.id, { onDelete: "cascade" })
    .notNull(),
  score: integer("score"),
  feedback: text("feedback"),
  strengths: text("strengths"),
  weaknesses: text("weaknesses"),
  suggestions: text("suggestions"),
  jobRole: text("job_role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});