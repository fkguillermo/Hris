import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

import type { ReactNode } from "react";

interface OrganizationContextType {
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onRefresh: () => Promise<void>;
  registerHandlers: (handlers: {
    save: () => Promise<void>;
    cancel: () => void;
    refresh: () => Promise<void>;
  }) => void;
}

const OrganizationContext = createContext<OrganizationContextType | null>(null);

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) throw new Error("Must be within OrganizationProvider");
  return context;
};

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [hasChanges, setHasChanges] = useState(false);

  // Use useRef instead of useState to avoid re-renders
  const handlersRef = useRef<{
    save?: () => Promise<void>;
    cancel?: () => void;
    refresh?: () => Promise<void>;
  }>({});

  const onSave = useCallback(async () => {
    if (handlersRef.current.save) {
      await handlersRef.current.save();
    } else {
      console.warn("No save handler registered");
    }
  }, []);

  const onCancel = useCallback(() => {
    if (handlersRef.current.cancel) {
      handlersRef.current.cancel();
    } else {
      console.warn("No cancel handler registered");
    }
  }, []);

  const onRefresh = useCallback(async () => {
    if (handlersRef.current.refresh) {
      await handlersRef.current.refresh();
    } else {
      console.warn("No refresh handler registered");
    }
  }, []);

  // Use useCallback to make this stable
  const registerHandlers = useCallback(
    (newHandlers: {
      save: () => Promise<void>;
      cancel: () => void;
      refresh: () => Promise<void>;
    }) => {
      console.log("Registering handlers:", newHandlers);
      handlersRef.current = newHandlers;
    },
    [],
  );

  return (
    <OrganizationContext.Provider
      value={{
        hasChanges,
        setHasChanges,
        onSave,
        onCancel,
        onRefresh,
        registerHandlers,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
