import { Member } from "@/lib/auth";
import { TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { formatDate, getInitials, getRoleVariant } from "@/lib/utils";

export function OrganizationMemberSetting({
  memberRows,
}: Readonly<{
  memberRows: Member[];
}>) {
  return (
    <TabsContent value='members'>
      <Card>
        <CardHeader>
          <CardTitle>Members ({memberRows.length})</CardTitle>
          <CardDescription>
            Organization members and roles from members table.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {memberRows.length === 0 ? (
            <div className='text-sm text-muted-foreground'>
              No members found.
            </div>
          ) : (
            <div className='space-y-3 flex flex-wrap items-center gap-3'>
              {memberRows.map((memberRow) => (
                <div
                  key={memberRow.id}
                  className='flex flex-row items-center gap-3'
                >
                  <Avatar className='size-14 shrink-0'>
                    <AvatarImage
                      src={memberRow.user.image ?? undefined}
                      alt={memberRow.user.name}
                    />
                    <AvatarFallback>
                      {getInitials(memberRow.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col items-start gap-1'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-0 truncate font-medium'>
                        {memberRow.user.name}
                      </p>
                      <Badge variant={getRoleVariant(memberRow.role)}>
                        {memberRow.role}
                      </Badge>
                    </div>
                    <p className='min-w-0 truncate text-sm text-muted-foreground'>
                      {memberRow.user.email}
                    </p>

                    <p className='text-xs text-muted-foreground'>
                      Joined {formatDate(memberRow.createdAt)}
                    </p>
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
