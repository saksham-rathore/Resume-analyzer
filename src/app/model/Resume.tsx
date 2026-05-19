import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { users } from "./User";

export const resume = pgTable("resume", {
    id: serial("id").primaryKey(),

    userId: integer("user_Id")
       .references(() => users.id)
       .notNull(),

    title: text("title"),
    content: text("content"),

    fileUrl: text("file_Url"),

    createdAt: timestamp("created_at").defaultNow(),
});