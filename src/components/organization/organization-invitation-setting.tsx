import { formatDateTime, getRoleVariant } from "@/lib/utils";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TabsContent } from "../ui/tabs";
import { Invitation } from "@/lib/auth";

export function OrganizationInvitationSetting({
  invitationRows,
}: Readonly<{
  invitationRows: Invitation[];
}>) {
  return (
    <TabsContent value='invitations'>
      <Card>
        <CardHeader>
          <CardTitle>Invitations ({invitationRows.length})</CardTitle>
          <CardDescription>
            Pending and historical invites from invitations table.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitationRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-muted-foreground'>
                    No invitations found.
                  </TableCell>
                </TableRow>
              ) : (
                invitationRows.map((invitationRow) => (
                  <TableRow key={invitationRow.id}>
                    <TableCell>{invitationRow.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getRoleVariant(invitationRow.role ?? "member")}
                      >
                        {invitationRow.role ?? "member"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>{invitationRow.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {formatDateTime(invitationRow.expiresAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {/* {canManageOrg && (
                        <p className='mt-3 text-xs text-muted-foreground'>
                          Invite, resend, and cancel actions can be added next using
                          createInvitation APIs.
                        </p>
                      )} */}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
