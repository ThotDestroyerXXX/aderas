"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";
import { useFormHook } from "@/hooks/use-form";
import { UpdatePasswordSchema, updatePasswordSchema } from "@/lib/schema";
import { Button } from "../ui/button";
import { resetPasswordClient, signOutClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm({
  token,
}: Readonly<{ token: string }>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useFormHook(updatePasswordSchema, {
    newPassword: "",
    confirmNewPassword: "",
  });

  const onSubmit = async (data: UpdatePasswordSchema) => {
    try {
      setLoading(true);
      await resetPasswordClient({ newPassword: data.newPassword, token });
      form.reset();
      await signOutClient();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Update your password</CardTitle>
          <CardDescription>
            Enter your new password below to update your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                disabled={loading}
                name='newPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='newPassword'>New Password</FieldLabel>
                    <Input
                      {...field}
                      id='newPassword'
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your new password'
                      autoComplete='off'
                      disabled={loading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                disabled={loading}
                name='confirmNewPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='confirmNewPassword'>
                      Confirm New Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id='confirmNewPassword'
                      aria-invalid={fieldState.invalid}
                      placeholder='Confirm your new password'
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
                  Update Password
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
