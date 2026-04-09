import { createContext, useContext, useState, type ReactNode } from 'react';
import { AlertToast } from '../components/AlertToast';

export type AlertType = 'success' | 'error' | 'warning';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertContextValue {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (type: AlertType, message: string) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertToast alerts={alerts} />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used inside AlertProvider');
  return ctx;
}
