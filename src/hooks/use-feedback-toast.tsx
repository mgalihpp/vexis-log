import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { FeedbackToast } from "@/components/ui/feedback-toast";

type ToastKind = "success" | "error";

type ToastState = {
  kind: ToastKind;
  message: string;
} | null;

type ToastContextValue = {
  toast: ToastState;
  showToast: (kind: ToastKind, message: string) => void;
  dismissToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type FeedbackToastProviderProps = {
  durationMs?: number;
  children: ReactNode;
};

export function FeedbackToastProvider({
  durationMs = 3000,
  children,
}: FeedbackToastProviderProps) {
  const [toast, setToast] = useState<ToastState>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showToast = useCallback(
    (kind: ToastKind, message: string) => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      setToast({ kind, message });
      timeoutRef.current = window.setTimeout(() => {
        setToast(null);
      }, durationMs);
    },
    [durationMs],
  );

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const value: ToastContextValue = {
    toast,
    showToast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function FeedbackToastHost() {
  const context = useContext(ToastContext);
  if (!context?.toast) {
    return null;
  }

  return (
    <FeedbackToast
      kind={context.toast.kind}
      message={context.toast.message}
      onDismiss={context.dismissToast}
    />
  );
}

export function useFeedbackToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useFeedbackToast must be used within FeedbackToastProvider",
    );
  }

  return context;
}
