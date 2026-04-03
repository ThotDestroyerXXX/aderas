import { pgEnum } from "drizzle-orm/pg-core";

export const taskType = pgEnum("task_type", [
  "task",
  "bug",
  "feature",
  "improvement",
  "epic",
  "story",
  "subtask",
  "test",
  "research",
  "documentation",
  "other",
]);

export const taskPriority = pgEnum("task_priority", [
  "urgent",
  "high",
  "medium",
  "low",
  "none",
]);
