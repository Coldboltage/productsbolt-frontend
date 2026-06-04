import { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [localValue, setLocalValue] = useState("");
  const [localKey] = useState(key);

  useEffect(() => {
    localStorage.setItem(localKey, localValue);
  }, [localValue, localKey]);

  const keyExist = localStorage.getItem(key);

  if (keyExist) {
    setLocalValue(keyExist);
  } else {
    localStorage.setItem(key, "void");
    setLocalValue("void");
  }

  return { localValue, setLocalValue };
}
