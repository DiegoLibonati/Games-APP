export const getClassNamePosition = (
  nameClass,
  principalIndex,
  mapIndex,
  arr
) => {
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

  return { position };
};
