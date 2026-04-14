import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export const organizationRoleSchema = z.enum([
  "guest",
  "member",
  "admin",
  "owner",
]);

export type OrganizationRole = z.infer<typeof organizationRoleSchema>;

export const createOrganizationSchema = z.object({
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be less than 100 characters"),
  organizationSlug: z
    .string()
    .min(1, "Organization slug is required")
    .max(100, "Organization slug must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  inviteEmails: z
    .object({
      email: z.email("Invalid email address"),
      role: organizationRoleSchema,
    })
    .array()
    .min(1, "At least one email is required"),
  inviteMessage: z
    .string()
    .max(500, "Invite message must be less than 500 characters"),
});

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
