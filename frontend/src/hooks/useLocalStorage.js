import { useState, useEffect } from 'react';

const PREFIX = 'whatsapp-clone-';

// For set and get the value to localstoreage
const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  //   For setting the value to the localstorage
  useEffect(() => {
    if (value) {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
