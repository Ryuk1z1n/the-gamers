import { pgTable, serial, varchar, date, timestamp } from "drizzle-orm/pg-core";

//tabela de usuarios
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  birthDate: date("birth_date").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
  phone: varchar("phone", { length: 20 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
