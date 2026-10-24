import { useCallback, useState } from 'react';
import { getOffsetIndexes } from '@vega-ui/utils';

export interface UseIndexesOptions {
  start: number
  startDir: -1 | 1
  size: number
  shift: number
}

export const useIndexes = ({
  start,
  startDir,
  shift: indexesShift,
  size,
}: UseIndexesOptions) => {
  const [indexes, setIndexes] = useState<number[]>(getOffsetIndexes(start, startDir, size))
  
  const extend = useCallback((dir: -1 | 1) => {
    setIndexes((prev) => {
      if (dir > 0) return [...prev, ...getOffsetIndexes(prev[prev.length - 1] + 1, 1, indexesShift)];
      return [...getOffsetIndexes(prev[0] - indexesShift, 1, indexesShift), ...prev];
    });
  }, [indexesShift]);
  
  const center = useCallback((index: number) => {
    setIndexes(getOffsetIndexes(index - Math.floor(size / 2), 1, size));
  }, [size]);
  
  const reset = useCallback((s = start) => {
    setIndexes(getOffsetIndexes(s, startDir, size))
  }, [start, startDir, size])
  
  return {
    indexes,
    extend,
    center,
    reset,
  }
}