export const getSliceArraySorted = <T>(arr: T[], count: number): T[] => {
  return arr
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};
