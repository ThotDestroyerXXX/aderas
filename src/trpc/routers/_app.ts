import { createTRPCRouter } from "../init";
import { organizationRouter } from "./organization";
import { postRouter } from "./post";
export const appRouter = createTRPCRouter({
  post: postRouter,
  organization: organizationRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
