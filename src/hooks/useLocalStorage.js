import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. იღებს საწყის მნიშვნელობას localStorage-იდან
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return initialValue;
    }
  });

  // 2. State-ის ცვლილებისას ანახლებს localStorage-ს
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  }, [key, value]);

  return [value, setValue];
}