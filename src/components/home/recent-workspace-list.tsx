import { Organization } from "@/lib/auth";
import { RecentWorkspaceCard } from "./recent-workspace.card";
import Link from "next/link";

export const RecentWorkspaceList = ({
  workspaces,
}: {
  workspaces: Organization[];
}) => {
  return (
    <div className='mt-4'>
      {workspaces.map((workspace) => (
        <Link key={workspace.id} href={`/organization/${workspace.slug}`}>
          <RecentWorkspaceCard key={workspace.id} workspace={workspace} />
        </Link>
      ))}
    </div>
  );
};
