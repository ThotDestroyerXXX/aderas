import {
  emailOTPClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
import { apiKeyClient } from "@better-auth/api-key/client";
import { SignInSchema, SignUpSchema } from "./schema";
import { toast } from "sonner";
import { apiPath } from "@/constants/apiPath";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>(),
    emailOTPClient(),
    organizationClient(),
    apiKeyClient(),
  ],
});

export const signUpClient = async (data: SignUpSchema) => {
  await authClient.signUp.email(
    {
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: `${apiPath.OTP_VERIFICATION}`,
    },
    {
      onSuccess: async () => {
        await authClient.emailOtp.sendVerificationOtp({
          email: data.email,
          type: "email-verification",
        });
        toast.success(
          "Signup successful! Please check your email for the OTP.",
        );
      },
      onError: (error) => {
        toast.error("Signup failed. Please try again.");
        console.error("Signup error:", error);
      },
    },
  );
};

export const signInClient = async (data: SignInSchema) => {
  await authClient.signIn.email(
    {
      email: data.email,
      password: data.password,
      callbackURL: `/`,
    },
    {
      onSuccess: () => {
        toast.success(
          "Sign in successful! Please check your email for the OTP.",
        );
      },
      onError: (error) => {
        toast.error("Sign in failed. Please try again.");
        console.error("Sign in error:", error);
      },
    },
  );
};
