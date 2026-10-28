import { ComponentProps, FC, FormEvent, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';

import { PinField } from '../PinField';
import { PinFieldInput, PinFieldSeparator, PinFieldSlot } from '../components';
import { userEvent } from 'vitest/browser';

afterEach(cleanup);

const TESTID_ROOT = 'pinfield';
const TESTID_INPUT = 'input';
const TESTID_SEPARATOR = 'separator';

const SLOT_0 = 'slot-0';
const SLOT_1 = 'slot-1';
const SLOT_2 = 'slot-2';
const SLOT_3 = 'slot-3';

const PIN_NAME = 'pin';
const PLACEHOLDER = '••••';

const VALUE_1 = '1';
const VALUE_12 = '12';
const VALUE_1234 = '1234';

const PinFieldTest: FC<ComponentProps<typeof PinField> & { name?: string; placeholder?: string }> = ({
 children,
 name = PIN_NAME,
 placeholder = PLACEHOLDER,
 ...props
}) => {
  return (
    <PinField data-testid={TESTID_ROOT} placeholder={placeholder} {...props}>
      {children ?? (
        <>
          <PinFieldInput name={name} data-testid={TESTID_INPUT} />
          <PinFieldSlot data-testid={SLOT_0} index={0} />
          <PinFieldSlot data-testid={SLOT_1} index={1} />
          <PinFieldSeparator data-testid={TESTID_SEPARATOR} />
          <PinFieldSlot data-testid={SLOT_2} index={2} />
          <PinFieldSlot data-testid={SLOT_3} index={3} />
        </>
      )}
    </PinField>
  );
};

const ControlledPinFieldTest: FC<{ initialValue?: string; onChangeValue?(value: string): void; accept?(value: string): boolean }> = ({
  initialValue = '',
  onChangeValue,
  accept = () => true,
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <PinFieldTest
        maxLength={4}
        value={value}
        onChangeValue={(next) => {
          onChangeValue?.(next);
          if (accept(next)) setValue(next);
        }}
      >
        <PinFieldInput data-testid={TESTID_INPUT} />
        <PinFieldSlot data-testid={SLOT_0} index={0} />
        <PinFieldSlot data-testid={SLOT_1} index={1} />
        <PinFieldSlot data-testid={SLOT_2} index={2} />
        <PinFieldSlot data-testid={SLOT_3} index={3} />
      </PinFieldTest>
      <button type='button' onClick={() => setValue('')}>Clear</button>
    </>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getSeparator = (r: RenderResult) => r.getByTestId(TESTID_SEPARATOR);

const getSlot0 = (r: RenderResult) => r.getByTestId(SLOT_0);
const getSlot1 = (r: RenderResult) => r.getByTestId(SLOT_1);
const getSlot2 = (r: RenderResult) => r.getByTestId(SLOT_2);
const getSlot3 = (r: RenderResult) => r.getByTestId(SLOT_3);
const getSlots = (r: RenderResult) => [getSlot0(r), getSlot1(r), getSlot2(r), getSlot3(r)];

const focusInput = (input: HTMLInputElement) => {
  input.focus();
  fireEvent.focus(input);
};

const setValue = (input: HTMLInputElement, value: string) => {
  fireEvent.input(input, { target: { value } });
};

const setCaret = (input: HTMLInputElement, pos: number) => {
  input.setSelectionRange(pos, pos);
};

const selectAll = (input: HTMLInputElement, len: number) => {
  input.setSelectionRange(0, len);
  fireEvent.select(input);
};

describe('PinField', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<PinFieldTest maxLength={4} />);
    });
    
    it('renders root, input, slots, and separator', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getInput(r)).toBeInTheDocument();
      
      for (const slot of getSlots(r)) {
        await expect.element(slot).toBeInTheDocument();
      }
      
      await expect.element(getSeparator(r)).toBeInTheDocument();
    });
    
    it('input receives disabled while disabled', async () => {
      r.rerender(<PinFieldTest maxLength={4} disabled />);
      await expect.element(getInput(r)).toBeDisabled();
    });
    
    it('input exposes invalid state when PinField is in error', async () => {
      r.rerender(<PinFieldTest maxLength={4} error />);
      await expect.element(getInput(r)).toHaveAttribute('aria-invalid', 'true');
      await expect.element(getInput(r)).toHaveAttribute('data-error', 'true');
    });
    
    it('pointer down on slot focuses input', async () => {
      fireEvent.pointerDown(getSlot1(r));
      await expect.element(getInput(r)).toHaveFocus();
    });
    
    it('pointer down on slot syncs caret to that slot index', async () => {
      await userEvent.type(getInput(r), '123')
      fireEvent.pointerDown(getSlot3(r));
      await expect.element(getSlot3(r)).toHaveAttribute('data-caret', 'true');
    });
    
    it('focus on input syncs active to end (caret at value length)', async () => {
      const input = getInput(r);
      
      setValue(input, VALUE_12);
      focusInput(input);
      
      await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');
    });
    
    it('input event updates input value', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_1234);
      
      await expect.element(input).toHaveValue(VALUE_1234);
    });
    
    it('input event updates slot text content', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_12);
      
      await expect.element(getSlot0(r)).toHaveTextContent('1');
      await expect.element(getSlot1(r)).toHaveTextContent('2');
    });
    
    it('ArrowLeft moves caret left', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_1234);
      setCaret(input, 3);
      
      fireEvent.keyDown(input, { key: 'ArrowLeft' });
      await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');
    });
    
    it('ArrowRight moves caret right', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_12);
      
      setCaret(input, 2);
      fireEvent.keyDown(input, { key: 'ArrowLeft' });
      await expect.element(getSlot1(r)).toHaveAttribute('data-caret', 'true');
      
      fireEvent.keyDown(input, { key: 'ArrowRight' });
      await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');
    });
    
    it('ArrowUp moves caret to start', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_12);
      
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      await expect.element(getSlot0(r)).toHaveAttribute('data-caret', 'true');
    });
    
    it('ArrowDown moves caret to end', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_12);
      
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');
    });
    
    it('blur resets active (no slot has caret)', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_1);
      
      await expect.element(getSlot1(r)).toHaveAttribute('data-caret', 'true');
      
      fireEvent.blur(input);
      
      for (const slot of getSlots(r)) {
        await expect.element(slot).toHaveAttribute('data-caret', 'false');
      }
    });
    
    it('select all sets all slots active', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_1234);
      
      selectAll(input, 4);
      
      for (const slot of getSlots(r)) {
        await expect.element(slot).toHaveAttribute('data-active', 'true');
      }
    });
    
    it('shows the controlled value in the slots', async () => {
      r.unmount();
      r = render(<ControlledPinFieldTest initialValue={VALUE_12} />);

      await expect.element(getSlot0(r)).toHaveTextContent('1');
      await expect.element(getSlot1(r)).toHaveTextContent('2');
    });

    it('calls onChangeValue with the typed value when controlled', async () => {
      const onChangeValue = vi.fn();
      r.unmount();
      r = render(<ControlledPinFieldTest onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(r), VALUE_12);

      expect(onChangeValue).toHaveBeenLastCalledWith(VALUE_12);
      await expect.element(getSlot1(r)).toHaveTextContent('2');
    });

    it('keeps the controlled value when a keystroke is rejected', async () => {
      r.unmount();
      r = render(<ControlledPinFieldTest accept={(next) => next !== VALUE_12} />);

      await userEvent.type(getInput(r), VALUE_12);

      await expect.element(getInput(r)).toHaveValue(VALUE_1);
      await expect.element(getSlot1(r)).toHaveTextContent(PLACEHOLDER[1]);
    });

    it('keeps calling onChange of the input', async () => {
      const onChange = vi.fn();
      r.rerender(
        <PinFieldTest maxLength={4}>
          <PinFieldInput data-testid={TESTID_INPUT} onChange={onChange} />
        </PinFieldTest>,
      );

      await userEvent.type(getInput(r), VALUE_1);

      expect(onChange).toHaveBeenCalledOnce();
    });

    it('updates the slots when the controlled value is changed outside', async () => {
      r.unmount();
      r = render(<ControlledPinFieldTest initialValue={VALUE_1234} />);

      await userEvent.click(r.getByRole('button', { name: 'Clear' }));

      await expect.element(getInput(r)).toHaveValue('');
      await expect.element(getSlot0(r)).toHaveTextContent(PLACEHOLDER[0]);
      await expect.element(getSlot3(r)).toHaveTextContent(PLACEHOLDER[3]);
    });

    it('Home moves caret to start', async () => {
      const input = getInput(r);

      focusInput(input);
      setValue(input, VALUE_12);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');

      fireEvent.keyDown(input, { key: 'Home' });
      await expect.element(getSlot0(r)).toHaveAttribute('data-caret', 'true');
    });

    it('End moves caret to end', async () => {
      const input = getInput(r);

      focusInput(input);
      setValue(input, VALUE_12);
      setCaret(input, 0);
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      fireEvent.keyDown(input, { key: 'End' });
      await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');
    });

    it('does not focus or sync on slot pointer down when disabled', async () => {
      r.rerender(<PinFieldTest maxLength={4} disabled />);
      
      fireEvent.pointerDown(getSlot1(r));
      await expect.element(getInput(r)).not.toHaveFocus();
    });
  });
  
  describe('Edge Cases', () => {
    it('submits value via form (input contributes)', async () => {
      const onSubmit = vi.fn((e: FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        expect(fd.get(PIN_NAME)).toBe(VALUE_1234);
      });
      
      const r = render(
        <form onSubmit={onSubmit}>
          <PinFieldTest maxLength={4} name={PIN_NAME} />
          <button type='submit'>Submit</button>
        </form>,
      );
      
      const input = getInput(r);
      await userEvent.type(input, '1234');
      
      await userEvent.click(r.getByRole('button', { name: 'Submit' }));
      
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      })
    });
    
    it('clears the slots after the form is reset', async () => {
      const r = render(
        <form data-testid='form'>
          <PinFieldTest maxLength={4} />
        </form>,
      );
      
      await userEvent.type(getInput(r), VALUE_12);
      await expect.element(getSlot0(r)).toHaveTextContent('1');
      
      (r.getByTestId('form') as HTMLFormElement).reset();
      
      await expect.element(getSlot0(r)).toHaveTextContent(PLACEHOLDER[0]);
      await expect.element(getSlot1(r)).toHaveTextContent(PLACEHOLDER[1]);
    });
    
    it('restores the default value after a reset button', async () => {
      const r = render(
        <form>
          <PinFieldTest maxLength={4} defaultValue={VALUE_12} />
          <button type='reset'>Reset</button>
        </form>,
      );

      await userEvent.type(getInput(r), '3');
      await userEvent.click(r.getByRole('button', { name: 'Reset' }));

      await expect.element(getInput(r)).toHaveValue(VALUE_12);
      await expect.element(getSlot2(r)).toHaveTextContent(PLACEHOLDER[2]);
    });

    it('shows the default value in the slots', async () => {
      const r = render(
        <PinFieldTest maxLength={4} defaultValue={VALUE_12}>
          <PinFieldInput data-testid={TESTID_INPUT} />
          <PinFieldSlot data-testid={SLOT_0} index={0} />
          <PinFieldSlot data-testid={SLOT_1} index={1} />
        </PinFieldTest>,
      );
      
      await expect.element(getSlot0(r)).toHaveTextContent('1');
      await expect.element(getSlot1(r)).toHaveTextContent('2');
    });
    
    it('limits the input to 4 characters without maxLength', async () => {
      const r = render(<PinFieldTest />);

      await expect.element(getInput(r)).toHaveAttribute('maxlength', '4');
    });

    it('does not set selectedAll when value is empty (select all on empty)', async () => {
      const r = render(<PinFieldTest maxLength={4} />);
      
      const input = getInput(r);
      input.setSelectionRange(0, 0);
      fireEvent.select(input);
      
      // First selected
      await expect.element(getSlot0(r)).toHaveAttribute('data-active', 'true');
      await expect.element(getSlot1(r)).toHaveAttribute('data-active', 'false');
      await expect.element(getSlot2(r)).toHaveAttribute('data-active', 'false');
      await expect.element(getSlot3(r)).toHaveAttribute('data-active', 'false');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PinFieldTest maxLength={4} />);
      });
      
      it('separator has role="separator"', async () => {
        await expect.element(getSeparator(r)).toHaveRole('separator');
      });
      
      it('exposes the placeholder on the input', async () => {
        await expect.element(getInput(r)).toHaveAttribute('placeholder', PLACEHOLDER);
      });

      it('input remains a textbox', async () => {
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
    });
    
    describe('keyboard', () => {
      it('leaves Shift+Arrow to extend the selection natively', async () => {
        const r = render(<PinFieldTest maxLength={4} />);
        const input = getInput(r);

        focusInput(input);
        setValue(input, VALUE_12);

        expect(fireEvent.keyDown(input, { key: 'ArrowLeft', shiftKey: true })).toBe(true);
        expect(fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true })).toBe(true);
      });

      it('Arrow keys update caret slot (left/right)', async () => {
        const r = render(<PinFieldTest maxLength={4} />);
        const input = getInput(r);
        
        focusInput(input);
        setValue(input, VALUE_12);
        setCaret(input, 2);
        
        fireEvent.keyDown(input, { key: 'ArrowLeft' });
        await expect.element(getSlot1(r)).toHaveAttribute('data-caret', 'true');
        
        fireEvent.keyDown(input, { key: 'ArrowRight' });
        await expect.element(getSlot2(r)).toHaveAttribute('data-caret', 'true');
      });
    });
    
    describe('focus', () => {
      it('pointer down on slot moves focus to input', async () => {
        const r = render(<PinFieldTest maxLength={4} />);
        
        fireEvent.pointerDown(getSlot2(r));
        await expect.element(getInput(r)).toHaveFocus();
      });
    });
  });
});