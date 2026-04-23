import { formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import { Team } from "@/lib/auth-client";

export function OrganizationTeamSetting({
  teamRows,
}: Readonly<{ teamRows: Team[] }>) {
  return (
    <TabsContent value='teams'>
      <Card>
        <CardHeader>
          <CardTitle>Teams ({teamRows.length})</CardTitle>
          <CardDescription>
            Team definitions from teams and team_members tables.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {teamRows.length === 0 ? (
            <div className='text-sm text-muted-foreground'>No teams found.</div>
          ) : (
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {teamRows.map((teamRow) => (
                <div key={teamRow.id} className='flex gap-3 rounded-xl p-0'>
                  <Avatar className='size-11 shrink-0 rounded-xl'>
                    <AvatarImage
                      src={teamRow.avatarUrl ?? undefined}
                      alt={teamRow.name}
                    />
                    <AvatarFallback className='rounded-xl'>
                      {getInitials(teamRow.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1 space-y-1'>
                    <div className='flex items-start justify-between gap-3'>
                      <p className='truncate font-medium leading-none'>
                        {teamRow.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {formatDate(teamRow.createdAt)}
                      </p>
                    </div>
                    <p className='line-clamp-2 text-sm text-muted-foreground'>
                      {teamRow.description ?? "No description yet."}
                    </p>
                    <div className='flex flex-wrap items-center gap-3 text-sm'>
                      <p>
                        <span className='text-muted-foreground'>Color </span>
                        <span className='font-medium'>
                          {teamRow.color ?? "-"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
