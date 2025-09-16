import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pingRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
});
