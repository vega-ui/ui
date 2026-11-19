import { FC, FormEvent, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { server, userEvent } from 'vitest/browser';

import { Combobox, ComboboxProps } from '../Combobox';
import { ChevronDownIcon } from '@vega-ui/icons';
import { ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger } from '../components';
import { ListboxOption } from '../../Listbox';
import { TextField } from '../../TextField';

afterEach(cleanup);

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
];

const manyFruits = Array.from({ length: 12 }, (_, index) => ({ value: `apple-${index}`, label: `Apple ${index}` }));

const ComboboxTest: FC<ComboboxProps & { onText?(text: string): void, options?: typeof fruits }> = ({ onText, options = fruits, ...props }) => {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const matches = options.filter((fruit) => fruit.label.toLowerCase().startsWith(query.toLowerCase()));

  return (
    <Combobox {...props}>
      <TextField>
        <ComboboxInput
          aria-label='Fruit'
          value={text}
          onChange={(event) => {
            const { value, selectionStart, selectionEnd } = event.target;
            setText(value);
            setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
            onText?.(event.target.value);
          }}
        />
        <ComboboxTrigger square aria-label='Show fruits'><ComboboxIcon><ChevronDownIcon /></ComboboxIcon></ComboboxTrigger>
      </TextField>
      <ComboboxListbox aria-label='Fruits'>
        {matches.map((fruit) => <ListboxOption key={fruit.value} value={fruit.value}>{fruit.label}</ListboxOption>)}
      </ComboboxListbox>
    </Combobox>
  );
};

const getInput = (r: RenderResult) => r.getByRole('combobox', { name: 'Fruit' }) as HTMLInputElement;
const getListbox = (r: RenderResult) => r.getByRole('listbox', { hidden: true });
const getOption = (r: RenderResult, name: string) => r.getByRole('option', { name, hidden: true });

const pressTab = () => userEvent.keyboard(server.browser === 'webkit' ? '{Alt>}{Tab}{/Alt}' : '{Tab}');

const typeInto = async (r: RenderResult, text: string) => {
  await userEvent.click(getInput(r));
  await userEvent.keyboard(text);
};

