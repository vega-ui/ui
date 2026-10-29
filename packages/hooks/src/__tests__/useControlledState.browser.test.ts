import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';
import { useControlledState } from '../useControlledState';

describe('useControlledState', () => {
  it('starts from the default value when uncontrolled', async () => {
    const { result } = await renderHook(() => useControlledState<string>(undefined, 'a'));

    expect(result.current[0]).toBe('a');
  });

  it('updates its own value and calls onChange when uncontrolled', async () => {
    const onChange = vi.fn();
    const { result } = await renderHook(() => useControlledState<string>(undefined, 'a', onChange));

    await act(() => result.current[1]('b'));

    expect(result.current[0]).toBe('b');
    expect(onChange).toHaveBeenCalledExactlyOnceWith('b');
  });

  it('returns the controlled value', async () => {
    const { result } = await renderHook(() => useControlledState<string>('c', 'a'));

    expect(result.current[0]).toBe('c');
  });

  it('keeps the controlled value and calls onChange on set', async () => {
    const onChange = vi.fn();
    const { result } = await renderHook(() => useControlledState<string>('c', 'a', onChange));

    await act(() => result.current[1]('b'));

    expect(result.current[0]).toBe('c');
    expect(onChange).toHaveBeenCalledExactlyOnceWith('b');
  });

  it('follows the controlled value', async () => {
    const { result, rerender } = await renderHook((props?: { value: string }) => useControlledState<string>(props?.value ?? 'c', 'a'));

    await rerender({ value: 'd' });

    expect(result.current[0]).toBe('d');
  });

  it('calls the latest onChange', async () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result, rerender } = await renderHook((props?: { onChange: (value: string) => void }) =>
      useControlledState<string>(undefined, 'a', props?.onChange ?? first)
    );

    await rerender({ onChange: second });
    await act(() => result.current[1]('b'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledExactlyOnceWith('b');
  });

  it('keeps the setter identity across renders', async () => {
    const { result } = await renderHook(() => useControlledState<string>(undefined, 'a'));
    const setValue = result.current[1];

    await act(() => setValue('b'));

    expect(result.current[1]).toBe(setValue);
  });
});
