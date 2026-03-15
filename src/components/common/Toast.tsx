import React, { useEffect } from "react";
import "../../styles/common/toast.css";

export type ToastType = "success" | "error";

export interface ToastMessage {
  type: ToastType;
  message: string;
}

interface Props {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<Props> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast toast--${toast.type}`}>
      <span className="toast__message">{toast.message}</span>
      <button className="toast__close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};
