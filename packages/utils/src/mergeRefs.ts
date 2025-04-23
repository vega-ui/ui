import { Ref, RefCallback, RefObject } from 'react';

export const mergeRefs = <T = unknown>(
  refs: Array<Ref<T> | undefined | null>
): RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null && typeof ref === 'object') {
        (ref as RefObject<T | null>).current = value;
      }
    });
  };
}