 import { useSyncExternalStore } from 'react';

const subscribe = (name: string) => (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [name] });

  return () => observer.disconnect();
};

export const useRootAttribute = (name: string) => useSyncExternalStore(
  subscribe(name),
  () => document.documentElement.getAttribute(name),
  () => null,
);
