import { users } from "./User";
import {resume} from "./Resume"
import { integer, text, timestamp, pgTable, serial } from "drizzle-orm/pg-core";

export const resumeAnalysis = pgTable("resume_analysis", {
  id: serial("id").primaryKey(),

  resumeId: integer("resume_id")
    .references(() => resume.id)
    .notNull(),

  score: integer("score"),

  feedback: text("feedback"), 

  strengths: text("strengths"), 
  weaknesses: text("weaknesses"),

  suggestions: text("suggestions"),

  jobRole: text("job_role"), 

  createdAt: timestamp("created_at").defaultNow(),
});