import {
  boolean,
  foreignKey,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { task } from "./task";
import { users } from "./user";
import { baseEntity } from "./baseEntity";
import { mentionContext } from "../enums/comment";

export const comment = pgTable(
  "comments",
  {
    ...baseEntity,
    taskId: text("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    parentCommentId: text("parent_comment_id"),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    isEdited: boolean("is_edited").default(false).notNull(),
    editedAt: timestamp("edited_at"),
    isDeleted: boolean("is_deleted").default(false).notNull(),
    deletedAt: timestamp("deleted_at"),
    deletedBy: text("deleted_by").references(() => users.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    foreignKey({
      columns: [table.parentCommentId],
      foreignColumns: [table.id],
      name: "fk_comments_parent_comment_id",
    }),
    index("idx_comments_task_id").on(table.taskId),
    index("idx_comments_author_id").on(table.authorId),
    index("idx_comments_is_deleted").on(table.isDeleted),
    index("idx_comments_created_at").on(table.createdAt),
    index("idx_comments_parent_id").on(table.parentCommentId),
  ],
);

export const commentReaction = pgTable(
  "comment_reactions",
  {
    ...baseEntity,
    commentId: text("comment_id")
      .notNull()
      .references(() => comment.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    emoji: text("emoji").notNull(),
  },
  (table) => [
    uniqueIndex("idx_comment_reactions_unique").on(
      table.commentId,
      table.userId,
      table.emoji,
    ),
    index("idx_comment_reactions_comment_id").on(table.commentId),
    index("idx_comment_reactions_user_id").on(table.userId),
  ],
);

export const mention = pgTable(
  "mentions",
  {
    ...baseEntity,
    commentId: text("comment_id")
      .notNull()
      .references(() => comment.id, { onDelete: "cascade" }),
    mentionedUserId: text("mentioned_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mentionedByUserId: text("mentioned_by_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    context: mentionContext("context").default("comment").notNull(),
    taskId: text("task_id").references(() => task.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("idx_mentions_task_id").on(table.taskId),
    index("idx_mentions_comment_id").on(table.commentId),
    index("idx_mentions_mentioned_user_id").on(table.mentionedUserId),
    index("idx_mentions_created_at").on(table.createdAt),
  ],
);
