import { pgEnum } from "drizzle-orm/pg-core";

export const mentionContext = pgEnum("mention_context", ["comment", "task_description"]);