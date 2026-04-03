import { OTPVerificationForm } from "@/components/auth/otp-verification-form";
import { auth } from "@/lib/auth";
import { HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";

export default async function OTPVerificationPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <HydrateClient>
      <div className='flex items-center justify-center h-screen'>
        <OTPVerificationForm email={data?.user.email ?? ""} />
      </div>
    </HydrateClient>
  );
}
