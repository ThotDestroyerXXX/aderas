import {
  pgTable,
  text,
  date,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { baseEntity } from "./baseEntity";
import { project, taskStatus } from "./project";
import { taskPriority, taskType } from "../enums/task";
import { index } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { organizations } from "./organization";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { foreignKey } from "drizzle-orm/pg-core";

export const task = pgTable(
  "tasks",
  {
    ...baseEntity,
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    parentTaskId: text("parent_task_id"),
    taskStatusId: text("task_status_id")
      .notNull()
      .references(() => taskStatus.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    taskType: taskType("task_type").default("task").notNull(),
    priority: taskPriority("priority").default("none").notNull(),
    assigneeId: text("assignee_id").references(() => project.id, {
      onDelete: "set null",
    }),
    position: integer("position").notNull(),
    startDate: date("start_date"),
    dueDate: date("due_date"),
    completedAt: date("completed_at"),
    estimatedHours: integer("estimated_hours"),
    actualHours: integer("actual_hours"),
    isArchived: boolean("is_archived").default(false).notNull(),
    archivedAt: timestamp("archived_at"),
  },
  (table) => [
    index("idx_tasks_project_id").on(table.projectId),
    index("idx_tasks_task_status_id").on(table.taskStatusId),
    index("idx_tasks_parent_task_id").on(table.parentTaskId),
    index("idx_tasks_priority").on(table.priority),
    index("idx_tasks_due_date").on(table.dueDate),
    index("idx_tasks_is_archived").on(table.isArchived),
    index("idx_tasks_project_status").on(table.projectId, table.taskStatusId),
    index("idx_tasks_created_by").on(table.createdBy),
    index("idx_tasks_assignee_id").on(table.assigneeId),
    foreignKey({
      columns: [table.parentTaskId],
      foreignColumns: [table.id],
      name: "fk_tasks_parent_task_id",
    }),
  ],
);

export const label = pgTable(
  "labels",
  {
    ...baseEntity,
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),
    name: varchar("name", { length: 50 }).notNull(),
    color: varchar("color", { length: 7 }).notNull(),
  },
  (table) => [
    uniqueIndex("idx_labels_organization_name").on(
      table.organizationId,
      table.name,
    ),
    index("idx_labels_organization_id").on(table.organizationId),
  ],
);

export const taskLabel = pgTable(
  "task_labels",
  {
    ...baseEntity,
    taskId: text("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    labelId: text("label_id")
      .notNull()
      .references(() => label.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_task_labels_task_label").on(table.taskId, table.labelId),
  ],
);
