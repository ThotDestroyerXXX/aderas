import { CircleCheckBig } from "lucide-react";

export default function ResetEmailSentCard() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 text-center'>
      <CircleCheckBig color='green' size={48} />
      <p>Please check your email for the reset password link.</p>
    </div>
  );
}
