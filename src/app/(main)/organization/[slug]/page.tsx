import { H3 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { apiPath } from "@/constants/apiPath";
import { Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  if (!slug) {
    redirect(apiPath.HOME);
  }

  return (
    <div className='flex flex-col h-full px-4'>
      <div className='flex items-center justify-between gap-2'>
        <H3>Organization</H3>
        <Link
          href={apiPath.ORGANIZATION + `/${slug}` + apiPath.SETTING}
          className={buttonVariants()}
        >
          <Settings />
        </Link>
      </div>
    </div>
  );
}
