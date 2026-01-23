import { useCallback, useRef } from 'react';

export const useRefMap = <K, E extends HTMLElement | null>(defaultMap?: Map<K, E>) => {
  const map = useRef<Map<K, E>>(defaultMap ?? new Map())
  
  const itemRef = useCallback((key: K) => (element: E) => {
    map.current.set(key, element)
  }, [])
  
  const removeItemRef = useCallback((key: K) => {
    map.current.delete(key)
  }, [])
  
  const getItem = useCallback((key: K): E | undefined => map.current.get(key), [])
  
  return {
    map,
    itemRef,
    removeItemRef,
    getItem,
  }
}