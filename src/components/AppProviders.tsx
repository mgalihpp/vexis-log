"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/Theme-Provider";
import { Splash } from "@/components/Splash";
import {
  FeedbackToastHost,
  FeedbackToastProvider,
} from "@/hooks/use-feedback-toast";

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  const [showSplash, setShowSplash] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <ThemeProvider>
        <Splash zoomIn={true} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <FeedbackToastProvider>
          {children}
          <FeedbackToastHost />
        </FeedbackToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
