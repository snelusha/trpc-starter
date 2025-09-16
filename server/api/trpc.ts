import { cache } from "react";

import { initTRPC, TRPCError } from "@trpc/server";

import superjson from "superjson";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;
