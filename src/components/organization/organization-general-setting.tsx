"use client";
import { formatDate, formatMetadata } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import { trpc } from "@/trpc/client";
import { Organization } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export function OrganizationGeneralSetting({
  slug,
  organization,
}: Readonly<{
  slug: string;
  organization: Organization;
}>) {
  const [data] = trpc.member.getCurrentMemberRole.useSuspenseQuery({
    organizationSlug: slug,
  });
  const canEditOrg = authClient.organization.checkRolePermission({
    permissions: {
      organization: ["update"],
    },
    role: data,
  });
  //       const canDeleteOrg = authClient.organization.checkRolePermission({
  //   permissions: {
  //     organization: ["delete"],
  //   },
  //   role: data,
  // });
  return (
    <TabsContent value='general'>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>
            Basic workspace identity information from organizations table.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-3 sm:grid-cols-2'>
          <div>
            <p className='text-xs text-muted-foreground'>Name</p>
            <p className='font-medium'>{organization.name}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Slug</p>
            <p className='font-medium'>{organization.slug}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Logo URL</p>
            <p className='font-medium break-all'>{organization.logo ?? "-"}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Created</p>
            <p className='font-medium'>{formatDate(organization.createdAt)}</p>
          </div>
          <div className='sm:col-span-2'>
            <p className='text-xs text-muted-foreground'>Metadata</p>
            <pre className='max-h-40 overflow-auto rounded-md border bg-muted/40 p-3 text-xs'>
              {formatMetadata(organization.metadata)}
            </pre>
          </div>
          {canEditOrg && (
            <div className='sm:col-span-2'>
              <p className='text-xs text-muted-foreground'>
                Edit actions are reserved for upcoming mutations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
