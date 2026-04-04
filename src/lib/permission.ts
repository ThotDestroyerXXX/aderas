import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  // Organization-level resources
  organization: [
    "update", // update org name, avatar, settings
    "delete", // delete the entire organization
    "view", // view org details
  ],

  member: [
    "invite", // invite new members to the org
    "remove", // remove a member from the org
    "update-role", // change a member's role
    "view", // view member list
    "deactivate", // deactivate a member (soft remove)
  ],

  team: [
    "create", // create a new team inside the org
    "update", // update team name, description, avatar
    "delete", // delete a team
    "view", // view teams and their members
    "manage-members", // add/remove members from a team
  ],

  // Project-level resources
  project: [
    "create", // create a new project in the org
    "update", // update project name, description, settings
    "delete", // delete a project
    "view", // view project and its contents
    "archive", // archive/unarchive a project
    "share", // add members or teams to a project
    "manage-members", // change project member roles
    "manage-statuses", // create/update/delete task status columns
    "manage-fields", // create/update/delete custom fields
  ],

  // Task-level resources
  task: [
    "create", // create a task in a project
    "update", // update task title, description, fields
    "delete", // delete a task
    "view", // view task details
    "assign", // assign/unassign members to a task
    "change-status", // move task across status columns
    "set-priority", // change task priority
    "set-dates", // set start date and due date
    "manage-subtasks", // create/update/delete subtasks
    "manage-deps", // add/remove task dependencies
    "manage-labels", // add/remove labels on tasks
  ],

  // Comment-level resources
  comment: [
    "create", // post a comment on a task
    "update", // edit own comment
    "delete", // delete own comment
    "delete-any", // delete anyone's comment (moderation)
    "view", // view comments
    "react", // add emoji reactions to comments
  ],

  // File attachment resources
  attachment: [
    "upload", // upload a file to a task or comment
    "delete", // delete own attachment
    "delete-any", // delete anyone's attachment
    "view", // view/download attachments
  ],

  // Label resources
  label: [
    "create", // create workspace-level labels
    "update", // update label name and color
    "delete", // delete a label
    "view", // view all labels
    "assign", // assign labels to tasks
  ],

  // API keys
  apiKey: [
    "create", // create an API key for the org
    "revoke", // revoke an API key
    "view", // view API keys (masked)
  ],

  // Notifications
  notification: [
    "view", // view own notifications
    "manage", // mark as read, clear notifications
    "manage-preferences", // update notification preferences
  ],
} as const;

export const ac = createAccessControl(statement);

// ─────────────────────────────────────────────────────────────
// ORGANIZATION ROLES
// ─────────────────────────────────────────────────────────────

/**
 * GUEST
 * Read-only access to public projects and tasks they are
 * explicitly added to. Cannot create anything.
 */
export const guest = ac.newRole({
  organization: ["view"],
  member: ["view"],
  team: ["view"],
  project: ["view"],
  task: ["view"],
  comment: ["view", "react"],
  attachment: ["view"],
  label: ["view"],
  notification: ["view", "manage", "manage-preferences"],
});

/**
 * MEMBER
 * Standard team member. Can do most day-to-day work
 * but cannot manage the organization or delete others' work.
 */
export const member = ac.newRole({
  organization: ["view"],
  member: ["view"],
  team: ["view"],
  project: ["view", "create"],
  task: [
    "create",
    "update",
    "delete",
    "view",
    "assign",
    "change-status",
    "set-priority",
    "set-dates",
    "manage-subtasks",
    "manage-deps",
    "manage-labels",
  ],
  comment: ["create", "update", "delete", "view", "react"],
  attachment: ["upload", "delete", "view"],
  label: ["view", "assign", "create"],
  notification: ["view", "manage", "manage-preferences"],
});

/**
 * ADMIN
 * Manages the organization. Can invite members, manage teams,
 * manage projects, handle integrations, and view audit logs.
 * Cannot delete the organization itself.
 */
