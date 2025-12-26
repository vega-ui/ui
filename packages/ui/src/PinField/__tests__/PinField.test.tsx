import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'storybook/test';

import { PinField } from '../PinField';
import { PinFieldHiddenInput, PinFieldHiddenInputProps, PinFieldSeparator, PinFieldSlot } from '../components';

const flush = async () => {
  await act(async () => {
    vi.runOnlyPendingTimers();
  });
};

const getInput = () => screen.getByRole('textbox') as HTMLInputElement;

const renderAll = async ({
 maxLength = 4,
 placeholder = '----',
 disabled,
 error,
 size,
 withSeparator = false,
 inputProps,
}: {
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  withSeparator?: boolean;
  inputProps?: PinFieldHiddenInputProps;
} = {}) => {
  render(
    <PinField
      maxLength={maxLength}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      size={size}
      data-testid='root'
    >
      {Array.from({ length: maxLength }, (_, i) => (
        <PinFieldSlot key={i} index={i} data-testid={`slot-${i}`} />
      ))}
      {withSeparator ? <PinFieldSeparator data-testid='sep' /> : null}
      <PinFieldHiddenInput {...inputProps} />
    </PinField>,
  );
  
  const input = getInput();
  const slots = Array.from({ length: maxLength }, (_, i) => screen.getByTestId(`slot-${i}`) as HTMLDivElement);
  const sep = withSeparator ? (screen.getByTestId('sep') as HTMLDivElement) : null;
  
  return { input, slots, sep };
};

