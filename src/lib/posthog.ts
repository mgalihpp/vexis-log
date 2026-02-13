import posthog from "posthog-js";

let isPostHogInitialized = false;

export function isPostHogConfigured() {
  return Boolean(
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
  );
}

export function initPostHog() {
  if (!isPostHogConfigured() || isPostHogInitialized) {
    return;
  }

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key || !host) {
    return;
  }

  posthog.init(key, {
    api_host: host,
    defaults: "2026-01-30",
    capture_pageview: false,
  });

  isPostHogInitialized = true;
}

export { posthog };
