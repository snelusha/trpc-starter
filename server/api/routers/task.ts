import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db.task.create({
        data: {
          title: input.title,
        },
      });
      return task;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany();
    return tasks;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const task = await ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
      });
      return task;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        completed: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          completed: input.completed,
        },
      });
      return task;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
