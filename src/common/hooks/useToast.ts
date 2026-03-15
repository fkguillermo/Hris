import { useState, useCallback } from "react";
import type { ToastMessage, ToastType } from "../../components/common/Toast";

export function useToast() {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showMessage = useCallback((success: boolean, message: string) => {
    setToast({
      type: success ? "success" : "error",
      message,
    });
  }, []);

  const closeToast = useCallback(() => setToast(null), []);

  return { toast, showMessage, closeToast };
}
