"use client";

import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export const AuthComponent = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) return null;

  return <> {children} </>;
};

export const UnAuthComponent = ({ children }: Props) => {
  const { user } = useAuth();

  if (user) return null;

  return <> {children} </>;
};
