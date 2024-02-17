import { useEffect, useState } from "react";

export const useAutoSlide = (arrayImages: string[]): number => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(arrayImages.length - 1);
    }

    if (index > arrayImages.length - 1) {
      setIndex(0);
    }
  }, [index, arrayImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [index]);

  return index
};
