import { CircleQuestionMark } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import Link from "next/link";

export const NotFound = ({
  title,
  redirectUrl,
}: Readonly<{
  title: string;
  redirectUrl: string;
}>) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <CircleQuestionMark />
        </EmptyMedia>
        <EmptyTitle>{title} not found</EmptyTitle>
        <EmptyDescription>
          The requested {title.toLowerCase()} could not be found.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={redirectUrl} className={buttonVariants()}>
          Go back
        </Link>
      </EmptyContent>
    </Empty>
  );
};
