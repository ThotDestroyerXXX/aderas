import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

function Spinner({
  className,
  ...props
}: Readonly<React.ComponentProps<"svg">>) {
  return (
    // spinner lucide react icon
    <LoaderCircle
      className={cn("size-4 animate-spin", className)}
      {...props}
      role='status'
      aria-label='Loading'
    />
  );
}

export { Spinner };
