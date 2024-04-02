import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // Retrieve the stored value from local storage on component mount
  const storedValue = localStorage.getItem(key);

  // Initialize the state with the stored value or the initial value
  const [value, setValue] = useState<T>(
    (storedValue ? JSON.parse(storedValue) : initialValue) as T
  );

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
