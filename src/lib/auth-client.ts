import {
  emailOTPClient,
  inferAdditionalFields,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/client";
import { auth } from "./auth";
import { apiKeyClient } from "@better-auth/api-key/client";
import { SignInSchema, SignUpSchema } from "./schema";
import { toast } from "sonner";
import { apiPath } from "@/constants/apiPath";
import { ac, admin, guest, member, owner } from "@/lib/permission";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>(),
    emailOTPClient(),
    organizationClient({
      teams: {
        enabled: true,
      },
      ac,
      roles: {
        guest,
        member,
        admin,
        owner,
      },
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
    apiKeyClient(),
  ],
});

export const signUpClient = async (data: SignUpSchema) => {
  const { data: signUpData, error } = await authClient.signUp.email(
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
      },
    },
  );
  if (error || !signUpData) {
    throw new Error(error?.message || "Signup failed");
  }
};

export const signInClient = async (data: SignInSchema) => {
  const { data: signInData, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: `/`,
  });
  if (error || !signInData) {
    throw new Error(error?.message || "Sign in failed");
  }
};

export const signOutClient = async () => {
  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Sign out successful!");
        },
      },
    });
  } catch (error) {
    toast.error("Sign out failed. Please try again.");
    console.error("Sign out error:", error);
  }
};

export const resetPasswordClient = async ({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) => {
  try {
    const { data, error } = await authClient.resetPassword({
      newPassword,
      token,
    });
    if (error || !data) {
      toast.error(error?.message || "Failed to reset password");
      return;
    } else {
      toast.success("Password reset successful!");
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    toast.error("An unexpected error occurred. Please try again.");
    return;
  }
};

export const signInClientWithGitHub = async () => {
  try {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: `/`,
    });
  } catch (error) {
    toast.error("GitHub sign in failed. Please try again.");
    console.error("GitHub sign in error:", error);
  }
};

export const checkOTPClient = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const { error } = await authClient.emailOtp.verifyEmail({
    email: email, // required
    otp: otp, // required
  });

  if (error) {
    throw new Error(error.message || "OTP verification failed");
  }
};

export const requestPasswordResetClient = async ({
  email,
}: {
  email: string;
}) => {
  const { error, data } = await authClient.requestPasswordReset({
    email: email,
    redirectTo: `/update-password`,
  });
  if (error || !data) {
    throw new Error(error?.message || "Failed to send reset password link");
  }
};

export type Team = typeof authClient.$Infer.Team;
