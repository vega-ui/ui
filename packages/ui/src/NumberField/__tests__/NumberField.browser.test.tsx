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

const PLACEHOLDER = '0';

const NumberFieldTest: FC<Partial<ComponentProps<typeof NumberField>>> = (props) => {
  return (
    <NumberField {...props}>
      <NumberFieldDecrementButton data-testid={TESTID_DECREMENT} />
      <NumberFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
      <NumberFieldIncrementButton data-testid={TESTID_INCREMENT} />
    </NumberField>
  );
};

const getDecrement = (r: RenderResult) => r.getByTestId(TESTID_DECREMENT);
const getIncrement = (r: RenderResult) => r.getByTestId(TESTID_INCREMENT);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

describe('NumberField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledNumberFieldTest: FC<Partial<ComponentProps<typeof NumberField>> & { accept?(value: number): boolean }> = ({ accept = () => true, ...props }) => {
        const [value, setValue] = useState(NaN);

        return (
          <>
            <NumberField {...props} value={value} onChangeValue={(next) => accept(next) && setValue(next)}>
              <NumberFieldDecrementButton data-testid={TESTID_DECREMENT} />
              <NumberFieldInput data-testid={TESTID_INPUT} />
              <NumberFieldIncrementButton data-testid={TESTID_INCREMENT} />
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

      it('reverts a keystroke the parent rejects', async () => {
        cleanup();
        const r = render(<ControlledNumberFieldTest accept={(value) => !(value > 5)} />);

        await userEvent.type(getInput(r), '57');

        await expect.element(getInput(r)).toHaveValue('5');
      });

      it('keeps calling onChange of the input', async () => {
        cleanup();
        const onChange = vi.fn();
        const r = render(
          <NumberField>
            <NumberFieldInput data-testid={TESTID_INPUT} onChange={onChange} />
          </NumberField>,
        );

        await userEvent.type(getInput(r), '1');

        expect(onChange).toHaveBeenCalled();
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
    
    it('renders input and controls', async () => {
      await expect.element(getInput(r)).toBeInTheDocument();
      await expect.element(getDecrement(r)).toBeInTheDocument();
      await expect.element(getIncrement(r)).toBeInTheDocument();
    });
    
    it('renders placeholder', async () => {
      await expect.element(getInput(r)).toHaveAttribute('placeholder', PLACEHOLDER);
    });
    
    it('increments from empty to 0 by default', async () => {
      const input = getInput(r);
      
      await expect.element(input).toHaveValue('');
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('0'));
    });
    
    it('decrements from empty to 0 by default', async () => {
      const input = getInput(r);
      
      await expect.element(input).toHaveValue('');
      
      await userEvent.click(getDecrement(r));
      await waitFor(() => expect(input).toHaveValue('0'));
    });
    
    it('increments by step', async () => {
      const input = getInput(r);
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('0'));
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('1'));
    });
    
    it('decrements by step', async () => {
      const input = getInput(r);
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('0'));
      
      await userEvent.click(getDecrement(r));
      await waitFor(() => expect(input).toHaveValue('-1'));
    });
    
    it('calls user onInput handler when input changes via controls', async () => {
      const onInput = vi.fn();
      
      r.rerender(<NumberFieldTest onInput={onInput} />);
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(getInput(r)).toHaveValue('0'));
      
      await waitFor(() => expect(onInput).toHaveBeenCalled());
    });
    
    describe('wheel', () => {
      it('wheel up increments when changeOnWheel=true', async () => {
        const input = getInput(r);
        input.focus();
        
        fireEvent.wheel(input, { deltaY: -10 });
        
        await waitFor(() => {
          expect(input).toHaveValue('0');
        });
      });
      
      it('wheel down decrements when changeOnWheel=true', async () => {
        const input = getInput(r);
        input.focus();
        
        fireEvent.wheel(input, { deltaY: 10 });
        
        await waitFor(() => {
          expect(input).toHaveValue('0');
        });
      });
      
      it('does not change value when changeOnWheel=false', async () => {
        r.rerender(<NumberFieldTest changeOnWheel={false} />);
        const input = getInput(r);
        
        input.focus();
        
        fireEvent.wheel(input, { deltaY: -10 });
        await expect.element(input).toHaveValue('');
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
    
    it('disables decrement at min', async () => {
      r.rerender(<NumberFieldTest min={0} max={10} step={1} />);
      
      const input = getInput(r);
      
      await userEvent.click(getIncrement(r));
      await expect.element(input).toHaveValue('0')
      await waitFor(() => {
        expect(getDecrement(r)).toBeDisabled();
      })
    });
    
    it('disables increment at max', async () => {
      r.rerender(<NumberFieldTest min={0} max={1} step={1} />);
      
      const input = getInput(r);
      
      await userEvent.click(getIncrement(r));
      await expect.element(input).toHaveValue('0')
      
      await userEvent.click(getIncrement(r));
      await expect.element(input).toHaveValue('1')
      
      await waitFor(() => {
        expect(getIncrement(r)).toBeDisabled();
      })
    });
    
    it('clamps by max on increment', async () => {
      r.rerender(<NumberFieldTest min={0} max={1} step={2} />);
      
      const input = getInput(r);
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('0'));
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('1'));
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

    it('uses min instead of 0 when incrementing from empty and min is set', async () => {
      const r = render(<NumberFieldTest min={5} />);
      const input = getInput(r);
      
      await userEvent.click(getIncrement(r));
      await waitFor(() => expect(input).toHaveValue('5'));
    });
    
    it('uses min instead of 0 when decrementing from empty and min is set', async () => {
      const r = render(<NumberFieldTest min={5} />);
      const input = getInput(r);
      
      await userEvent.click(getDecrement(r));
      await waitFor(() => expect(input).toHaveValue('5'));
    });
    
    it('disables increment when the default value is at max', async () => {
      const r = render(
        <NumberField max={5} defaultValue={5}>
          <NumberFieldInput data-testid={TESTID_INPUT} />
          <NumberFieldIncrementButton data-testid={TESTID_INCREMENT} />
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

    it('restores defaultValue after the form is reset', async () => {
      const r = render(
        <form data-testid='form'>
          <NumberFieldTest defaultValue={3} />
        </form>,
      );

      await expect.element(getInput(r)).toHaveValue('3');
      await userEvent.click(getIncrement(r));
      await expect.element(getInput(r)).toHaveValue('4');

      (r.getByTestId('form') as HTMLFormElement).reset();

      await expect.element(getInput(r)).toHaveValue('3');
    });

    it('keeps the precision of a fractional step', async () => {
      const r = render(<NumberFieldTest step={0.1} />);
      const input = getInput(r);

      await userEvent.type(input, '0.7');
      await userEvent.keyboard('{ArrowUp}');
      await expect.element(input).toHaveValue('0.8');

      await userEvent.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}{ArrowDown}');
      await expect.element(input).toHaveValue('1');
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
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<NumberFieldTest min={1} max={9} />);
      });
      
      it('sets aria-valuemin on input', async () => {
        await expect.element(getInput(r)).toHaveAttribute('aria-valuemin', '1');
      });
      
      it('sets aria-valuemax on input', async () => {
        await expect.element(getInput(r)).toHaveAttribute('aria-valuemax', '9');
      });
    });
    
    describe('roles', () => {
      it('input is exposed as textbox', async () => {
        const r = render(<NumberFieldTest />);
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
    });
    
    describe('keyboard', () => {
      it('ArrowUp increments from empty to 0', async () => {
        const r = render(<NumberFieldTest />);
        const input = getInput(r);
        
        await userEvent.click(input);
        
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => expect(input).toHaveValue('0'));
      });
      
      it('ArrowDown decrements from empty to 0', async () => {
        const r = render(<NumberFieldTest />);
        const input = getInput(r);
        
        await userEvent.click(input);
        
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => expect(input).toHaveValue('0'));
      });
      
      it('ArrowUp increments by step', async () => {
        const r = render(<NumberFieldTest />);
        const input = getInput(r);
        
        await userEvent.click(input);
        
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => expect(input).toHaveValue('0'));
        
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => expect(input).toHaveValue('1'));
      });
      
      it('ArrowDown decrements by step', async () => {
        const r = render(<NumberFieldTest />);
        const input = getInput(r);
        
        await userEvent.click(input);
        
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => expect(input).toHaveValue('0'));
        
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => expect(input).toHaveValue('-1'));
      });
      
      it('ArrowUp does not exceed max', async () => {
        const r = render(<NumberFieldTest min={0} max={1} step={2} />);
        const input = getInput(r);
        
        await userEvent.click(input);
        
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => expect(input).toHaveValue('0'));
        
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => expect(input).toHaveValue('1'));
      });
      
      it('ArrowDown does not go below min', async () => {
        const r = render(<NumberFieldTest min={-1} max={10} step={5} />);
        const input = getInput(r);
        
        await userEvent.click(input);
        
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => expect(input).toHaveValue('-1'));
        
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => expect(input).toHaveValue('-1'));
      });
    });
  });
});