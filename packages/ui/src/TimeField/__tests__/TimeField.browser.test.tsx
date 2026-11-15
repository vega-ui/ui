import { FC, useState } from 'react';
import { describe, it, afterEach, expect, vi } from 'vitest';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { TimeField, TimeFieldProps } from '../TimeField';
import { TimeFieldInput } from '../components';

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

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement

describe('TimeField', () => {
  describe('Critical User Paths', () => {
    it('reports the typed time', async () => {
      const onChangeValue = vi.fn();
      const r = render(<TimeFieldTest onChangeValue={onChangeValue} />);

      await userEvent.type(getInput(r), '09:30');

      await expect.element(getInput(r)).toHaveValue('09:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30');
    });

    it('dispatches change once the user leaves a time they edited, like a native input', async () => {
      const onChange = vi.fn();
      const r = render(<TimeFieldTest />);
      getInput(r).addEventListener('change', onChange);

      await userEvent.click(getInput(r));
      await userEvent.tab();

      expect(onChange).not.toHaveBeenCalled();

      await userEvent.type(getInput(r), '09:30');
      await userEvent.tab();

      expect(onChange).toHaveBeenCalledOnce();
    });

    it('marks a time outside min as invalid for the user once they leave it, and a form reset clears the mark', async () => {
      const r = render(
        <form data-testid='form'>
          <TimeFieldTest min='12:00' />
        </form>
      );

      await userEvent.type(getInput(r), '11:30');

      expect(getInput(r)).not.toHaveAttribute('data-user-edited');

      await userEvent.tab();

      expect(getInput(r).matches('[data-user-edited]:invalid')).toBe(true);

      (r.getByTestId('form') as HTMLFormElement).reset();

      await expect.element(getInput(r)).not.toHaveAttribute('data-user-edited');
    });

    describe('controlled', () => {
      it('keeps the typed text', async () => {
        const r = render(<ControlledTimeFieldTest />);

        await userEvent.type(getInput(r), '09:30');

        await expect.element(getInput(r)).toHaveValue('09:30');
      });

      it('dispatches input for a whole value the parent accepts', async () => {
        const r = render(<ControlledTimeFieldTest />);
        const onInput = vi.fn();
        getInput(r).addEventListener('input', onInput);

        await userEvent.fill(getInput(r), '09:30');

        expect(onInput).toHaveBeenCalled();
      });

      it('shows a value set outside', async () => {
        const r = render(<ControlledTimeFieldTest />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(r)).toHaveValue('12:30');
      });
    });
  });

  describe('Edge Cases', () => {
    it('does not step a read-only input with the arrows, like a native time input', async () => {
      const onChangeValue = vi.fn();
      const r = render(
        <TimeField defaultValue='10:00' onChangeValue={onChangeValue}>
          <TimeFieldInput data-testid={TESTID_INPUT} readOnly />
        </TimeField>,
      );
      getInput(r).focus();
      getInput(r).setSelectionRange(0, 0);

      await userEvent.keyboard('{ArrowUp}');

      expect(getInput(r)).toHaveValue('10:00');
      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('calibrates a time the browser entered without an edit to intercept, like autofill', async () => {
      const onChangeValue = vi.fn();
      const r = render(<TimeFieldTest onChangeValue={onChangeValue} />);
      const input = getInput(r);

      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, '0930');
      input.dispatchEvent(new Event('input', { bubbles: true }));

      await expect.element(input).toHaveValue('09:30');
      expect(onChangeValue).toHaveBeenLastCalledWith('09:30');
    });

    it('reports each edit to onChange of the input', async () => {
      const onChange = vi.fn();
      const r = render(
        <TimeField>
          <TimeFieldInput data-testid={TESTID_INPUT} onChange={(event) => onChange(event.currentTarget.value)} />
        </TimeField>
      );

      await userEvent.type(getInput(r), '093');

      expect(onChange.mock.calls).toEqual([['0'], ['09'], ['09:3']]);
    });
  });

  describe('Accessibility', () => {
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
