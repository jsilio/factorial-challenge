import { publicProcedure, router } from "@/lib/trpc";

import { bikeRouter } from "./bike";

export const appRouter = router({
  bike: bikeRouter,
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
});

export type AppRouter = typeof appRouter;
