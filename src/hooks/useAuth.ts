"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { initPostHog, isPostHogConfigured, posthog } from "@/lib/posthog";
import {
  getAuthSession,
  login,
  logout,
  register,
} from "@/utils/auth.functions";

const AUTH_QUERY_KEY = ["auth", "session"] as const;

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sessionQuery = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => getAuthSession(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => login({ data }),
    onSuccess: (user) => {
      if (isPostHogConfigured()) {
        initPostHog();
        posthog.identify(user.id, {
          email: user.email,
          name: user.name,
          theme: user.theme,
          language: user.language,
        });
        posthog.capture("auth_login_success");
      }

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/dashboard");
      router.refresh();
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: { email: string; password: string; name?: string }) =>
      register({ data }),
    onSuccess: (user) => {
      if (isPostHogConfigured()) {
        initPostHog();
        posthog.identify(user.id, {
          email: user.email,
          name: user.name,
          theme: user.theme,
          language: user.language,
        });
        posthog.capture("auth_register_success");
      }

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/dashboard");
      router.refresh();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      if (isPostHogConfigured()) {
        initPostHog();
        posthog.reset();
      }

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/login");
      router.refresh();
    },
  });

  useEffect(() => {
    if (!sessionQuery.isSuccess || !isPostHogConfigured()) {
      return;
    }

    initPostHog();

    if (sessionQuery.data) {
      posthog.identify(sessionQuery.data.id, {
        email: sessionQuery.data.email,
        name: sessionQuery.data.name,
        theme: sessionQuery.data.theme,
        language: sessionQuery.data.language,
      });

      return;
    }

    posthog.reset();
  }, [sessionQuery.data, sessionQuery.isSuccess]);

  return {
    user: sessionQuery.data ?? null,
    isLoading: sessionQuery.isLoading,
    isAuthenticated: !!sessionQuery.data,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
  };
}
