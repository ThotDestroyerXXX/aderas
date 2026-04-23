import { H3 } from "../typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";

export function OrganizationDangerZoneSetting() {
  return (
    <TabsContent value='danger'>
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Destructive actions for organization ownership.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-between gap-3'>
          <div>
            <H3>Delete Organization</H3>
            <p className='text-sm text-muted-foreground'>
              Permanently delete this organization and all related data.
            </p>
          </div>
          {/* <Button variant='destructive' disabled={!canDeleteOrg}>
                Delete Organization
              </Button> */}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
