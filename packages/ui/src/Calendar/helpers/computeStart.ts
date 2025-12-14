export const computeStart = (
  start: number,
  currentIndex: number,
  targetIndex: number
): number => {
  const slot = currentIndex - start;
  return targetIndex - slot;
};