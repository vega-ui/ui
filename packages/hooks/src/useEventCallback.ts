import { useCallback, useInsertionEffect, useRef } from 'react';

const renderGuard = () => {
  throw new Error('useEventCallback: the handler must not be called during render.');
};

/**
 * Returns a function with a stable identity that always calls the latest `fn`.
 *
 * For event handlers only: the wrapped function is non-reactive by design and
 * must never be called during render (throws in development if it is).
 * Functions used while rendering should use `useCallback` with honest deps instead.
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R;
export function useEventCallback<Args extends unknown[], R>(
  fn?: (...args: Args) => R,
): (...args: Args) => R | undefined;
export function useEventCallback<Args extends unknown[], R>(
  fn?: (...args: Args) => R,
): (...args: Args) => R | undefined {
  const ref = useRef<((...args: Args) => R) | undefined>(
    process.env.NODE_ENV === 'production' ? fn : (renderGuard as never),
  );

  useInsertionEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Args) => ref.current?.(...args), []);
}
