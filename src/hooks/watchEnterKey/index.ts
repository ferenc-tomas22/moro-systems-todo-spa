import { useEffect } from 'react';

type Callback = () => Promise<void> | void;

export const useWatchEnterKey = (callback: Callback) => {
  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Enter') {
        void callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
};
