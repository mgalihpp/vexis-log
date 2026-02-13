"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/Theme-Provider";
import { PosthogProvider } from "@/components/PosthogProvider";
import {
  FeedbackToastHost,
  FeedbackToastProvider,
} from "@/hooks/use-feedback-toast";

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PosthogProvider>
          <FeedbackToastProvider>
            {children}
            <FeedbackToastHost />
          </FeedbackToastProvider>
        </PosthogProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
