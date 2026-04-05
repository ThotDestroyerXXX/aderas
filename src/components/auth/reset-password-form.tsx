"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormHook } from "@/hooks/use-form";
import { ResetPasswordSchema, resetPasswordSchema } from "@/lib/schema";
import { Controller } from "react-hook-form";
import { requestPasswordResetClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import ResetEmailSentCard from "./reset-email-sent-card";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useFormHook(resetPasswordSchema, {
    email: "",
  });

  async function onSubmit(datas: ResetPasswordSchema) {
    // send reset password link to the email address
    console.log("Reset password link sent to:", datas.email);
    setLoading(true);
    try {
      await requestPasswordResetClient({ email: datas.email });
      setEmailSent(true);
      toast.success("Reset password link sent successfully");
    } catch (error) {
      console.error("Error sending reset password link:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
      setEmailSent(false);
    } finally {
      setLoading(false);
    }

    form.reset();
    setEmailSent(true);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {emailSent ? "Reset Link Sent" : "Reset your password"}
          </CardTitle>
          <CardDescription>
            {emailSent
              ? "We've sent you a link to reset your password."
              : "Enter your email address and we&apos;ll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <ResetEmailSentCard />
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  disabled={loading}
                  name='email'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='email'>Email</FieldLabel>
                      <Input
                        {...field}
                        id='email'
                        aria-invalid={fieldState.invalid}
                        placeholder='m@example.com'
                        autoComplete='off'
                        disabled={loading}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Field>
                  <Button type='submit' disabled={loading}>
                    Send Reset Link
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
