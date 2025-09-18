"use client";

import { useState } from "react";

import { createTRPCReact } from "@trpc/react-query";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { isServer } from "@tanstack/react-query";

import { QueryClientProvider } from "@tanstack/react-query";

import superjson from "superjson";

import { makeQueryClient } from "~/trpc/query-client";

import { env } from "~/env";

import type { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "~/server/api/root";

export const api = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (isServer) return makeQueryClient();
  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  const base = (() => {
    if (!isServer) return "";
    if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
    return env.NEXT_PUBLIC_APP_URL;
  })();
  return `${base}/api/trpc`;
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "client");
            return headers;
          },
        }),
        loggerLink({
          enabled: (opts) =>
            env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