describe('Combobox', () => {
  describe('Critical User Paths', () => {
    it('opens on typing, picks the active option with Enter and writes its label through onChange', async () => {
      const onChangeValue = vi.fn();
      const onText = vi.fn();
      const r = render(<ComboboxTest onChangeValue={onChangeValue} onText={onText} />);

      await typeInto(r, 'ap');
      await expect.element(getListbox(r)).toBeVisible();
      await expect.element(getInput(r)).toHaveAttribute('aria-expanded', 'true');
      expect(r.queryByRole('option', { name: 'Banana' })).toBeNull();

      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await expect.element(getInput(r)).toHaveAttribute('aria-activedescendant', getOption(r, 'Apricot').id);

      await userEvent.keyboard('{Enter}');
      await expect.element(getInput(r)).toHaveValue('Apricot');
      await expect.element(getListbox(r)).not.toBeVisible();
      await expect.element(getInput(r)).toHaveAttribute('aria-expanded', 'false');
      expect(onChangeValue).toHaveBeenLastCalledWith('apricot');
      expect(onText).toHaveBeenLastCalledWith('Apricot');
      expect(document.activeElement).toBe(getInput(r));
    });

    it('picks an option with a click and keeps the focus in the input', async () => {
      const onChangeValue = vi.fn();
      const r = render(<ComboboxTest onChangeValue={onChangeValue} />);

      await typeInto(r, 'b');
      await userEvent.click(getOption(r, 'Banana'));

      await expect.element(getInput(r)).toHaveValue('Banana');
      await expect.element(getListbox(r)).not.toBeVisible();
      expect(onChangeValue).toHaveBeenLastCalledWith('banana');
      expect(document.activeElement).toBe(getInput(r));
    });

    it('closes on Escape, then clears the text on a second Escape', async () => {
      const r = render(<ComboboxTest />);

      await typeInto(r, 'ap');
      await userEvent.keyboard('{Escape}');
      await expect.element(getListbox(r)).not.toBeVisible();
      await expect.element(getInput(r)).toHaveValue('ap');

      await userEvent.keyboard('{Escape}');
      await expect.element(getInput(r)).toHaveValue('');
    });

    it('closes when the focus leaves', async () => {
      const r = render(<><ComboboxTest /><button type='button'>Next</button></>);

      await typeInto(r, 'a');
      await pressTab();
      await expect.element(r.getByRole('button', { name: 'Next' })).toHaveFocus();

      await expect.element(getListbox(r)).not.toBeVisible();
      await expect.element(getInput(r)).toHaveAttribute('aria-expanded', 'false');
    });

    it('completes the typed text with the first matching option, its rest selected, and typing goes over the rest', async () => {
      const onChangeValue = vi.fn();
      const r = render(<ComboboxTest autocomplete='both' onChangeValue={onChangeValue} />);

      await typeInto(r, 'a');
      await expect.element(getInput(r)).toHaveValue('Apple');
      expect([getInput(r).selectionStart, getInput(r).selectionEnd]).toEqual([1, 5]);
      await expect.element(getInput(r)).toHaveAttribute('aria-activedescendant', getOption(r, 'Apple').id);

      await userEvent.keyboard('p');
      await userEvent.keyboard('r');
      await expect.element(getInput(r)).toHaveValue('Apricot');
      expect([getInput(r).selectionStart, getInput(r).selectionEnd]).toEqual([3, 7]);

      await userEvent.keyboard('{Enter}');
      await expect.element(getInput(r)).toHaveValue('Apricot');
      expect(onChangeValue).toHaveBeenLastCalledWith('apricot');
    });

    it('keeps every option the typed text matches while it completes, and writes the label the arrows reach', async () => {
      const r = render(<ComboboxTest autocomplete='both' />);

      await typeInto(r, 'ap');
      await expect.element(getInput(r)).toHaveValue('Apple');
      expect(r.getAllByRole('option').map((option) => option.textContent)).toEqual(['Apple', 'Apricot']);

      await userEvent.keyboard('{ArrowDown}');
      await expect.element(getInput(r)).toHaveValue('Apricot');
      expect([getInput(r).selectionStart, getInput(r).selectionEnd]).toEqual([2, 7]);
      await expect.element(getInput(r)).toHaveAttribute('aria-activedescendant', getOption(r, 'Apricot').id);
      expect(r.getAllByRole('option')).toHaveLength(2);
    });

    it('opens and closes the list from the trigger and keeps the focus in the input', async () => {
      const r = render(<ComboboxTest />);
      const trigger = r.getByRole('button', { name: 'Show fruits' });

      await userEvent.click(trigger);
      await expect.element(getListbox(r)).toBeVisible();
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(r.getAllByRole('option')).toHaveLength(3);
      expect(document.activeElement).toBe(getInput(r));

      await userEvent.click(trigger);
      await expect.element(getListbox(r)).not.toBeVisible();
      expect(document.activeElement).toBe(getInput(r));
    });
  });

  describe('Edge Cases', () => {
    it('removes the completed rest on Backspace without completing again', async () => {
      const r = render(<ComboboxTest autocomplete='both' />);

      await typeInto(r, 'ap');
      await expect.element(getInput(r)).toHaveValue('Apple');

      await userEvent.keyboard('{Backspace}');
      await expect.element(getInput(r)).toHaveValue('Ap');
      await expect.element(getInput(r)).not.toHaveAttribute('aria-activedescendant');
    });

    it('completes inline without showing the list and accepts the completion on Enter', async () => {
      const onChangeValue = vi.fn();
      const r = render(<ComboboxTest autocomplete='inline' onChangeValue={onChangeValue} />);

      await typeInto(r, 'ap');
      await expect.element(getInput(r)).toHaveValue('Apple');
      await expect.element(getListbox(r)).not.toBeVisible();

      await userEvent.keyboard('{Enter}');
      await expect.element(getInput(r)).toHaveValue('Apple');
      expect(onChangeValue).toHaveBeenLastCalledWith('apple');
    });

    it('keeps the active option on ArrowDown pressed right after typing', async () => {
      const r = render(<ComboboxTest />);

      await userEvent.click(getInput(r));
      await userEvent.keyboard('ap{ArrowDown}');
      await expect.element(getInput(r)).toHaveAttribute('aria-activedescendant', getOption(r, 'Apple').id);
    });

    it('moves the focus out on Tab past a list long enough to scroll', async () => {
      const r = render(<ComboboxTest options={manyFruits} />);

      await typeInto(r, 'a');
      await expect.element(getListbox(r)).toBeVisible();

      await pressTab();
      await expect.element(getListbox(r)).not.toBeVisible();
      expect(document.activeElement).not.toBe(getListbox(r));
    });

    it('returns to the text on ArrowRight at the end of the text without closing, and Space types a space', async () => {
      const r = render(<ComboboxTest />);

      await typeInto(r, 'ap');
      await userEvent.keyboard('{ArrowDown}{ArrowRight}');
      await expect.element(getInput(r)).not.toHaveAttribute('aria-activedescendant');
      await expect.element(getListbox(r)).toBeVisible();

      await userEvent.keyboard(' r');
      await expect.element(getInput(r)).toHaveValue('ap r');
    });

    it('hides the list while no option matches and shows it again when one does', async () => {
      const r = render(<ComboboxTest />);

      await typeInto(r, 'x');
      await expect.element(getListbox(r)).not.toBeVisible();
      await expect.element(getInput(r)).toHaveAttribute('aria-expanded', 'false');

      await userEvent.keyboard('{Backspace}');
      await expect.element(getListbox(r)).toBeVisible();
    });

    it('lets Enter submit the form when no option is active', async () => {
      const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
      const r = render(<form onSubmit={onSubmit}><ComboboxTest /></form>);

      await typeInto(r, 'b');
      await userEvent.keyboard('{Enter}');
      expect(onSubmit).toHaveBeenCalledOnce();

      await userEvent.keyboard('{ArrowDown}{Enter}');
      expect(onSubmit).toHaveBeenCalledOnce();
    });
  });

  describe('Accessibility', () => {
    it('connects the input to the list', async () => {
      const r = render(<ComboboxTest />);

      await expect.element(getInput(r)).toHaveAttribute('aria-autocomplete', 'list');
      await expect.element(getInput(r)).toHaveAttribute('aria-controls', getListbox(r).id);
    });
  });
});
