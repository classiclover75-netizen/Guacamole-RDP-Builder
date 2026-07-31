import { useState, useCallback, useRef } from "react";

type ToastState = {
  message: string;
  isError: boolean;
  visible: boolean;
};

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    isError: false,
    visible: false,
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string, isError = false) => {
    setToast({ message, isError, visible: true });
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 1600);
  }, []);

  return { toast, showToast };
}
