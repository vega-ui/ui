import React, { FC, useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { useInputValue } from '../useInputValue';

const Field: FC<{ onValue(value: string): void; defaultValue?: string }> = ({ onValue, defaultValue }) => {
  const ref = useRef<HTMLInputElement>(null);
  const onInput = useInputValue(ref, onValue);

  return (
    <form data-testid='form'>
      <input data-testid='input' ref={ref} defaultValue={defaultValue} onInput={onInput} />
    </form>
  );
};

const ControlledField: FC<{ onValue(value: string): void }> = ({ onValue }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [copy, setCopy] = useState('');
  const onInput = useInputValue(ref, (next) => {
    setCopy(next);
    onValue(next);
  });

  return (
    <>
      <input data-testid='input' ref={ref} value={value} onInput={onInput} onChange={(event) => setValue(event.target.value)} />
      <output data-testid='copy'>{copy}</output>
      <button type='button' onClick={() => setValue('42')}>Fill</button>
    </>
  );
};

const RejectingField: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [copy, setCopy] = useState('');
  const onInput = useInputValue(ref, setCopy);

  return (
    <>
      <input
        data-testid='input'
        ref={ref}
        value={value}
        onInput={onInput}
        onChange={(event) => {
          if (/^\d*$/.test(event.target.value)) setValue(event.target.value);
        }}
      />
      <output data-testid='copy'>{copy}</output>
    </>
  );
};

const ResettableField: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [copy, setCopy] = useState('');
  const onInput = useInputValue(ref, setCopy);

  return (
    <form>
      <input data-testid='input' ref={ref} defaultValue='12' onInput={onInput} />
      <output data-testid='copy'>{copy}</output>
      <button type='reset'>Reset</button>
    </form>
  );
};

describe('useInputValue', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Critical User Paths', () => {
    it('reports the default value on mount', async () => {
      const onValue = vi.fn();
      await render(<Field defaultValue='12' onValue={onValue} />);

      expect(onValue).toHaveBeenLastCalledWith('12');
    });

    it('reports the typed value', async () => {
      const onValue = vi.fn();
      const screen = await render(<Field onValue={onValue} />);

      await userEvent.type(screen.getByTestId('input'), '34');

      expect(onValue).toHaveBeenLastCalledWith('34');
    });

    it('keeps every keystroke of a controlled input', async () => {
      const onValue = vi.fn();
      const screen = await render(<ControlledField onValue={onValue} />);

      await userEvent.type(screen.getByTestId('input'), '123');

      await expect.element(screen.getByTestId('input')).toHaveValue('123');
      await expect.element(screen.getByTestId('copy')).toHaveTextContent('123');
    });

    it('reports a controlled value set outside', async () => {
      const onValue = vi.fn();
      const screen = await render(<ControlledField onValue={onValue} />);

      await userEvent.click(screen.getByRole('button', { name: 'Fill' }));

      await expect.element(screen.getByTestId('copy')).toHaveTextContent('42');
    });

    it('reports the default value when the form is reset', async () => {
      const onValue = vi.fn();
      const screen = await render(<Field defaultValue='12' onValue={onValue} />);
      await userEvent.type(screen.getByTestId('input'), '3');

      (screen.getByTestId('form').element() as HTMLFormElement).reset();

      expect(onValue).toHaveBeenLastCalledWith('12');
    });
  });

  describe('Edge Cases', () => {
    it('follows the input when a controlled value rejects the keystroke', async () => {
      const screen = await render(<RejectingField />);

      await userEvent.type(screen.getByTestId('input'), '1a');

      await expect.element(screen.getByTestId('input')).toHaveValue('1');
      await expect.element(screen.getByTestId('copy')).toHaveTextContent(/^1$/);
    });

    it('keeps the default value in the copy after a reset button', async () => {
      const screen = await render(<ResettableField />);
      await userEvent.type(screen.getByTestId('input'), '3');

      await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

      await expect.element(screen.getByTestId('input')).toHaveValue('12');
      await expect.element(screen.getByTestId('copy')).toHaveTextContent(/^12$/);
    });

    it('does not report an unchanged text again on a render', async () => {
      const onValue = vi.fn();
      const screen = await render(<Field defaultValue='12' onValue={onValue} />);
      await screen.rerender(<Field defaultValue='12' onValue={onValue} />);

      expect(onValue).toHaveBeenCalledOnce();
    });

    it('calls the latest onValue', async () => {
      const first = vi.fn();
      const second = vi.fn();
      const screen = await render(<Field onValue={first} />);
      await screen.rerender(<Field onValue={second} />);

      await userEvent.type(screen.getByTestId('input'), '5');

      expect(first).not.toHaveBeenCalledWith('5');
      expect(second).toHaveBeenLastCalledWith('5');
    });
  });
});
