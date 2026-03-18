import { createContext, useContext, useMemo, useState } from 'react';

type Toast = {
  id: string;
  message: string;
  tone?: 'success' | 'error' | 'info';
};

type ToastContextValue = {
  toast: (message: string, tone?: Toast['tone']) => void;
};

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, tone: Toast['tone'] = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 2400);
  };

  const value = useMemo(() => ({ toast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack">
        {toasts.map((item) => (
          <div key={item.id} className="toast">
            <strong style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
              {item.tone}
            </strong>
            <div>{item.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
