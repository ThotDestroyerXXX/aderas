import { HydrateClient } from "@/trpc/server";

export default function Home() {
  return (
    <HydrateClient>
      <div>
        <h1>Hello World</h1>
      </div>
    </HydrateClient>
  );
}
