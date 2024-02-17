export const getClassNamePosition = (
  nameClass: string,
  principalIndex: number,
  mapIndex: number,
  arr: string[]
): string => {
  let position = nameClass + " nextSlide";

  if (mapIndex === principalIndex) {
    position = nameClass + " activeSlide";
  }

  if (
    mapIndex === principalIndex - 1 ||
    (principalIndex === 0 && mapIndex === arr.length - 1)
  ) {
    position = nameClass + " lastSlide";
  }

  return position;
};
