import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { emailOTP, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { apiKey } from "@better-auth/api-key";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
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
      async sendVerificationOTP({ otp, email }) {},
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