describe('PinField', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      return setTimeout(() => cb(Date.now()), 0);
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      clearTimeout(id);
    });
  });
  
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });
  
  it('renders root + hidden input + slots', async () => {
    const { input, slots } = await renderAll({ maxLength: 4 });
    expect(screen.getByTestId('root')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(slots).toHaveLength(4);
  });
  
  it('hidden input respects disabled', async () => {
    const { input, slots } = await renderAll({ disabled: true });
    expect(input.disabled).toBe(true);
    expect(slots[0].dataset.disabled).toBe('true');
  });
  
  it('hidden input respects aria-invalid and data-error', async () => {
    const { input, slots } = await renderAll({ error: true });
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.dataset.error).toBe('true');
    expect(slots[0].dataset.error).toBe('true');
  });
  
  it('hidden input respects maxLength and inputMode defaults to numeric', async () => {
    const { input } = await renderAll({ maxLength: 6 });
    expect(input.maxLength).toBe(6);
    expect(input.getAttribute('inputmode')).toBe('numeric');
  });
  
  it('slots show placeholder by index while empty', async () => {
    const { slots } = await renderAll({ maxLength: 4, placeholder: 'WXYZ' });
    expect(slots[0]).toHaveTextContent('W');
    expect(slots[1]).toHaveTextContent('X');
    expect(slots[2]).toHaveTextContent('Y');
    expect(slots[3]).toHaveTextContent('Z');
    expect(slots[0].dataset.placeholder).toBe('true');
  });
  
  it('typing updates value and slot characters', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4, placeholder: '----' });
    
    await user.click(input); // must focus (otherwise selectionStart can be null -> onInput returns)
    await user.type(input, '12');
    await flush();
    
    expect(input.value).toBe('12');
    expect(slots[0]).toHaveTextContent('1');
    expect(slots[1]).toHaveTextContent('2');
    expect(slots[2]).toHaveTextContent('-');
    expect(slots[3]).toHaveTextContent('-');
    expect(slots[0].dataset.placeholder).toBe('false');
  });
  
  it('typing clamps to maxLength (via input maxLength)', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await user.type(input, '123456');
    await flush();
    
    // userEvent respects maxLength in most envs; if Maskito also filters, it stays clamped
    expect(input.value.length).toBeLessThanOrEqual(4);
  });
  
  it('onFocus syncs active to value length', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await user.type(input, '12');
    await flush();
    
    fireEvent.blur(input);
    await flush();
    
    fireEvent.focus(input);
    await flush();
    
    // your onFocus -> syncActive(value.length) => caret at index 2
    expect(slots[2].dataset.caret).toBe('true');
    expect(slots[2].dataset.active).toBe('true');
  });
  
  it('blur clears active (-1) so no caret slot is true', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await flush();
    
    fireEvent.blur(input);
    await flush();
    
    expect(slots.some((s) => s.dataset.caret === 'true')).toBe(false);
  });
  
  it('slot pointerdown focuses input and activates that index', async () => {
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    fireEvent.pointerDown(slots[1]);
    await flush();
    
    waitFor(() => {
      expect(document.activeElement).toBe(input);
      expect(slots[1].dataset.caret).toBe('true');
      expect(slots[1].dataset.active).toBe('true');
    })
  });
  
  it('slot pointerdown is ignored when disabled', async () => {
    const { input, slots } = await renderAll({ maxLength: 4, disabled: true });
    
    fireEvent.pointerDown(slots[2]);
    await flush();
    
    expect(document.activeElement).not.toBe(input);
    expect(slots[2].dataset.caret).not.toBe('true');
  });
  
  it('ArrowLeft/Right moves active (clamped)', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await user.type(input, '1234');
    await flush();
    
    act(() => {
      input.setSelectionRange(2, 2);
      fireEvent.keyDown(input, { key: 'ArrowLeft' });
    });
    await flush();
    expect(slots[1].dataset.caret).toBe('true');
    
    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowRight' });
    });
    await flush();
    expect(slots[2].dataset.caret).toBe('true');
  });
  
  it('ArrowUp jumps to start, ArrowDown jumps to end of value', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await user.type(input, '12');
    await flush();
    
    act(() => {
      input.setSelectionRange(1, 1);
      fireEvent.keyDown(input, { key: 'ArrowUp' });
    });
    await flush();
    expect(slots[0].dataset.caret).toBe('true');
    
    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });
    await flush();
    expect(slots[2].dataset.caret).toBe('true');
  });
  
  it('select-all sets selectedAll=true and marks all slots active', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await user.type(input, '1234');
    await flush();
    
    act(() => {
      input.setSelectionRange(0, 4);
      fireEvent.select(input);
    });
    
    expect(slots.every((s) => s.dataset.active === 'true')).toBe(true);
  });
  
  it('select-all is false when selection is partial or empty', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { input, slots } = await renderAll({ maxLength: 4 });
    
    await user.click(input);
    await user.type(input, '12');
    await flush();
    
    act(() => {
      input.setSelectionRange(0, 1);
      fireEvent.select(input);
    });
    
    expect(slots.every((s) => s.dataset.active === 'true')).toBe(false);
    
    act(() => {
      fireEvent.input(input, { target: { value: '' } });
    });
    await flush();
    
    act(() => {
      input.setSelectionRange(0, 0);
      fireEvent.select(input);
    });
    
    expect(slots.every((s) => s.dataset.active === 'true')).toBe(false);
  });
  
  it('PinFieldSeparator renders with role=separator and uses provider size by default', async () => {
    const { sep } = await renderAll({ maxLength: 4, withSeparator: true, size: 'lg' });
    expect(sep).toBeInTheDocument();
    expect(sep?.getAttribute('role')).toBe('separator');
    expect(sep?.dataset.size).toBe('lg');
  });
  
  it('merges external handlers (onFocus/onBlur/onInput/onKeyDown/onSelect)', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    
    const onInput = vi.fn();
    const onKeyDown = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onSelect = vi.fn();
    
    const { input } = await renderAll({
      maxLength: 4,
      inputProps: { onInput, onKeyDown, onFocus, onBlur, onSelect },
    });
    
    await user.click(input);
    await flush();
    expect(onFocus).toHaveBeenCalledTimes(1);
    
    act(() => {
      fireEvent.input(input, { target: { value: '1' } });
    });
    await flush();
    expect(onInput).toHaveBeenCalledTimes(1);
    
    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    
    act(() => {
      input.setSelectionRange(0, 1);
      fireEvent.select(input);
    });
    waitFor(() => expect(onSelect).toHaveBeenCalledTimes(1))
    
    act(() => fireEvent.blur(input));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
