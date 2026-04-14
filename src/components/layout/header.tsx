"use client";
import { signOutClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { Session } from "@/lib/auth";
import Link from "next/link";

export function Header({ user }: Readonly<{ user: Session["user"] | null }>) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutClient();
    router.push("/sign-in");
  };
  return (
    <header className='flex items-center justify-between w-full px-4 py-2 shadow'>
      <SidebarTrigger />
      <div className='flex items-center space-x-4'>
        {user ? (
          <>
            <Link href='/organization/create' className={buttonVariants()}>
              Create
            </Link>
            <Button variant='outline' size='sm' onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link href='/sign-in' className={buttonVariants()}>
              Sign in
            </Link>
            <Link
              href='/sign-up'
              className={buttonVariants({ variant: "outline" })}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
