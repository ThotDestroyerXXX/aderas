import { SignupForm } from "@/components/auth/signup-form";
import { HydrateClient } from "@/trpc/server";

export default function SignupPage() {
  return (
    <HydrateClient>
      <div className='flex flex-col items-center justify-center min-h-svh'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <SignupForm />
        </div>
      </div>
    </HydrateClient>
  );
}
