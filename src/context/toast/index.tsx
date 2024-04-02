import { createContext, useContext, useMemo } from 'react';
import { ExternalToast, toast, Toaster } from 'sonner';

import { noop } from '@/helpers';
import { FCC } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IPromise<Data = any> = Promise<Data> | (() => Promise<Data>);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IPromiseToastData<ToastData = any> = ExternalToast & {
  loading?: string | React.ReactNode;
  success?: string | React.ReactNode | ((data: ToastData) => React.ReactNode | string);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: string | React.ReactNode | ((error: any) => React.ReactNode | string);
  finally?: () => void | Promise<void>;
};

type ToastType = 'success' | 'info' | 'error';

type PromiseToastProps = IPromiseToastData & {
  promise: IPromise;
};

export type IToastContext = {
  showToast: (msg: string, type?: ToastType, data?: ExternalToast) => void;
  showPromiseToast: (promiseToastProps: PromiseToastProps) => void;
};

const toastOptions = {
  style: { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' },
  duration: 4000,
};

export const initToastContext: IToastContext = {
  showPromiseToast: noop,
  showToast: noop,
};

const ToastContext = createContext(initToastContext);

export const ToastContextProvider: FCC = ({ children }) => {
  const value = useMemo(
    () => ({
      showToast: (msg: string, type: ToastType = 'success', data?: ExternalToast) =>
        toast[type](msg, data),
      showPromiseToast: ({ promise, ...props }: PromiseToastProps) => toast.promise(promise, props),
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      <Toaster toastOptions={toastOptions} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
