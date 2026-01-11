import { ComponentProps, FC } from 'react';
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
        
        fireEvent.wheel(input, { deltaY: -10 });
        
        await waitFor(() => {
          expect(input).toHaveValue('0');
        });
      });
      
      it('wheel down decrements when changeOnWheel=true', async () => {
        const input = getInput(r);
        
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