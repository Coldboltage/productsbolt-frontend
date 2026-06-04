import { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [localValue, setLocalValue] = useState("void");

  useEffect(() => {
    const keyExist = localStorage.getItem(key);

    if (keyExist) {
      setLocalValue(keyExist);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, localValue);
  }, [localValue, key]);

  return { localValue, setLocalValue };
}
