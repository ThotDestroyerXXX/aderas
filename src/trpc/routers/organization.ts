import { auth } from "@/lib/auth";
import { createTRPCRouter, protectedProcedure } from "../init";
import { createOrganizationSchema } from "@/lib/schema";
import { headers } from "next/headers";

export const organizationRouter = createTRPCRouter({
  createOrganization: protectedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ input }) => {
      const data = await auth.api.createOrganization({
        body: {
          name: input.organizationName, // required
          slug: input.organizationSlug, // required
        },
        // This endpoint requires session cookies.
        headers: await headers(),
      });

      for (const email of input.inviteEmails) {
        await auth.api.createInvitation({
          body: {
            email: email.email,
            role: email.role,
            organizationId: data.id,
            resend: true,
          },
          headers: await headers(),
        });
      }
    }),
});
