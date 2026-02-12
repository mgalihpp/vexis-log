"use client";

import { useState, useEffect } from "react";
import { Splash } from "@/components/Splash";

type Props = {
  children: React.ReactNode;
};

export function DashboardSplashWrapper({ children }: Props) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash zoomIn={true} />;
  }

  return <>{children}</>;
}
