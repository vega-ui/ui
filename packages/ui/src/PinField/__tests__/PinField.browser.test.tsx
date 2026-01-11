import { ComponentProps, FC, FormEvent } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';

import { PinField } from '../PinField';
import { PinFieldHiddenInput, PinFieldSeparator, PinFieldSlot } from '../components';
import { userEvent } from 'vitest/browser';

afterEach(cleanup);

const TESTID_ROOT = 'pinfield';
const TESTID_INPUT = 'hidden-input';
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
          <PinFieldHiddenInput name={name} data-testid={TESTID_INPUT} />
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
    
    it('renders root, hidden input, slots, and separator', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getInput(r)).toBeInTheDocument();
      
      for (const slot of getSlots(r)) {
        await expect.element(slot).toBeInTheDocument();
      }
      
      await expect.element(getSeparator(r)).toBeInTheDocument();
    });
    
    it('hidden input receives disabled while disabled', async () => {
      r.rerender(<PinFieldTest maxLength={4} disabled />);
      await expect.element(getInput(r)).toBeDisabled();
    });
    
    it('hidden input exposes invalid state when PinField is in error', async () => {
      r.rerender(<PinFieldTest maxLength={4} error />);
      await expect.element(getInput(r)).toHaveAttribute('aria-invalid', 'true');
      await expect.element(getInput(r)).toHaveAttribute('data-error', 'true');
    });
    
    it('pointer down on slot focuses hidden input', async () => {
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
    
    it('input event updates hidden input value', async () => {
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
    
    it('does not focus or sync on slot pointer down when disabled', async () => {
      r.rerender(<PinFieldTest maxLength={4} disabled />);
      
      fireEvent.pointerDown(getSlot1(r));
      await expect.element(getInput(r)).not.toHaveFocus();
    });
  });
  
  describe('Edge Cases', () => {
    it('submits value via form (hidden input contributes)', async () => {
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
      
      it('hidden input remains a textbox', async () => {
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
    });
    
    describe('keyboard', () => {
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
      it('pointer down on slot moves focus to hidden input', async () => {
        const r = render(<PinFieldTest maxLength={4} />);
        
        fireEvent.pointerDown(getSlot2(r));
        await expect.element(getInput(r)).toHaveFocus();
      });
    });
  });
});