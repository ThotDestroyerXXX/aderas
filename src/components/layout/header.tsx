"use client";
import { signOutClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutClient();
    router.push("/sign-in");
  };
  return (
    <header className='flex items-center justify-between'>
      <SidebarTrigger />
      <Button variant='outline' size='sm' onClick={handleSignOut}>
        Sign out
      </Button>
    </header>
  );
}
