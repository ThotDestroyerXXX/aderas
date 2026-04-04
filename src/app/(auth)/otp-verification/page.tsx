import { OTPVerificationForm } from "@/components/auth/otp-verification-form";
import { auth } from "@/lib/auth";
import { HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OTPVerificationPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  const email = data?.user.email;

  if (!email) {
    redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <div className='flex items-center justify-center h-screen'>
        <OTPVerificationForm email={email} />
      </div>
    </HydrateClient>
  );
}
