import { useCallback, useState } from 'react';
import { getOffsetIndexes } from '@vega-ui/utils';

export interface UseIndexesOptions {
  start: number
  startDir: -1 | 1
  size: number
  shift: number
}

export const useIndexes = (options: UseIndexesOptions) => {
  const { start, startDir, shift: indexesShift, size } = options
  const [indexes, setIndexes] = useState<number[]>(getOffsetIndexes(start, startDir, size))
  
  const shift = useCallback(() => {
    const start = indexes[0] + indexesShift
    setIndexes(getOffsetIndexes(start, -1, size))
  }, [indexes, indexesShift, size])
  
  const push = useCallback(() => {
    const end = indexes[indexes.length - 1] - indexesShift
    setIndexes(getOffsetIndexes(end, 1, size))
  }, [indexes, indexesShift, size])
  
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