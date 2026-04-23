import { formatDateTime } from "@/lib/utils";
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
import { ApiKey } from "@better-auth/api-key";

export function OrganizationApiKeySetting({
  apiKeyRows,
}: Readonly<{
  apiKeyRows: ApiKey;
}>) {
  return (
    <TabsContent value='api-keys'>
      <Card>
        <CardHeader>
          <CardTitle>API Keys ({apiKeyRows.total})</CardTitle>
          <CardDescription>
            Keys and rate limits from api_keys table for this organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead>Rate Limit</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeyRows.total === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-muted-foreground'>
                    No API keys found.
                  </TableCell>
                </TableRow>
              ) : (
                apiKeyRows.apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>{apiKey.name ?? "Unnamed key"}</TableCell>
                    <TableCell>{apiKey.prefix ?? "-"}</TableCell>
                    <TableCell>
                      <Badge variant={apiKey.enabled ? "secondary" : "outline"}>
                        {apiKey.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {apiKey.rateLimitEnabled
                        ? `${apiKey.rateLimitMax ?? 0} / ${apiKey.rateLimitTimeWindow ?? 0}ms`
                        : "Off"}
                    </TableCell>
                    <TableCell>{formatDateTime(apiKey.expiresAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
