import { timestamp, text } from "drizzle-orm/pg-core";

export const baseEntity = {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
};
