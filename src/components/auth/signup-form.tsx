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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useFormHook } from "@/hooks/use-form";
import { SignUpSchema, signUpSchema } from "@/lib/schema";
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import { signUpClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useFormHook(signUpSchema, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function onSubmit(data: SignUpSchema) {
    try {
      setLoading(true);
      await signUpClient(data);
      router.push("/");
      form.reset();
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                    <Input
                      {...field}
                      id='name'
                      aria-invalid={fieldState.invalid}
                      placeholder='John Doe'
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
              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                    <Input
                      {...field}
                      id='password'
                      aria-invalid={fieldState.invalid}
                      type='password'
                      placeholder='••••••••'
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
                name='confirmPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='confirmPassword'>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id='confirmPassword'
                      aria-invalid={fieldState.invalid}
                      type='password'
                      placeholder='••••••••'
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
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldDescription className='text-center'>
                  Already have an account? <Link href='/sign-in'>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
