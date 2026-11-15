import { ComponentProps, FC, FormEvent, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';

import { PinField } from '../PinField';
import { PinFieldInput, PinFieldSeparator, PinFieldSlot } from '../components';
import { userEvent } from 'vitest/browser';

afterEach(cleanup);

const TESTID_INPUT = 'input';

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
    <PinField placeholder={placeholder} {...props}>
      {children ?? (
        <>
          <PinFieldInput name={name} data-testid={TESTID_INPUT} />
          <PinFieldSlot data-testid={SLOT_0} index={0} />
          <PinFieldSlot data-testid={SLOT_1} index={1} />
          <PinFieldSeparator />
          <PinFieldSlot data-testid={SLOT_2} index={2} />
          <PinFieldSlot data-testid={SLOT_3} index={3} />
        </>
      )}
    </PinField>
  );
};

const ControlledPinFieldTest: FC<{ initialValue?: string; onChangeValue?(value: string): void }> = ({
  initialValue = '',
  onChangeValue,
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <PinFieldTest
        maxLength={4}
        value={value}
        onChangeValue={(next) => {
          onChangeValue?.(next);
          setValue(next);
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

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

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
    
    it('input receives disabled while disabled', async () => {
      r.rerender(<PinFieldTest maxLength={4} disabled />);
      await expect.element(getInput(r)).toBeDisabled();
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
    
    it('input event updates slot text content', async () => {
      const input = getInput(r);
      
      focusInput(input);
      setValue(input, VALUE_12);
      
      await expect.element(getSlot0(r)).toHaveTextContent('1');
      await expect.element(getSlot1(r)).toHaveTextContent('2');
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
    
    it('dispatches change once the user leaves a code they typed', async () => {
      const onChange = vi.fn();
      getInput(r).addEventListener('change', onChange);

      await userEvent.type(getInput(r), '12');
      await userEvent.tab();

      expect(onChange).toHaveBeenCalledOnce();
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

    it('keeps calling onChange of the input on every edit of a controlled code', async () => {
      const onChange = vi.fn();
      const Controlled = () => {
        const [value, setValue] = useState('');

        return (
          <PinFieldTest maxLength={4} value={value} onChangeValue={setValue}>
            <PinFieldInput data-testid={TESTID_INPUT} onChange={onChange} />
          </PinFieldTest>
        );
      };
      r.unmount();
      r = render(<Controlled />);

      await userEvent.type(getInput(r), '123');

      await expect.element(getInput(r)).toHaveValue('123');
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('updates the slots when the controlled value is changed outside', async () => {
      r.unmount();
      r = render(<ControlledPinFieldTest initialValue={VALUE_1234} />);

      await userEvent.click(r.getByRole('button', { name: 'Clear' }));

      await expect.element(getInput(r)).toHaveValue('');
      await expect.element(getSlot0(r)).toHaveTextContent(PLACEHOLDER[0]);
      await expect.element(getSlot3(r)).toHaveTextContent(PLACEHOLDER[3]);
    });
  });
  
  describe('Edge Cases', () => {
    it('shows bullets in the slots while the input is a password and the characters once it is not', async () => {
      const PasswordPinField = ({ type }: { type: string }) => (
        <PinFieldTest placeholder='----'>
          <PinFieldInput data-testid={TESTID_INPUT} type={type} />
          <PinFieldSlot data-testid={SLOT_0} index={0} />
          <PinFieldSlot data-testid={SLOT_1} index={1} />
          <PinFieldSlot data-testid={SLOT_2} index={2} />
          <PinFieldSlot data-testid={SLOT_3} index={3} />
        </PinFieldTest>
      );
      const r = render(<PasswordPinField type='password' />);

      await userEvent.type(getInput(r), VALUE_12);
      await expect.poll(() => getSlots(r).map((slot) => slot.textContent)).toEqual(['•', '•', '-', '-']);

      r.rerender(<PasswordPinField type='text' />);
      await expect.poll(() => getSlots(r).map((slot) => slot.textContent)).toEqual(['1', '2', '-', '-']);
    });

    it('keeps the caret when the onPointerDown of a slot prevents the default', async () => {
      const r = render(
        <PinField maxLength={4}>
          <PinFieldInput data-testid={TESTID_INPUT} />
          <PinFieldSlot data-testid={SLOT_0} index={0} />
          <PinFieldSlot data-testid={SLOT_1} index={1} onPointerDown={(event) => event.preventDefault()} />
          <PinFieldSlot data-testid={SLOT_2} index={2} />
          <PinFieldSlot data-testid={SLOT_3} index={3} />
        </PinField>,
      );
      await userEvent.type(getInput(r), '123');

      fireEvent.pointerDown(getSlot1(r));

      await expect.element(getSlot3(r)).toHaveAttribute('data-caret', 'true');
      await expect.element(getSlot1(r)).toHaveAttribute('data-caret', 'false');
    });

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
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PinFieldTest maxLength={4} />);
      });
      
      it('exposes the placeholder on the input', async () => {
        await expect.element(getInput(r)).toHaveAttribute('placeholder', PLACEHOLDER);
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
    });
  });
});