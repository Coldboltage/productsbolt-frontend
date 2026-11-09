import { useState } from "react";

export function useIncrement() {
  const [increment, setIncrement] = useState<number>(0);

  const increaseByOne = () => setIncrement((prev: number) => prev + 1);
  const reduceByOne = () => setIncrement((prev: number) => prev - 1);

  return { increment, setIncrement, increaseByOne, reduceByOne };
}
