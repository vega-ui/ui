import { ComponentProps, FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { NumberField } from '../NumberField';
import { NumberFieldDecrementButton } from '../components/NumberFieldDecrementButton';
import { NumberFieldIncrementButton } from '../components/NumberFieldIncrementButton';
import { NumberFieldInput } from '../components/NumberFieldInput';

afterEach(cleanup);

const TESTID_DECREMENT = 'decrement';
const TESTID_INCREMENT = 'increment';
const TESTID_INPUT = 'input';

const NumberFieldTest: FC<Partial<ComponentProps<typeof NumberField>>> = (props) => {
  return (
    <NumberField {...props}>
      <NumberFieldDecrementButton square aria-label='Decrease' data-testid={TESTID_DECREMENT} />
      <NumberFieldInput data-testid={TESTID_INPUT} />
      <NumberFieldIncrementButton square aria-label='Increase' data-testid={TESTID_INCREMENT} />
    </NumberField>
  );
};

const getDecrement = (r: RenderResult) => r.getByTestId(TESTID_DECREMENT);
const getIncrement = (r: RenderResult) => r.getByTestId(TESTID_INCREMENT);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

describe('NumberField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledNumberFieldTest: FC<Partial<ComponentProps<typeof NumberField>>> = (props) => {
        const [value, setValue] = useState(NaN);

        return (
          <>
            <NumberField {...props} value={value} onChangeValue={setValue}>
              <NumberFieldDecrementButton square aria-label='Decrease' data-testid={TESTID_DECREMENT} />
              <NumberFieldInput data-testid={TESTID_INPUT} />
              <NumberFieldIncrementButton square aria-label='Increase' data-testid={TESTID_INCREMENT} />
            </NumberField>
            <button type='button' onClick={() => setValue(10)}>Fill</button>
          </>
        );
      };

      it('keeps the typed value that reaches max', async () => {
        cleanup();
        const r = render(<ControlledNumberFieldTest max={10} />);

        await userEvent.type(getInput(r), '10');

        await expect.element(getInput(r)).toHaveValue('10');
        await expect.element(getIncrement(r)).toBeDisabled();
      });

      it('disables increment for a max value set outside', async () => {
        cleanup();
        const r = render(<ControlledNumberFieldTest max={10} />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getIncrement(r)).toBeDisabled();
      });

      it('shows a value set outside', async () => {
        cleanup();
        const r = render(<ControlledNumberFieldTest />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(r)).toHaveValue('10');
      });

      it('dispatches input on every edit the parent accepts', async () => {
        cleanup();
        const r = render(<ControlledNumberFieldTest />);
        const onInput = vi.fn();
        getInput(r).addEventListener('input', onInput);

        await userEvent.type(getInput(r), '12');

        expect(onInput).toHaveBeenCalledTimes(2);
      });

      it('steps the controlled value', async () => {
        cleanup();
        const r = render(<ControlledNumberFieldTest />);

        await userEvent.click(getIncrement(r));
        await userEvent.click(getIncrement(r));

        await expect.element(getInput(r)).toHaveValue('1');
      });
    });

    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<NumberFieldTest />);
    });
    
    it('dispatches change once the user leaves a number they typed, but not again after a step that already did', async () => {
      const input = getInput(r);
      const onChange = vi.fn();
      input.addEventListener('change', onChange);

      await userEvent.type(input, '12');
      await userEvent.tab();

      expect(onChange).toHaveBeenCalledOnce();

      await userEvent.click(input);
      await userEvent.keyboard('{ArrowUp}');
      await userEvent.tab();

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('calls user onInput handler when input changes via controls', async () => {
      const onInput = vi.fn();
      
      r.rerender(<NumberFieldTest onInput={onInput} />);
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(getInput(r)).toHaveValue('0'));
      
      await waitFor(() => expect(onInput).toHaveBeenCalled());
    });
    
    describe('wheel', () => {
      it('keeps the page from scrolling while the wheel steps the focused field', async () => {
        const input = getInput(r);
        input.focus();

        const notPrevented = fireEvent.wheel(input, { deltaY: -10 });

        expect(notPrevented).toBe(false);
        await expect.element(input).toHaveValue('0');
      });

      it('leaves the value and the page scroll alone without focus', async () => {
        const input = getInput(r);

        const notPrevented = fireEvent.wheel(input, { deltaY: -10 });

        expect(notPrevented).toBe(true);
        await expect.element(input).toHaveValue('');
      });
    });
    
    it('disables everything when disabled=true', async () => {
      r.rerender(<NumberFieldTest disabled />);
      
      await expect.element(getInput(r)).toBeDisabled();
      await expect.element(getIncrement(r)).toBeDisabled();
      await expect.element(getDecrement(r)).toBeDisabled();
    });
    
    it('clamps by min on decrement', async () => {
      r.rerender(<NumberFieldTest min={-1} max={10} step={5} />);
      
      const input = getInput(r);
      
      await userEvent.click(getDecrement(r));
      await expect.element(input).toHaveValue('-1')
      
      await waitFor(() => {
        expect(getDecrement(r)).toBeDisabled();
      })
    });
  });
  
  describe('Edge Cases', () => {
    it('keeps the value when the onClick of a step button prevents the default', async () => {
      const onChangeValue = vi.fn();
      const r = render(
        <NumberField defaultValue={5} onChangeValue={onChangeValue}>
          <NumberFieldDecrementButton square aria-label='Decrease' data-testid={TESTID_DECREMENT} onClick={(event) => event.preventDefault()} />
          <NumberFieldInput data-testid={TESTID_INPUT} />
          <NumberFieldIncrementButton square aria-label='Increase' data-testid={TESTID_INCREMENT} onClick={(event) => event.preventDefault()} />
        </NumberField>,
      );

      await userEvent.click(getIncrement(r));
      await userEvent.click(getDecrement(r));

      expect(getInput(r)).toHaveValue('5');
      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('does not step a read-only input with the arrows or the wheel, and disables the buttons, like a native number input', async () => {
      const onChangeValue = vi.fn();
      const r = render(
        <NumberField defaultValue={5} onChangeValue={onChangeValue}>
          <NumberFieldDecrementButton square aria-label='Decrease' data-testid={TESTID_DECREMENT} />
          <NumberFieldInput data-testid={TESTID_INPUT} readOnly />
          <NumberFieldIncrementButton square aria-label='Increase' data-testid={TESTID_INCREMENT} />
        </NumberField>,
      );
      getInput(r).focus();

      await userEvent.keyboard('{ArrowUp}');
      fireEvent.wheel(getInput(r), { deltaY: -10 });

      expect(getInput(r)).toHaveValue('5');
      expect(onChangeValue).not.toHaveBeenCalled();
      await expect.element(getIncrement(r)).toBeDisabled();
      await expect.element(getDecrement(r)).toBeDisabled();
    });

    it('does not submit the surrounding form on step button click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <NumberFieldTest />
        </form>
      );

      await userEvent.click(getIncrement(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('disables increment when the default value is at max', async () => {
      const r = render(
        <NumberField max={5} defaultValue={5}>
          <NumberFieldInput data-testid={TESTID_INPUT} />
          <NumberFieldIncrementButton square aria-label='Increase' data-testid={TESTID_INCREMENT} />
        </NumberField>,
      );
      
      await expect.element(getIncrement(r)).toBeDisabled();
    });
    
    it('enables the buttons again after the form is reset', async () => {
      const r = render(
        <form data-testid='form'>
          <NumberFieldTest max={5} />
        </form>,
      );
      
      await userEvent.type(getInput(r), '5');
      await expect.element(getIncrement(r)).toBeDisabled();
      
      (r.getByTestId('form') as HTMLFormElement).reset();
      
      await expect.element(getIncrement(r)).toBeEnabled();
    });

    it('keeps the arrow keys working with a user onKeyDown', async () => {
      const onKeyDown = vi.fn();
      const r = render(<NumberFieldTest onKeyDown={onKeyDown} />);
      const input = getInput(r);

      await userEvent.type(input, '3');
      await userEvent.keyboard('{ArrowUp}');

      await expect.element(input).toHaveValue('4');
      expect(onKeyDown).toHaveBeenCalled();
    });
  });
  
  describe('Accessibility', () => {
    describe('spinbutton', () => {
      it('exposes the input as a spinbutton with the current value', async () => {
        const r = render(<NumberFieldTest defaultValue={5} />);

        await expect.element(r.getByRole('spinbutton')).toHaveAttribute('aria-valuenow', '5');
      });

      it('does not announce bounds that were not set', async () => {
        const r = render(<NumberFieldTest />);

        await expect.element(getInput(r)).not.toHaveAttribute('aria-valuemin');
        await expect.element(getInput(r)).not.toHaveAttribute('aria-valuemax');
      });
    });
  });
});