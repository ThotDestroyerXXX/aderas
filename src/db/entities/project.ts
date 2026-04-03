import {
  text,
  pgTable,
  varchar,
  index,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { baseEntity } from "./baseEntity";
import {
  defaultView,
  projectRole,
  projectStatus,
  projectVisibility,
  statusCategory,
} from "../enums/project";
import { organization, team } from "./organization";
import { user } from "./user";
import { isNotNull } from "drizzle-orm";

export const project = pgTable(
  "projects",
  {
    ...baseEntity,
    organizationId: text("organization_id")
      .references(() => organization.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    icon: varchar("icon", { length: 10 }),
    color: varchar("color", { length: 7 }),
    visibility: projectVisibility("visibility").default("private").notNull(),
    status: projectStatus("status").default("active").notNull(),
    defaultView: defaultView("default_view").default("board").notNull(),
    archivedBy: text("archived_by"),
    archivedAt: timestamp("archived_at"),
  },
  (table) => [
    index("idx_projects_organization_id").on(table.organizationId),
    index("idx_projects_status").on(table.status),
    index("idx_projects_visibility").on(table.visibility),
    index("idx_projects_organization_id_status").on(
      table.organizationId,
      table.status,
    ),
  ],
);

export const projectMember = pgTable(
  "project_members",
  {
    ...baseEntity,
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    teamId: text("team_id").references(() => team.id, { onDelete: "cascade" }),
    role: projectRole("role").default("member").notNull(),
  },
  (table) => [
    uniqueIndex("idx_project_members_user")
      .on(table.projectId, table.userId)
      .where(isNotNull(table.userId)),
    uniqueIndex("idx_project_members_team")
      .on(table.projectId, table.teamId)
      .where(isNotNull(table.teamId)),
    index("idx_project_members_project_id").on(table.projectId),
    index("idx_project_members_user_id").on(table.userId),
    index("idx_project_members_team_id").on(table.teamId),
  ],
);

export const taskStatus = pgTable(
  "task_statuses",
  {
    ...baseEntity,
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 50 }).notNull(),
    category: statusCategory("category")
      .default(statusCategory.enumValues[0])
      .notNull(),
    color: varchar("color", { length: 7 }),
    position: integer("position").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
  },
  (table) => [
    uniqueIndex("idx_task_statuses_project_name").on(
      table.projectId,
      table.name,
    ),
    index("idx_task_statuses_project_id").on(table.projectId),
    index("idx_task_statuses_position").on(table.projectId, table.position),
  ],
);
