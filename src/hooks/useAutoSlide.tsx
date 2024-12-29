import { useEffect, useState } from "react";

export const useAutoSlide = <T,>(arr: T[]): number => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(arr.length - 1);
    }

    if (index > arr.length - 1) {
      setIndex(0);
    }
  }, [index, arr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [index]);

  return index;
};
