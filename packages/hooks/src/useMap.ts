import { useRef } from 'react';

export const useMap = <K, V>() => {
  const ref = useRef<Map<K, V> | null>(null);
  
  if (ref.current === null) {
    ref.current = new Map<K, V>()
  }
  
  return ref.current;
}