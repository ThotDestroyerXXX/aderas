import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { emailOTP, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { apiKey } from "@better-auth/api-key";
import { EmailTypeEnum } from "@/vendor/resend/email-template";
import { ac, admin, guest, member, owner } from "@/lib/permission";
import { headers } from "next/headers";
import { apiPath } from "@/constants/apiPath";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ url, user }) => {
      const response = await fetch(
        `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: { kind: EmailTypeEnum.RESET_PASSWORD, resetUrl: url },
            email: user.email,
            subject: "Reset your password",
          }),
        },
      );

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Failed to send OTP email: ${responseText}`);
      }
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      scope: ["user:email"],
    },
  },
  user: {
    modelName: "users",
    additionalFields: {
      bio: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
    modelName: "sessions",
  },
  account: {
    modelName: "accounts",
  },
  verification: {
    modelName: "verifications",
  },
  plugins: [
    nextCookies(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        const appUrl =
          process.env.BETTER_AUTH_URL ??
          process.env.NEXT_PUBLIC_APP_URL ??
          "http://localhost:3000";

        const subjectByType: Record<string, string> = {
          "email-verification": "OTP Verification",
          "sign-in": "Sign in OTP",
          "forget-password": "Password reset OTP",
          "password-reset": "Password reset OTP",
        };

        const response = await fetch(`${appUrl}/api/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: { kind: EmailTypeEnum.OTP, otpCode: otp },
            email,
            subject: subjectByType[type] ?? "Your OTP Code",
          }),
        });

        if (!response.ok) {
          const responseText = await response.text();
          throw new Error(`Failed to send OTP email: ${responseText}`);
        }
      },
    }),
    organization({
      schema: {
        organization: {
          modelName: "organizations",
        },
        member: {
          modelName: "members",
        },
        invitation: {
          modelName: "invitations",
        },
      },
      ac,
      roles: {
        guest,
        member,
        admin,
        owner,
      },
    }),
    apiKey({
      schema: {
        apikey: {
          modelName: "api_keys",
        },
      },
    }),
  ],
});

export const getServerSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session ?? null;
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect(apiPath.SIGN_IN);
  }
};

export const getServerWorkspaces = async () => {
  try {
    const data = await auth.api.listOrganizations({
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    return data;
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    redirect(apiPath.SIGN_IN);
  }
};

export type Session = typeof auth.$Infer.Session;
export type Organization = typeof auth.$Infer.Organization;
