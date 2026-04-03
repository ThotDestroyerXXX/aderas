import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { baseEntity } from "./baseEntity";
import { users } from "./user";
import { notificationType } from "../enums/notification";

export const notification = pgTable(
  "notifications",
  {
    ...baseEntity,
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: notificationType("type").default("task_assigned"),
    title: text("title").notNull(),
    body: text("body").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    readAt: timestamp("read_at"),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    actorId: text("actor_id").references(() => users.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    index("idx_notifications_user_id").on(table.userId),
    index("idx_notifications_is_read").on(table.isRead),
    index("idx_notifications_created_at").on(table.createdAt),
    index("idx_notifications_entity").on(table.entityType, table.entityId),
  ],
);
