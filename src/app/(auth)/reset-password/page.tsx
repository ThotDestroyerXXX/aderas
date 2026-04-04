import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
