import { pgEnum } from "drizzle-orm/pg-core";

export const projectVisibility = pgEnum("project_visibility", [
  "public",
  "private",
  "secret",
]);

export const projectStatus = pgEnum("project_status", [
  "active",
  "archived",
  "deleted",
  "draft",
]);

export const defaultView = pgEnum("default_view", [
  "board",
  "list",
  "calendar",
  "timeline",
]);

export const projectRole = pgEnum("project_role", [
  "admin",
  "member",
  "viewer",
]);

export const statusCategory = pgEnum("status_category", [
  "todo",
  "in_progress",
  "done",
  "cancelled",
]);
