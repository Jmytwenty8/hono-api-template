import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

export const tasks = sqliteTable("tasks", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectTasksScheme = createSelectSchema(tasks);
export const insertTaskScheme = createSelectSchema(tasks, {
  name: (schema) => schema.min(1).max(255),
})
  .required({
    completed: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updateAt: true,
  });
export const patchTaskSchema = insertTaskScheme.partial();
