import React, { useEffect } from "react";
import "../../styles/common/messagebox.css";
import { Button } from "../controls/Button.tsx";

export type MessageBoxType = "alert" | "confirm" | "yesnocancel";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  type?: MessageBoxType;
  onOk?: () => void;
  onCancel?: () => void;
  onYes?: () => void;
  onNo?: () => void;
}

export const MessageBox: React.FC<Props> = ({
  open,
  title = "Confirm",
  message,
  type = "confirm",
  onOk,
  onCancel,
  onYes,
  onNo,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="msgbox-overlay">
      <div className="msgbox">
        <div className="msgbox__header">
          <span className="msgbox__title">{title}</span>
        </div>
        <div className="msgbox__body">
          <p className="msgbox__message">{message}</p>
        </div>
        <div className="msgbox__footer">
          {type === "alert" && (
            <Button variant="primary" onClick={onOk}>
              OK
            </Button>
          )}
          {type === "confirm" && (
            <>
              <Button variant="default" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="success" onClick={onOk}>
                OK
              </Button>
            </>
          )}
          {type === "yesnocancel" && (
            <>
              <Button variant="default" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onNo}>
                No
              </Button>
              <Button variant="success" onClick={onYes}>
                Yes
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
