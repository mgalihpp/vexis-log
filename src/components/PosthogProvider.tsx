"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, isPostHogConfigured, posthog } from "@/lib/posthog";

type Props = {
  children: React.ReactNode;
};

export function PosthogProvider({ children }: Props) {
  useEffect(() => {
    if (!isPostHogConfigured()) {
      return;
    }

    initPostHog();
  }, []);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PosthogPageViewTracker />
      </Suspense>
    </>
  );
}

function PosthogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!isPostHogConfigured()) {
      return;
    }

    initPostHog();

    const currentUrl =
      window.location.origin + pathname + (query ? `?${query}` : "");

    posthog.capture("$pageview", {
      $current_url: currentUrl,
    });
  }, [pathname, query]);

  return null;
}
