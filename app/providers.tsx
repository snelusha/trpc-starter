import type { ReactNode } from "react";

import { TRPCProvider } from "~/trpc/client";

export function Providers({ children }: { children: ReactNode }) {
  return <TRPCProvider>{children}</TRPCProvider>;
}
