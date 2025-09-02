import * as React from "react";
import { cn } from "@/app/utils/utils";
import { useEffect, useState } from "react";



interface AlertProps {
  variant?: "default" | "destructive";
  autoDismiss?: number;
  onDismiss?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant = "default", autoDismiss, onDismiss, className, children }) => {
const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "p-4 rounded-md",
        variant === "destructive" ? "bg-pink-100 text-pink-800" : "bg-blue-100 text-blue-800",
        className
      )}
    >
      {children}
    </div>
  );
};

const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="font-bold">{children}</h4>
);

const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p>{children}</p>
);

export { Alert, AlertTitle, AlertDescription };