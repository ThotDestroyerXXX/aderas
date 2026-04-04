import UpdatePasswordForm from "@/components/auth/update-password-form";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const { token } = await searchParams;

  if (!token || typeof token !== "string") {
    redirect("/sign-in");
  }
  return (
    <HydrateClient>
      <div className='flex min-h-svh flex-col items-center justify-center'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <UpdatePasswordForm token={token} />
        </div>
      </div>
    </HydrateClient>
  );
}
