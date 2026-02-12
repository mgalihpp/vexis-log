"use client";

import { useState, useEffect } from "react";
import { Splash } from "@/components/Splash";

type Props = {
  children: React.ReactNode;
};

export function DashboardSplashWrapper({ children }: Props) {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1400);

    // Remove component
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2450);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-[100]">
          <Splash zoomIn={true} isExiting={isExiting} />
        </div>
      )}
      {children}
    </>
  );
}
