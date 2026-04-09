import type { Alert } from '../context/AlertContext';

const styles: Record<Alert['type'], string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
};

const icons: Record<Alert['type'], string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
};

interface AlertToastProps {
  alerts: Alert[];
}

export function AlertToast({ alerts }: AlertToastProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-md text-white shadow-lg min-w-64 ${styles[alert.type]}`}
        >
          <span className="font-bold">{icons[alert.type]}</span>
          <span className="text-sm">{alert.message}</span>
        </div>
      ))}
    </div>
  );
}
