import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { taskRouter } from "~/server/api/routers/task";

import type { inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  task: taskRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
