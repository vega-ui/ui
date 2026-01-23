import { RefObject, useEffect, useRef } from 'react';

export type UseMutationObserverOptions = MutationObserverInit;

export function useMutationObserver<T extends Node>(
  ref: RefObject<T | null>,
  callback: (mutations: MutationRecord[], observer: MutationObserver) => void,
  options?: UseMutationObserverOptions,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  
  useEffect(() => {
    const target = ref.current;
    if (!target || typeof MutationObserver === 'undefined') return;
    
    const observer = new MutationObserver((mutations) => {
      callbackRef.current(mutations, observer);
    });
    
    observer.observe(target, options ?? { childList: true });
    
    return () => observer.disconnect();
  }, [
    ref,
    options?.attributes,
    options?.attributeFilter,
    options?.attributeOldValue,
    options?.characterData,
    options?.characterDataOldValue,
    options?.childList,
    options?.subtree,
  ]);
}