import { useRef } from 'react';
import { BiMap } from '@vega-ui/utils';

export function useBiMap<K, V>(initial?: ReadonlyArray<readonly [K, V]>) {
  const ref = useRef<BiMap<K, V> | null>(null);
  
  if (!ref.current) {
    ref.current = new BiMap<K, V>(initial);
  }
  
  return ref.current;
}