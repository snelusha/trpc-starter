import "server-only";

import { cache } from "react";

import { headers } from "next/headers";

import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { createTRPCContext } from "~/server/api/trpc";
import { createCaller } from "~/server/api/root";

import { makeQueryClient } from "~/trpc/query-client";

import type { AppRouter } from "~/server/api/root";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const getQueryClient = cache(makeQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
