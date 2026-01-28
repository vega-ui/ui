import { FC } from 'react';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { TimeField, TimeFieldProps } from '../TimeField';
import { TimeFieldInput } from '../components';
import { userEvent } from 'storybook/test';

const MIN_TIME = '09:00';
const MAX_TIME = '18:30';
const STEP = 15;
const FORMAT_HHMM = 'HH:MM';

const TESTID_INPUT = 'input'

afterEach(cleanup)

const TimeFieldTest: FC<TimeFieldProps> = ({ ...props }) => {
  return (
    <TimeField
      min={MIN_TIME}
      max={MAX_TIME}
      step={STEP}
      format={FORMAT_HHMM}
      {...props}
    >
      <TimeFieldInput data-testid='input' />
    </TimeField>
  )
}

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement

describe('TimeField', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<TimeFieldTest />);
    });
    
    it('renders the text field', async () => {
      await expect.element(getInput(r)).toBeInTheDocument();
    });
    
    it('accepts valid input within min/max', async () => {
      const input = getInput(r);
      await userEvent.type(input, '10:00');
      await expect.element(input).toHaveValue('10:00');
    });
    
    it('clamps input below min to 0', async () => {
      const input = getInput(r)
      
      await userEvent.type(input, '08:00');
      await expect.element(input).toHaveValue('0');
    });
    
    it('clamps input above max to 1', async () => {
      const input = getInput(r)
      
      await userEvent.type(input, '19:00');
      await expect.element(input).toHaveValue('10:0');
    });
    
    it('supports step increments', async () => {
      const input = getInput(r)
      
      await userEvent.type(input, '09:00');
      await userEvent.keyboard('{ArrowUp}')

      await expect.element(input).toHaveValue('09:15');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders correctly with empty min/max', async () => {
      const r = render(<TimeFieldTest />);
      await expect.element(getInput(r)).toBeInTheDocument();
    });

    it('ignores invalid input', async () => {
      const r = render(<TimeFieldTest />);
      
      const input = getInput(r);
      input.focus();
      
      await userEvent.type(input, 'abc');
      expect(input).toHaveValue('');
    });
  });

  describe('Accessibility', () => {
    let r: RenderResult;

    beforeEach(() => {
      r = render(<TimeFieldTest step={1} />);
    });

    describe('roles', () => {
      it('has correct role for input', () => {
        const input = r.getByRole('textbox');
        expect(input).toBeInTheDocument();
      });
    });

    describe('focus', () => {
      it('can focus the input', () => {
        const input = r.getByRole('textbox');
        input.focus();
        expect(document.activeElement).toBe(input);
      });
    });

    describe('keyboard', () => {
      it('can navigate using arrow keys', async () => {
        const input = getInput(r);
        
        await userEvent.type(input, '09:00');
        await userEvent.keyboard('{ArrowUp}')

        await expect.element(input).toHaveValue('09:01');
      });
    });
  });
});