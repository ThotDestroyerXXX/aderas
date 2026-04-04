import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { emailOTP, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { apiKey } from "@better-auth/api-key";
import { EmailTypeEnum } from "@/vendor/resend/email-template";

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
            "x-internal-secret": process.env.INTERNAL_API_SECRET,
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
            "x-internal-secret": process.env.INTERNAL_API_SECRET,
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

export type Session = typeof auth.$Infer.Session;
