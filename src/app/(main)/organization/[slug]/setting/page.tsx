import { H2 } from "@/components/typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getServerApiKeys,
  getServerCurrentOrganization,
  getServerTeamList,
} from "@/lib/auth";
import { HydrateClient, trpc } from "@/trpc/server";
import { OrganizationMemberSetting } from "@/components/organization/organization-member-setting";
import { OrganizationGeneralSetting } from "@/components/organization/organization-general-setting";
import { OrganizationInvitationSetting } from "@/components/organization/organization-invitation-setting";
import { OrganizationTeamSetting } from "@/components/organization/organization-team-setting";
import { OrganizationApiKeySetting } from "@/components/organization/organization-api-key-setting";
import { OrganizationDangerZoneSetting } from "@/components/organization/organization-danger-zone-setting";
import { NotFound } from "@/components/not-found";
import { apiPath } from "@/constants/apiPath";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  if (!slug) {
    return <NotFound title='Organization' redirectUrl={apiPath.HOME} />;
  }
  void trpc.member.getCurrentMemberRole.prefetch({ organizationSlug: slug });
  const organization = await getServerCurrentOrganization(slug);

  if (!organization) {
    return <NotFound title='Organization' redirectUrl={apiPath.HOME} />;
  }

  const [teamRows, apiKeyRows] = await Promise.all([
    getServerTeamList(organization.id),
    getServerApiKeys(organization.id),
  ]);

  return (
    <HydrateClient>
      <div className='flex flex-col h-full gap-6 px-4 pb-6'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <H2>Organization Settings</H2>
          </div>
          <p className='text-sm text-muted-foreground'>
            This page is scoped to your active organization and currently
            exposes schema-backed settings.
          </p>
        </div>

        <Tabs defaultValue='general' className='w-full'>
          <div>
            <TabsList variant='line' className='min-w-max'>
              <TabsTrigger value='general'>General</TabsTrigger>
              <TabsTrigger value='members'>Members</TabsTrigger>
              <TabsTrigger value='invitations'>Invitations</TabsTrigger>
              <TabsTrigger value='teams'>Teams</TabsTrigger>
              <TabsTrigger value='api-keys'>API Keys</TabsTrigger>
              <TabsTrigger value='danger'>Danger Zone</TabsTrigger>
            </TabsList>
          </div>
          <OrganizationGeneralSetting slug={slug} organization={organization} />
          <OrganizationMemberSetting memberRows={organization.members} />
          <OrganizationInvitationSetting
            invitationRows={organization.invitations}
          />
          <OrganizationTeamSetting teamRows={teamRows} />
          <OrganizationApiKeySetting apiKeyRows={apiKeyRows} />
          <OrganizationDangerZoneSetting />
        </Tabs>
      </div>
    </HydrateClient>
  );
}
