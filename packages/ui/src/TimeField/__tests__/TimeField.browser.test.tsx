import { FC, useState } from 'react';
import { describe, it, afterEach, expect, vi } from 'vitest';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { TimeField, TimeFieldProps } from '../TimeField';
import { TimeFieldColumn, TimeFieldInput, TimeFieldOption, TimeFieldTrigger } from '../components';
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover';
import { WheelPicker, WheelPickerFace } from '../../WheelPicker';
import { useTimeFieldOptionContext } from '../contexts';

const HourCell = () => {
  const { value } = useTimeFieldOptionContext()

  return <TimeFieldOption className='hour'><WheelPickerFace>{`${Number(value)} h`}</WheelPickerFace></TimeFieldOption>
}

const TESTID_INPUT = 'input'

afterEach(cleanup)

const TimeFieldTest: FC<Partial<TimeFieldProps>> = (props) => {
  return (
    <TimeField {...props}>
      <TimeFieldInput data-testid={TESTID_INPUT} />
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

const WheelsTimeFieldTest: FC<Partial<TimeFieldProps>> = (props) => (
  <TimeField {...props}>
    <TimeFieldInput data-testid={TESTID_INPUT} />
    <Popover>
      <PopoverTrigger asChild>
        <TimeFieldTrigger square aria-label='Pick a time' />
      </PopoverTrigger>
      <PopoverContent>
        <WheelPicker aria-label='Time'>
          <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
          <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
        </WheelPicker>
      </PopoverContent>
    </Popover>
  </TimeField>
)

const getInput = (view: RenderResult) => view.getByTestId(TESTID_INPUT) as HTMLInputElement

describe('TimeField', () => {
  describe('Critical User Paths', () => {
    it('reports the typed time', async () => {
      const onChangeValue = vi.fn();
      const view = render(<TimeFieldTest onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(view), '09:30');

      await expect.element(getInput(view)).toHaveValue('09:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30');
    });

    it('dispatches change once the user leaves a time they edited, like a native input', async () => {
      const onChange = vi.fn();
      const view = render(<TimeFieldTest />);
      getInput(view).addEventListener('change', onChange);

      await userEvent.click(getInput(view));
      await userEvent.tab();

      expect(onChange).not.toHaveBeenCalled();

      await userEvent.type(getInput(view), '09:30');
      await userEvent.tab();

      expect(onChange).toHaveBeenCalledOnce();
    });

    it('marks a time outside min as invalid for the user once they leave it, and a form reset clears the mark', async () => {
      const view = render(
        <form data-testid='form'>
          <TimeFieldTest min='12:00' />
        </form>
      );

      await userEvent.type(getInput(view), '11:30');

      expect(getInput(view)).not.toHaveAttribute('data-user-edited');

      await userEvent.tab();

      expect(getInput(view).matches('[data-user-edited]:invalid')).toBe(true);

      (view.getByTestId('form') as HTMLFormElement).reset();

      await expect.element(getInput(view)).not.toHaveAttribute('data-user-edited');
    });

    it('opens the wheels from the trigger on the hour column and writes the time a wheel turns to', async () => {
      const onChangeValue = vi.fn();
      const view = render(<WheelsTimeFieldTest defaultValue='09:30' step={15} onChangeValue={onChangeValue} />);

      await userEvent.click(view.getByRole('button', { name: 'Pick a time' }));
      await expect.element(view.getByRole('spinbutton', { name: 'Hours' })).toHaveFocus();

      await userEvent.keyboard('{ArrowUp}');
      await expect.element(getInput(view)).toHaveValue('10:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('10:30');

      await userEvent.keyboard('{Tab}{ArrowUp}');
      await expect.element(getInput(view)).toHaveValue('10:45');
      await expect.element(view.getByRole('spinbutton', { name: 'Minutes' })).toHaveAttribute('aria-valuetext', '45');
    });

    describe('controlled', () => {
      it('keeps the typed text', async () => {
        const view = render(<ControlledTimeFieldTest />);

        await userEvent.type(getInput(view), '09:30');

        await expect.element(getInput(view)).toHaveValue('09:30');
      });

      it('dispatches input for a whole value the parent accepts', async () => {
        const view = render(<ControlledTimeFieldTest />);
        const onInput = vi.fn();
        getInput(view).addEventListener('input', onInput);

        await userEvent.fill(getInput(view), '09:30');

        expect(onInput).toHaveBeenCalled();
      });

      it('shows a value set outside', async () => {
        const view = render(<ControlledTimeFieldTest />);

        await userEvent.click(view.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(view)).toHaveValue('12:30');
      });
    });
  });

  describe('Edge Cases', () => {
    it('skips the times outside min and max on the wheels', async () => {
      const view = render(<WheelsTimeFieldTest defaultValue='10:15' min='09:00' max='10:30' step={15} />);

      await userEvent.click(view.getByRole('button', { name: 'Pick a time' }));
      await expect.element(view.getByRole('spinbutton', { name: 'Hours' })).toHaveFocus();
      await userEvent.keyboard('{Tab}{ArrowUp}{ArrowUp}');
      await expect.element(getInput(view)).toHaveValue('10:00');

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}{ArrowUp}');
      await expect.element(getInput(view)).toHaveValue('09:00');
    });

    it('renders the option template of a column in each row and still announces and matches the two-digit value', async () => {
      const view = render(
        <TimeField defaultValue='09:30'>
          <TimeFieldInput data-testid={TESTID_INPUT} />
          <WheelPicker aria-label='Time'>
            <TimeFieldColumn unit='hour' aria-label='Hours'><HourCell /></TimeFieldColumn>
          </WheelPicker>
        </TimeField>
      );

      const column = view.getByRole('spinbutton', { name: 'Hours' });
      await expect.element(column).toHaveAttribute('aria-valuetext', '09');
      const nine = [...column.querySelectorAll('[data-index]')].find((row) => row.textContent === '9 h');
      expect(nine).toHaveClass('hour');

      await userEvent.click(column);
      await userEvent.keyboard('14');
      await expect.element(getInput(view)).toHaveValue('14:30');
    });

    it('does not turn the wheels of a read-only field', async () => {
      const onChangeValue = vi.fn();
      const view = render(<WheelsTimeFieldTest defaultValue='10:15' readOnly onChangeValue={onChangeValue} />);
      await userEvent.click(view.getByRole('button', { name: 'Pick a time' }));
      const hours = view.getByRole('spinbutton', { name: 'Hours' });
      await expect.element(hours).toHaveFocus();
      await userEvent.keyboard('{ArrowUp}');

      expect(onChangeValue).not.toHaveBeenCalled();
      await expect.element(hours).toHaveAttribute('aria-valuetext', '10');
      await expect.element(getInput(view)).toHaveValue('10:15');
    });

    it('disables the trigger of a disabled field', async () => {
      const view = render(<WheelsTimeFieldTest defaultValue='10:15' disabled />);

      await expect.element(view.getByRole('button', { name: 'Pick a time' })).toBeDisabled();
    });

    it('does not step a read-only input with the arrows, like a native time input', async () => {
      const onChangeValue = vi.fn();
      const view = render(
        <TimeField defaultValue='10:00' onChangeValue={onChangeValue}>
          <TimeFieldInput data-testid={TESTID_INPUT} readOnly />
        </TimeField>,
      );
      getInput(view).focus();
      getInput(view).setSelectionRange(0, 0);

      await userEvent.keyboard('{ArrowUp}');

      expect(getInput(view)).toHaveValue('10:00');
      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('calibrates a time the browser entered without an edit to intercept, like autofill', async () => {
      const onChangeValue = vi.fn();
      const view = render(<TimeFieldTest onChangeValue={onChangeValue} />);
      const input = getInput(view);

      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, '0930');
      input.dispatchEvent(new Event('input', { bubbles: true }));

      await expect.element(input).toHaveValue('09:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30');
    });

    it('reports each edit to onChange of the input', async () => {
      const onChange = vi.fn();
      const view = render(
        <TimeField>
          <TimeFieldInput data-testid={TESTID_INPUT} onChange={(event) => onChange(event.currentTarget.value)} />
        </TimeField>
      );

      await userEvent.type(getInput(view), '093');

      expect(onChange.mock.calls).toEqual([['0'], ['09'], ['09:3']]);
    });
  });

  describe('Accessibility', () => {
    describe('keyboard', () => {
      it('steps the minutes by one with arrow keys by default', async () => {
        const view = render(<TimeFieldTest />);

        await userEvent.type(getInput(view), '09:00');
        await userEvent.keyboard('{ArrowUp}');

        await expect.element(getInput(view)).toHaveValue('09:01');
      });
    });
  });
});
