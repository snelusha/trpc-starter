import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { pingRouter } from "~/server/api/routers/ping";

import type { inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  ping: pingRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
