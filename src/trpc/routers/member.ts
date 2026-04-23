import { createTRPCRouter, protectedProcedure } from "../init";
import { getCurrentMemberRoleSchema, OrganizationRole } from "@/lib/schema";
import db from "@/db";
import { members, organizations } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const memberRouter = createTRPCRouter({
  getCurrentMemberRole: protectedProcedure
    .input(getCurrentMemberRoleSchema)
    .query(async ({ ctx, input }) => {
      const result = await db
        .select({
          role: members.role,
        })
        .from(members)
        .innerJoin(organizations, eq(members.organizationId, organizations.id))
        .where(
          and(
            eq(members.userId, ctx.userId),
            eq(organizations.slug, input.organizationSlug),
          ),
        );

      if (result.length === 0) {
        throw new Error("Member role not found");
      }
      return result[0].role as OrganizationRole;
    }),
});
