import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { baseEntity } from "./baseEntity";

export const organization = pgTable(
  "organizations",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logo: text("logo"),
    createdAt: timestamp("created_at").notNull(),
    metadata: text("metadata"),
  },
  (table) => [uniqueIndex("organizations_slug_uidx").on(table.slug)],
);

export const member = pgTable(
  "members",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: text("role").default("member").notNull(),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => [
    index("members_organizationId_idx").on(table.organizationId),
    index("members_userId_idx").on(table.userId),
  ],
);

export const invitation = pgTable(
  "invitations",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role"),
    status: text("status").default("pending").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("invitations_organizationId_idx").on(table.organizationId),
    index("invitations_email_idx").on(table.email),
  ],
);

export const team = pgTable(
  "teams",
  {
    ...baseEntity,
    organizationId: text("organization_id")
      .references(() => organization.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    avatarUrl: text("avatar_url"),
    color: varchar("color", { length: 7 }),
  },
  (table) => [
    index("idx_teams_organization_id").on(table.organizationId),
    index("idx_teams_organization_name").on(table.name, table.organizationId),
  ],
);

export const teamMember = pgTable(
  "team_members",
  {
    ...baseEntity,
    teamId: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    addedBy: text("added_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_team_members_unique").on(table.teamId, table.userId),
    index("idx_team_members_team_id").on(table.teamId),
    index("idx_team_members_user_id").on(table.userId),
  ],
);
