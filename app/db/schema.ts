import {
	integer,
	pgTable,
	varchar,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	projectName: varchar("project-name", { length: 255 }).notNull(),
	creatorName: varchar("creator-name", { length: 255 }).notNull(),
	projectUrl: varchar("project-url", { length: 255 }).notNull(),
	screenshotUrl: text("screenshot-url").notNull(),
	dateAdded: timestamp("date-added").defaultNow().notNull(),
});
