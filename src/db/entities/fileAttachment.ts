import { boolean, check, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { comment } from "./comment";
import { baseEntity } from "./baseEntity";
import { task } from "./task";
import { organization } from "./organization";
import { user } from "./user";
import { sql } from "drizzle-orm";

export const fileAttachment = pgTable("file_attachments", {
    ...baseEntity,
    commentId: text("comment_id").references(() => comment.id, { onDelete: "cascade" }),
    taskId: text("task_id").references(() => task.id, { onDelete: "cascade" }),
    organizationId: text("organization_id").references(() => organization.id, { onDelete: "cascade" }),
    originalFileName: text("original_file_name").notNull(),
    storageKey: text("storage_key").notNull(),
    storageBucket: text("storage_bucket").notNull(),
    contentType: text("content_type").notNull(),
    fileSizeBytes: integer("file_size_bytes").notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
    deletedAt: timestamp("deleted_at"),
    deletedBy: text("deleted_by").references(() => user.id, { onDelete: "cascade" }),
}, (table) => [
    check("chk_attachment_target", sql`(${table.taskId} IS NOT NULL AND ${table.commentId} IS NULL) OR
        (${table.commentId} IS NOT NULL AND ${table.taskId} IS NULL) OR
        (${table.commentId} IS NOT NULL AND ${table.taskId} IS NOT NULL)`)
]);