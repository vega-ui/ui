import { RefObject, useEffect, useRef } from 'react';

export type UseResizeObserverOptions = {
  box?: ResizeObserverBoxOptions;
};

export function useResizeObserver<T extends Element>(
  ref: RefObject<T | null>,
  callback: (entry: ResizeObserverEntry) => void,
  options?: UseResizeObserverOptions,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => callbackRef.current(entry));
    });
    
    observer.observe(el, {
      box: options?.box ?? 'content-box',
    });
    
    return () => observer.disconnect();
  }, [ref, options?.box]);
}
