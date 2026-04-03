import { relations } from "drizzle-orm";
import { users } from "../entities/user";
import { sessions } from "../entities/session";
import { accounts } from "../entities/account";
import { invitations, members, organizations } from "../entities/organization";

export const usersRelations = relations(users, ({ many }) => ({
  sessionss: many(sessions),
  accountsss: many(accounts),
  memberss: many(members),
  invitationss: many(invitations),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountssRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  memberss: many(members),
  invitationss: many(invitations),
}));

export const membersRelations = relations(members, ({ one }) => ({
  organizations: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
  users: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  organizations: one(organizations, {
    fields: [invitations.organizationId],
    references: [organizations.id],
  }),
  users: one(users, {
    fields: [invitations.inviterId],
    references: [users.id],
  }),
}));
