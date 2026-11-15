import type { Ref, RefCallback } from 'react';

export const mergeRefs = <Value = unknown>(
  refs: Array<Ref<Value> | undefined | null>
): RefCallback<Value> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null && typeof ref === 'object') {
        ref.current = value;
      }
    });
  };
}