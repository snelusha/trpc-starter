import "~/styles/globals.css";

import { geistMono, geistSans } from "~/styles/fonts";

import { Providers } from "~/app/providers";

import { cn } from "~/styles/utils";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "trpc-starter",
  description: "Made by a human on earth!",
  creator: "@snelusha",
};

export const viewport: Viewport = {
  colorScheme: "only light",
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
