export const nearest = (array: readonly number[], x: number): number => {
  const n = array.length;
  if (n === 0) return -1;
  
  let lo = 0;
  let hi = n - 1;
  
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (array[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  
  if (lo === 0) return 0;
  if (lo === n) return n - 1;
  
  const prev = array[lo - 1];
  const next = array[lo];
  
  return x - prev <= next - x ? lo - 1 : lo;
};