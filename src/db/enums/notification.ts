import { pgEnum } from "drizzle-orm/pg-core";


export const notificationType = pgEnum("notification_type", [
    'task_assigned',
    'task_unassigned',
    'task_completed',
    'task_due_soon',
    'task_overdue',
    'task_commented',
    'task_mention',
    'comment_reply',
    'comment_reaction',
    'organization_invitation',
    'organization_member_joined',
    'organization_member_removed',
    'organization_role_changed',
    'project_member_added',
    'project_archived',
]);