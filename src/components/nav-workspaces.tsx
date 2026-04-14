"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Organization } from "@/lib/auth";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

export function NavWorkspaces({
  workspaces,
}: Readonly<{
  workspaces: Organization[];
}>) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces.map((workspace) => (
            <Collapsible key={workspace.name}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='#'>
                    <span>{workspace.logo}</span>
                    <span>{workspace.name}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction showOnHover>
                  <Ellipsis />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
