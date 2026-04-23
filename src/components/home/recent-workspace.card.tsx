import { Organization } from "@/lib/auth";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

export const RecentWorkspaceCard = ({
  workspace,
}: {
  workspace: Organization;
}) => {
  return (
    <Card className='w-70 h-full py-4 flex flex-col'>
      <CardHeader>
        <Image
          src={workspace?.logo ?? "/favicon.ico"}
          alt={workspace.name}
          width={30}
          height={30}
        />
        <CardTitle>{workspace.name}</CardTitle>
        <CardDescription>
          Created {workspace.createdAt.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
