"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/trpc";

import { Toaster } from "./ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors />
    </QueryClientProvider>
  );
}
