import { Grid } from '@vega-ui/utils';
import { useRef } from 'react';

export const useGrid = <N = HTMLElement, K = string>(): Grid<N, K> => {
  const ref = useRef<Grid<N, K> | null>(null);
  
  if (ref.current === null) {
    ref.current = new Grid<N, K>()
  }
  
  return ref.current;
}