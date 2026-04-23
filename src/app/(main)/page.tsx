import { RecentWorkspaceList } from "@/components/home/recent-workspace-list";
import { H2 } from "@/components/typography";
import { getServerWorkspaces } from "@/lib/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const workspaces = await getServerWorkspaces();
  return (
    <HydrateClient>
      <div className='flex flex-col h-full px-4'>
        <H2>Recent Workspaces</H2>
        <RecentWorkspaceList workspaces={workspaces} />
      </div>
    </HydrateClient>
  );
}
