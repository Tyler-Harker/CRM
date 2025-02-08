import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T | undefined>(undefined); // Initial value is undefined
  const [loading, setLoading] = useState(true); // Track if we are still loading from localStorage

  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue) as T;
        setValue(parsedValue); // Set the value from localStorage
      } catch (error) {
        console.error("Error parsing localStorage value:", error);
      }
    } else {
      // If no value is found in localStorage, set the initial value
      setValue(initialValue);
      localStorage.setItem(key, JSON.stringify(initialValue));
    }

    setLoading(false); // Set loading to false once we've tried to load localStorage
  }, [key, initialValue]);

  const setLocalStorageValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // While loading, we return the initialValue to prevent showing undefined
  if (loading) {
    return [initialValue, setLocalStorageValue];
  }

  // Once loaded, return the value from localStorage (or initialValue if not set)
  return [value as T, setLocalStorageValue];
}

export default useLocalStorage;
