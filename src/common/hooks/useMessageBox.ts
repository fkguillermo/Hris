import { useState, useCallback } from "react";
import type { MessageBoxType } from "../../components/common/MessageBox";

interface MessageBoxOptions {
  title?: string;
  message: string;
  type?: MessageBoxType;
  onOk?: () => void;
  onYes?: () => void;
  onNo?: () => void;
}

export function useMessageBox() {
  const [config, setConfig] = useState<MessageBoxOptions & { open: boolean }>({
    open: false,
    message: "",
  });

  const showMessageBox = useCallback((options: MessageBoxOptions) => {
    setConfig({ ...options, open: true });
  }, []);

  const close = useCallback(() => {
    setConfig((prev) => ({ ...prev, open: false }));
  }, []);

  const props = {
    open: config.open,
    title: config.title,
    message: config.message,
    type: config.type,
    onOk: () => {
      config.onOk?.();
      close();
    },
    onYes: () => {
      config.onYes?.();
      close();
    },
    onNo: () => {
      config.onNo?.();
      close();
    },
    onCancel: close,
  };

  return { showMessageBox, messageBoxProps: props };
}
