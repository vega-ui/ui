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
    // options itself is intentionally not a dependency: its fields are listed one by one,
    // so inline options objects don't reconnect the observer on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
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