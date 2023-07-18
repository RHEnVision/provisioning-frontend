import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const storedValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(storedValue);

  const setStoredValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
