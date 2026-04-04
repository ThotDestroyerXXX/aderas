"use client";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { apiPath } from "@/constants/apiPath";

export function OTPVerificationForm({ email }: Readonly<{ email: string }>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (otp: string) => {
    setLoading(true);

    try {
      const { error } = await authClient.emailOtp.checkVerificationOtp({
        email: email, // required
        type: "email-verification", // required
        otp: otp, // required
      });

      if (error) {
        toast.error("OTP input not matching or expired. Please try again.");
        console.error("OTP verification error:", error);
      } else {
        toast.success("OTP verified successfully! You are now logged in.");
        router.push(apiPath.HOME);
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
      console.error("Unexpected OTP verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const otp = formData.get("otp-verification") as string;
        onSubmit(otp);
      }}
    >
      <Card className='mx-auto max-w-md'>
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span className='font-medium'>{email}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <div className='flex items-center justify-between'>
              <FieldLabel htmlFor='otp-verification'>
                Verification code
              </FieldLabel>
              <Button
                variant='outline'
                type='button'
                size='xs'
                onClick={async () => {
                  setLoading(true);
                  await authClient.emailOtp.sendVerificationOtp({
                    email: email,
                    type: "email-verification",
                  });
                  toast.success(
                    "resend successful! Please check your email for the OTP.",
                  );
                  setLoading(false);
                }}
              >
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <InputOTP
              maxLength={6}
              id='otp-verification'
              name='otp-verification'
              required
              disabled={loading}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className='*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl'>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className='mx-2' />
              <InputOTPGroup className='*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl'>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <FieldDescription>
              <Link href='#'>
                I no longer have access to this email address.
              </Link>
            </FieldDescription>
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type='submit' className='w-full' disabled={loading}>
              Verify
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
