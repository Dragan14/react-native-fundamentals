import React, { createContext, useContext, useState, useRef } from "react";
import Toast, { ToastProps } from "../components/ui/Toast";

/**
 * Represents a single toast notification item with its unique ID and props.
 */
interface ToastItem {
  /** Unique identifier for the toast item. */
  id: number;
  /** Props passed to the Toast component. */
  props: ToastProps;
}

/**
 * Parameters for showing a toast notification.
 */
interface ShowToastParams extends ToastProps {
  /** Duration in milliseconds to show the toast, or "infinite" for no automatic dismissal. Defaults to 3000ms. */
  duration?: number | "infinite";
}

/**
 * Defines the shape of the Toast context.
 */
interface ToastContextType {
  /** Function to display a toast notification with the given parameters. */
  showToast: (params: ShowToastParams) => void;
  /** Function to hide the currently displayed toast notification. */
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentToast, setCurrentToast] = useState<ToastItem | null>(null);
  const nextIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = ({ duration = 3000, ...props }: ShowToastParams) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const id = nextIdRef.current++;
    setCurrentToast({ id, props });
    if (duration !== "infinite" && duration) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  };

  const hideToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCurrentToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {currentToast && (
        <Toast
          key={currentToast.id}
          {...currentToast.props}
          onDismiss={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
