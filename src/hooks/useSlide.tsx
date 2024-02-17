import { useEffect, useState } from "react";
import { UseSlide } from "../entities/entities";

export const useSlide = <T,>(arr: T[]): UseSlide<T> => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index >= arr.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [index, arr]);

  return {
    index,
    setIndex,
  };
};
