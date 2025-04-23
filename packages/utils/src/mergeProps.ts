import { csx } from '@adara-cs/utils/csx.ts';
import { mergeRefs } from '@adara-cs/utils/mergeRefs.ts';
import { Ref } from 'react';

/**
 * Merges multiple props objects together into a single props object.
 *
 * - ✅ Event handlers (`onClick`, `onChange`, etc.) are chained in order of appearance.
 * - ✅ `className` values are concatenated with space.
 * - ✅ `id` is deduplicated: the first defined value is preserved.
 * - ✅ All other props are shallow-merged, with the last one winning.
 *
 * This function is especially useful for composing component props,
 * e.g., merging parent and child props in polymorphic or slot-based components.
 *
 * @template T - Type of the props object.
 * @param {...T[]} args - One or more props objects to merge together.
 * @returns {T} - A new object containing the merged props.
 *
 * @example
 * const props = mergeProps(
 *   { className: 'btn', onClick: () => console.log('base') },
 *   { className: 'primary', onClick: () => console.log('override') }
 * );
 *
 * // props.className === 'btn primary'
 * // props.onClick calls both handlers
 */
export function mergeProps<T extends Record<string, unknown>>(...args: T[]): T {
  const result: Record<string, unknown> = {};

  for (const props of args) {
    for (const key in props) {
      const newValue = props[key];
      const existingValue = result[key];

      if (
        typeof existingValue === 'function' &&
        typeof newValue === 'function' &&
        /^on[A-Z]/.test(key)
      ) {
        result[key] = (...args: unknown[]) => {
          existingValue(...args);
          newValue(...args);
        };
        continue;
      }

      if (key === 'ref') {
        result[key] = mergeRefs([existingValue as Ref<unknown>, newValue as Ref<unknown>])
        continue
      }

      if (key === 'style' && typeof existingValue === 'object' && typeof newValue === 'object') {
        result[key] = {
          ...existingValue,
          ...newValue,
        }
        continue;
      }

      if (key === 'className') {
        result[key] = csx(existingValue as string, newValue as string);
        continue;
      }

      if (key === 'id') {
        result[key] = existingValue ?? newValue;
        continue;
      }

      result[key] = newValue;
    }
  }

  return result as T;
}