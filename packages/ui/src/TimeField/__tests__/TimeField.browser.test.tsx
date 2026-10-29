import { FC, FormEvent, useState } from 'react';
import { describe, it, afterEach, expect, vi } from 'vitest';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { TimeField, TimeFieldProps } from '../TimeField';
import { TimeFieldInput } from '../components';

const TESTID_INPUT = 'input'

afterEach(cleanup)

const TimeFieldTest: FC<Partial<TimeFieldProps> & { onInput?(event: FormEvent<HTMLInputElement>): void }> = ({ onInput, ...props }) => {
  return (
    <TimeField {...props}>
      <TimeFieldInput data-testid={TESTID_INPUT} onInput={onInput} />
    </TimeField>
  )
}

const ControlledTimeFieldTest: FC<Partial<TimeFieldProps>> = (props) => {
  const [value, setValue] = useState('');

  return (
    <>
      <TimeFieldTest {...props} value={value} onChangeValue={setValue} />
      <button type='button' onClick={() => setValue('12:30')}>Fill</button>
    </>
  );
};

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement

describe('TimeField', () => {
  describe('Critical User Paths', () => {
    it('renders the text field', async () => {
      const r = render(<TimeFieldTest />);
      await expect.element(getInput(r)).toBeInTheDocument();
    });

    it('reports the typed time', async () => {
      const onChangeValue = vi.fn();
      const r = render(<TimeFieldTest onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(r), '09:30');

      await expect.element(getInput(r)).toHaveValue('09:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30');
    });

    it('reports an empty value while the time is incomplete', async () => {
      const onChangeValue = vi.fn();
      const r = render(<TimeFieldTest onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(r), '09:30{Backspace}');

      await expect.element(getInput(r)).toHaveValue('09:3');
      expect(onChangeValue).toHaveBeenLastCalledWith('');
    });

    it('reports seconds with the HH:mm:ss format', async () => {
      const onChangeValue = vi.fn();
      const r = render(<TimeFieldTest format='HH:mm:ss' onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(r), '09:30:15');

      await expect.element(getInput(r)).toHaveValue('09:30:15');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30:15');
    });

    describe('controlled', () => {
      it('keeps the typed text', async () => {
        const r = render(<ControlledTimeFieldTest />);

        await userEvent.type(getInput(r), '09:30');

        await expect.element(getInput(r)).toHaveValue('09:30');
      });

      it('shows a value set outside', async () => {
        const r = render(<ControlledTimeFieldTest />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(r)).toHaveValue('12:30');
      });
    });

    it('shows defaultValue', async () => {
      const r = render(<TimeFieldTest defaultValue='08:15' />);
      await expect.element(getInput(r)).toHaveValue('08:15');
    });

    it('restores defaultValue on form reset', async () => {
      const onChangeValue = vi.fn();
      const r = render(
        <form>
          <TimeFieldTest defaultValue='08:15' onChangeValue={onChangeValue} />
          <button type='reset'>Reset</button>
        </form>
      );

      await userEvent.clear(getInput(r));
      await userEvent.type(getInput(r), '12:30');
      await userEvent.click(r.getByRole('button', { name: 'Reset' }));

      await expect.element(getInput(r)).toHaveValue('08:15');
      expect(onChangeValue).toHaveBeenLastCalledWith('08:15');
    });
  });

  describe('Edge Cases', () => {
    it('clamps a time earlier than min to min', async () => {
      const r = render(<TimeFieldTest min='09:00' max='18:30' />);

      await userEvent.type(getInput(r), '08:00');

      await expect.element(getInput(r)).toHaveValue('09:00');
    });

    it('clamps a time later than max to max', async () => {
      const r = render(<TimeFieldTest min='09:00' max='18:30' />);

      await userEvent.type(getInput(r), '19:00');

      await expect.element(getInput(r)).toHaveValue('18:30');
    });

    it('ignores an invalid min', async () => {
      const r = render(<TimeFieldTest min='9 am' />);

      await userEvent.type(getInput(r), '08:00');

      await expect.element(getInput(r)).toHaveValue('08:00');
    });

    it('clamps the typed text when min changes and dispatches input', async () => {
      const onInput = vi.fn();
      const r = render(<TimeFieldTest onInput={onInput} />);

      await userEvent.type(getInput(r), '08:00');
      onInput.mockClear();
      r.rerender(<TimeFieldTest onInput={onInput} min='09:00' />);

      await expect.element(getInput(r)).toHaveValue('09:00');
      expect(onInput).toHaveBeenCalledTimes(1);
    });

    it('clamps segments to their range', async () => {
      const r = render(<TimeFieldTest />);

      await userEvent.type(getInput(r), '25:30');

      await expect.element(getInput(r)).toHaveValue('23:30');
    });

    it('steps the minutes at the caret by step', async () => {
      const r = render(<TimeFieldTest step={15} />);

      await userEvent.type(getInput(r), '09:00');
      await userEvent.keyboard('{ArrowUp}');

      await expect.element(getInput(r)).toHaveValue('09:15');
    });

    it('steps the hours by one whatever the step', async () => {
      const r = render(<TimeFieldTest step={15} />);

      await userEvent.type(getInput(r), '09:00');
      getInput(r).setSelectionRange(1, 1);
      await userEvent.keyboard('{ArrowUp}');

      await expect.element(getInput(r)).toHaveValue('10:00');
    });

    it('ignores letters', async () => {
      const r = render(<TimeFieldTest />);

      await userEvent.type(getInput(r), 'abc');

      await expect.element(getInput(r)).toHaveValue('');
    });

    it('accepts the digits of other numbering systems', async () => {
      const onChangeValue = vi.fn();
      const r = render(<TimeFieldTest onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(r), '٠٩٣٠');

      await expect.element(getInput(r)).toHaveValue('09:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30');
    });
  });

  describe('Accessibility', () => {
    describe('roles', () => {
      it('has correct role for input', async () => {
        const r = render(<TimeFieldTest />);
        await expect.element(r.getByRole('textbox')).toBeInTheDocument();
      });
    });

    describe('focus', () => {
      it('can focus the input', async () => {
        const r = render(<TimeFieldTest />);
        getInput(r).focus();
        await expect.element(getInput(r)).toHaveFocus();
      });
    });

    describe('keyboard', () => {
      it('steps the minutes by one with arrow keys by default', async () => {
        const r = render(<TimeFieldTest />);

        await userEvent.type(getInput(r), '09:00');
        await userEvent.keyboard('{ArrowUp}');

        await expect.element(getInput(r)).toHaveValue('09:01');
      });
    });
  });
});
