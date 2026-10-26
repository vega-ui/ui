import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useFormReset } from '../useFormReset';

const setup = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.defaultValue = '20';
  form.append(input);
  document.body.append(form);

  return { form, input };
};

describe('useFormReset', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('calls onReset when the form is reset', async () => {
    const { form, input } = setup();
    const onReset = vi.fn();
    await renderHook(() => useFormReset({ current: input }, onReset));

    form.reset();

    expect(onReset).toHaveBeenCalledOnce();
  });

  it('calls the latest onReset', async () => {
    const { form, input } = setup();
    const first = vi.fn();
    const second = vi.fn();
    const ref = { current: input };
    const { rerender } = await renderHook(({ onReset }) => useFormReset(ref, onReset), {
      initialProps: { onReset: first },
    });
    await rerender({ onReset: second });

    form.reset();

    expect(second).toHaveBeenCalledOnce();
    expect(first).not.toHaveBeenCalled();
  });

  it('stops calling onReset after unmount', async () => {
    const { form, input } = setup();
    const onReset = vi.fn();
    const { unmount } = await renderHook(() => useFormReset({ current: input }, onReset));

    await unmount();
    form.reset();

    expect(onReset).not.toHaveBeenCalled();
  });
});
