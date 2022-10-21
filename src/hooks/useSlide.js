import { useEffect, useState } from "react";

export const useSlide = (arr) => {
  const [index, setIndex] = useState(0);

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
