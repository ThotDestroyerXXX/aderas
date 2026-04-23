import { createTRPCRouter } from "../init";
import { memberRouter } from "./member";
import { organizationRouter } from "./organization";
import { postRouter } from "./post";
export const appRouter = createTRPCRouter({
  post: postRouter,
  organization: organizationRouter,
  member: memberRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
