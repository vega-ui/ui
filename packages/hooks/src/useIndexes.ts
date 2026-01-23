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
  
  const shift = useCallback(() => {
    setIndexes((prev) => {
      const start = prev[0] + indexesShift;
      return getOffsetIndexes(start, -1, size);
    });
  }, [indexesShift, size]);
  
  const push = useCallback(() => {
    setIndexes((prev) => {
      const end = prev[prev.length - 1] - indexesShift;
      return getOffsetIndexes(end, 1, size);
    });
  }, [indexesShift, size]);
  
  const reset = useCallback((s = start) => {
    setIndexes(getOffsetIndexes(s, startDir, size))
  }, [start, startDir, size])
  
  return {
    indexes,
    push,
    shift,
    reset,
  }
}