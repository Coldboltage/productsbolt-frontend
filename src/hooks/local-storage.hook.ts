import { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [localValue, setLocalValue] = useState("");
  const [localKey] = useState(key);

  useEffect(() => {
    const keyExist = localStorage.getItem(key);

    keyExist ? setLocalValue(keyExist) : setLocalValue("void");
  }, [key]);

  useEffect(() => {
    localStorage.setItem(localKey, localValue);
  }, [localValue, localKey]);

  return { localValue, setLocalValue };
}
