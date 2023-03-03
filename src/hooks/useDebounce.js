import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(hanlder);
    };
  }, [value, delay]);

  return debounceValue;
};
