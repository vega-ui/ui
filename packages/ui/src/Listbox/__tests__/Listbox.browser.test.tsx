import { act, Profiler } from 'react';
import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { Listbox } from '../Listbox';
import { ListboxOption } from '../components';

afterEach(cleanup);

const LISTBOX = 'listbox';
const getListbox = (r: RenderResult) => r.getByTestId(LISTBOX);
const getOption = (r: RenderResult, name: string) => r.getByRole('option', { name });
const toBeActive = async (r: RenderResult, name: string) => {
  await expect.poll(() => getListbox(r).getAttribute('aria-activedescendant')).toBe(getOption(r, name).id);
};

const options = [
  <ListboxOption key='a' value='a'>Alpha</ListboxOption>,
  <ListboxOption key='b' value='b' disabled>Beta</ListboxOption>,
  <ListboxOption key='c' value='c'>Gamma</ListboxOption>,
  <ListboxOption key='d' value='d'>Delta</ListboxOption>,
];

describe('Listbox', () => {
  describe('Critical User Paths', () => {
    it('selects an option by click', async () => {
      const onChangeValue = vi.fn();
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' onChangeValue={onChangeValue}>{options}</Listbox>);

      await userEvent.click(getOption(r, 'Gamma'));

      expect(onChangeValue).toHaveBeenCalledWith('c');
      await expect.element(getOption(r, 'Gamma')).toHaveAttribute('aria-selected', 'true');
    });

    it('does not change a controlled value without an update', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' value='a'>{options}</Listbox>);

      await userEvent.click(getOption(r, 'Gamma'));

      await expect.element(getOption(r, 'Alpha')).toHaveAttribute('aria-selected', 'true');
    });

    describe('multiple', () => {
      it('toggles options by click and reports all of them', async () => {
        const onChangeValue = vi.fn();
        const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' multiple defaultValue={['a']} onChangeValue={onChangeValue}>{options}</Listbox>);

        await userEvent.click(getOption(r, 'Gamma'));
        expect(onChangeValue).toHaveBeenLastCalledWith(['a', 'c']);

        await userEvent.click(getOption(r, 'Alpha'));
        expect(onChangeValue).toHaveBeenLastCalledWith(['c']);
        await expect.element(getOption(r, 'Alpha')).toHaveAttribute('aria-selected', 'false');
        await expect.element(getOption(r, 'Gamma')).toHaveAttribute('aria-selected', 'true');
      });

    });

    it('follows the DOM order when options are reordered', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options}</Listbox>);
      r.rerender(<Listbox data-testid={LISTBOX} aria-label='Letters'>{[...options].reverse()}</Listbox>);
      await act(async () => {});

      getListbox(r).focus();

      await toBeActive(r, 'Delta');
    });
  });

  describe('Edge Cases', () => {
    it('keeps working when an id is passed around the types', async () => {
      const r = render(
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          <ListboxOption value='a' {...{ id: 'custom' }}>Alpha</ListboxOption>
        </Listbox>,
      );

      getListbox(r).focus();

      await toBeActive(r, 'Alpha');
      await expect.element(getOption(r, 'Alpha')).toHaveAttribute('data-active', 'true');
    });

    it('selects and scrolls inside a shadow root', async () => {
      const onChangeValue = vi.fn();
      const host = document.createElement('div');
      document.body.append(host);
      onTestFinished(() => host.remove());
      const container = host.attachShadow({ mode: 'open' }).appendChild(document.createElement('div'));
      const many = Array.from({ length: 50 }, (_, index) => (
        <ListboxOption key={index} value={index}>{`Item ${index}`}</ListboxOption>
      ));

      render(<Listbox aria-label='Items' style={{ height: 100, overflow: 'auto', position: 'relative' }} onChangeValue={onChangeValue}>{many}</Listbox>, { container });

      const listbox = container.querySelector<HTMLElement>('[role="listbox"]')!;
      listbox.focus();
      await userEvent.keyboard('{End}');
      await expect.poll(() => listbox.scrollTop).toBeGreaterThan(0);

      await userEvent.keyboard('{Enter}');
      expect(onChangeValue).toHaveBeenCalledWith(49);
    });

    it('moves the active option to the next enabled one when it is removed', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options}</Listbox>);

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');

      r.rerender(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options.slice(1)}</Listbox>);

      await toBeActive(r, 'Gamma');
    });

    it('skips an option disabled after mounting', async () => {
      const renderLetters = (disabled: boolean) => (
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          <ListboxOption value='a'>Alpha</ListboxOption>
          <ListboxOption value='b' disabled={disabled}>Beta</ListboxOption>
          <ListboxOption value='c'>Gamma</ListboxOption>
        </Listbox>
      );
      const r = render(renderLetters(false));

      r.rerender(renderLetters(true));

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');
      await userEvent.keyboard('{ArrowDown}');

      await toBeActive(r, 'Gamma');
    });

    it('keeps the active option when its props change', async () => {
      const renderLetters = (label: string) => (
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          <ListboxOption value='a' label={label}>Alpha</ListboxOption>
        </Listbox>
      );
      const r = render(renderLetters('Alpha'));

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');
      r.rerender(renderLetters('First'));

      await toBeActive(r, 'Alpha');
    });

    it('follows the new order after the options are reordered', async () => {
      const letters = ['Alpha', 'Beta', 'Gamma'];
      const renderLetters = (order: string[]) => (
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          {order.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
        </Listbox>
      );
      const r = render(renderLetters(letters));

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');

      r.rerender(renderLetters([...letters].reverse()));
      await userEvent.keyboard('{ArrowUp}');

      await toBeActive(r, 'Beta');
    });

    it('tells apart options with the same value', async () => {
      const r = render(
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          <ListboxOption value='a'>Alpha</ListboxOption>
          <ListboxOption value='a'>Aleph</ListboxOption>
        </Listbox>,
      );

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');
      await userEvent.keyboard('{ArrowDown}');

      await toBeActive(r, 'Aleph');
      expect(getOption(r, 'Alpha').id).not.toBe(getOption(r, 'Aleph').id);
      await expect.element(getOption(r, 'Alpha')).not.toHaveAttribute('data-active', 'true');
    });

    it('scrolls back up to the active option', async () => {
      const many = Array.from({ length: 50 }, (_, index) => (
        <ListboxOption key={index} value={index}>{`Item ${index}`}</ListboxOption>
      ));
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Items' style={{ height: 100 }}>{many}</Listbox>);

      getListbox(r).focus();
      await userEvent.keyboard('{End}');
      await expect.poll(() => getListbox(r).scrollTop).toBeGreaterThan(0);
      await userEvent.keyboard('{Home}');

      await expect.poll(() => getOption(r, 'Item 0').getBoundingClientRect().top >= getListbox(r).getBoundingClientRect().top).toBe(true);
    });

  });

  describe('Accessibility', () => {
    it('keeps the focus on the list and marks the first enabled option active', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options}</Listbox>);

      await userEvent.tab();

      await expect.element(getListbox(r)).toHaveFocus();
      await toBeActive(r, 'Alpha');
      await expect.element(getOption(r, 'Alpha')).toHaveAttribute('data-active', 'true');
    });

    it('moves by typeahead, Home and End', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options}</Listbox>);

      getListbox(r).focus();
      await userEvent.keyboard('gam');
      await toBeActive(r, 'Gamma');
      await userEvent.keyboard('{End}');
      await toBeActive(r, 'Delta');
      await userEvent.keyboard('{Home}');
      await toBeActive(r, 'Alpha');
    });

    it('marks disabled options and leaves the tab order when disabled', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' disabled>{options}</Listbox>);

      await expect.element(getOption(r, 'Alpha')).toHaveAttribute('aria-disabled', 'true');
      expect(getListbox(r).hasAttribute('tabindex')).toBe(false);
    });

    describe('multiple', () => {
      it('selects up to the first option with Ctrl+Shift+Home', async () => {
        const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' multiple>{options}</Listbox>);

        getListbox(r).focus();
        await userEvent.keyboard('{End}{ArrowUp}{Control>}{Shift>}{Home}{/Shift}{/Control}');

        await expect.element(getOption(r, 'Alpha')).toHaveAttribute('aria-selected', 'true');
        await expect.element(getOption(r, 'Gamma')).toHaveAttribute('aria-selected', 'true');
        await expect.element(getOption(r, 'Delta')).toHaveAttribute('aria-selected', 'false');
      });

    });
  });
  describe('Performance', () => {
    it('re-renders only the options whose active state changes on arrows', async () => {
      const rendered = new Set<string>();
      const r = render(
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          {['Alpha', 'Beta', 'Gamma', 'Delta'].map((name) => (
            <Profiler key={name} id={name} onRender={(id) => rendered.add(id)}>
              <ListboxOption value={name}>{name}</ListboxOption>
            </Profiler>
          ))}
        </Listbox>,
      );

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');
      rendered.clear();

      await userEvent.keyboard('{ArrowDown}');
      await toBeActive(r, 'Beta');

      expect([...rendered].sort()).toEqual(['Alpha', 'Beta']);
    });
  });
});