export const admin = ac.newRole({
  organization: ["view", "update"],
  member: ["invite", "remove", "update-role", "view", "deactivate"],
  team: ["create", "update", "delete", "view", "manage-members"],
  project: [
    "create",
    "update",
    "delete",
    "view",
    "archive",
    "share",
    "manage-members",
    "manage-statuses",
    "manage-fields",
  ],
  task: [
    "create",
    "update",
    "delete",
    "view",
    "assign",
    "change-status",
    "set-priority",
    "set-dates",
    "manage-subtasks",
    "manage-deps",
    "manage-labels",
  ],
  comment: ["create", "update", "delete", "delete-any", "view", "react"],
  attachment: ["upload", "delete", "delete-any", "view"],
  label: ["create", "update", "delete", "view", "assign"],
  apiKey: ["create", "revoke", "view"],
  notification: ["view", "manage", "manage-preferences"],
});

/**
 * OWNER
 * Full access to everything including destructive actions
 * like deleting the organization.
 */
export const owner = ac.newRole({
  organization: ["update", "delete", "view"],
  member: ["invite", "remove", "update-role", "view", "deactivate"],
  team: ["create", "update", "delete", "view", "manage-members"],
  project: [
    "create",
    "update",
    "delete",
    "view",
    "archive",
    "share",
    "manage-members",
    "manage-statuses",
    "manage-fields",
  ],
  task: [
    "create",
    "update",
    "delete",
    "view",
    "assign",
    "change-status",
    "set-priority",
    "set-dates",
    "manage-subtasks",
    "manage-deps",
    "manage-labels",
  ],
  comment: ["create", "update", "delete", "delete-any", "view", "react"],
  attachment: ["upload", "delete", "delete-any", "view"],
  label: ["create", "update", "delete", "view", "assign"],
  apiKey: ["create", "revoke", "view"],
  notification: ["view", "manage", "manage-preferences"],
});

// ─────────────────────────────────────────────────────────────
// PROJECT ROLES
// These override organization roles at the project level.
// A MEMBER at org level can be ADMIN inside a specific project.
// ─────────────────────────────────────────────────────────────

/**
 * PROJECT VIEWER
 * Read-only access to a specific project.
 * Useful for stakeholders or clients.
 */
export const projectViewer = ac.newRole({
  project: ["view"],
  task: ["view"],
  comment: ["view", "react"],
  attachment: ["view"],
  label: ["view"],
});

/**
 * PROJECT MEMBER
 * Full day-to-day contributor on a specific project.
 * Can do all task work but cannot manage the project itself.
 */
export const projectMember = ac.newRole({
  project: ["view"],
  task: [
    "create",
    "update",
    "delete",
    "view",
    "assign",
    "change-status",
    "set-priority",
    "set-dates",
    "manage-subtasks",
    "manage-deps",
    "manage-labels",
  ],
  comment: ["create", "update", "delete", "view", "react"],
  attachment: ["upload", "delete", "view"],
  label: ["view", "assign"],
});

/**
 * PROJECT ADMIN
 * Full control over a specific project including settings,
 * member management, custom fields, and status columns.
 * Does not grant any organization-level permissions.
 */
export const projectAdmin = ac.newRole({
  project: [
    "update",
    "delete",
    "view",
    "archive",
    "share",
    "manage-members",
    "manage-statuses",
    "manage-fields",
  ],
  task: [
    "create",
    "update",
    "delete",
    "view",
    "assign",
    "change-status",
    "set-priority",
    "set-dates",
    "manage-subtasks",
    "manage-deps",
    "manage-labels",
  ],
  comment: ["create", "update", "delete", "delete-any", "view", "react"],
  attachment: ["upload", "delete", "delete-any", "view"],
  label: ["create", "update", "delete", "view", "assign"],
});

export const roleMap = {
  guest,
  member,
  admin,
  owner,
  projectViewer,
  projectMember,
  projectAdmin,
} as const;

export type RoleName = keyof typeof roleMap;
