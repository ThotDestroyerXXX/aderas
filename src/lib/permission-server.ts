import "server-only";

import db from "@/db";
import { projectMember as projectMemberTable } from "@/db/entities/project";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "./auth";
import { roleMap, type RoleName } from "./permission";

type RoleAuthorizer = {
  authorize: (
    request: Record<string, string[]>,
    connector?: "OR" | "AND",
  ) => { success: boolean };
};

async function hasOrgPermission(resource: string, action: string) {
  try {
    const result = await auth.api.hasPermission({
      headers: await headers(),
      body: {
        permissions: {
          [resource]: [action],
        } as Record<string, string[]>,
      },
    });

    return result.success;
  } catch {
    return false;
  }
}

function hasRolePermission(
  roleName: RoleName,
  resource: string,
  action: string,
) {
  const role = roleMap[roleName] as unknown as RoleAuthorizer;
  const result = role.authorize({
    [resource]: [action],
  });

  return result.success;
}

function isOrgElevatedRole(role: string | undefined) {
  if (!role) return false;

  const roles = new Set(
    role
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );

  return roles.has("owner") || roles.has("admin");
}

export async function checkOrgPermission(resource: string, action: string) {
  return hasOrgPermission(resource, action);
}

export async function checkProjectPermission(
  projectId: string,
  resource: string,
  action: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return false;

  const userId = session.user.id;
  const activeMemberRole = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });
  const orgRole = activeMemberRole?.role;

  if (isOrgElevatedRole(orgRole)) {
    return hasOrgPermission(resource, action);
  }

  const [projectMemberRecord] = await db
    .select({ role: projectMemberTable.role })
    .from(projectMemberTable)
    .where(
      and(
        eq(projectMemberTable.projectId, projectId),
        eq(projectMemberTable.userId, userId),
      ),
    )
    .limit(1);

  if (!projectMemberRecord) return false;

  const projectRole = mapProjectRole(projectMemberRecord.role);

  return hasRolePermission(projectRole, resource, action);
}

function mapProjectRole(role: string): RoleName {
  switch (role.toLowerCase()) {
    case "admin":
      return "projectAdmin";
    case "member":
      return "projectMember";
    case "viewer":
      return "projectViewer";
    default:
      return "projectViewer";
  }
}
