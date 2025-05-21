"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toast";
import { queryClient } from "@/utils/trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors />
    </QueryClientProvider>
  );
}
