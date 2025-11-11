import { cache } from "react";

import { initTRPC } from "@trpc/server";

import superjson from "superjson";

import { db } from "~/lib/prisma";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;
