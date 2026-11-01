import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { Listbox } from '../Listbox';
import { ListboxGroup, ListboxOption } from '../components';

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

    it('does not select a disabled option', async () => {
      const onChangeValue = vi.fn();
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' onChangeValue={onChangeValue}>{options}</Listbox>);

      getOption(r, 'Beta').click();

      expect(onChangeValue).not.toHaveBeenCalled();
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

      it('does not change a controlled value without an update', async () => {
        const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' multiple value={['a']}>{options}</Listbox>);

        await userEvent.click(getOption(r, 'Gamma'));

        await expect.element(getOption(r, 'Gamma')).toHaveAttribute('aria-selected', 'false');
      });
    });

    it('follows the DOM order when options are reordered', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options}</Listbox>);
      r.rerender(<Listbox data-testid={LISTBOX} aria-label='Letters'>{[...options].reverse()}</Listbox>);

      getListbox(r).focus();

      await toBeActive(r, 'Delta');
    });
  });

  describe('Edge Cases', () => {
    it('does not let an option opt out of a disabled list', async () => {
      const onChangeValue = vi.fn();
      const r = render(<Listbox aria-label='Letters' disabled onChangeValue={onChangeValue}><ListboxOption value='a' disabled={false}>Alpha</ListboxOption></Listbox>);

      getOption(r, 'Alpha').click();

      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('clears a controlled value with null', () => {
      const r = render(<Listbox aria-label='Letters' value='a'>{options}</Listbox>);

      expect(getOption(r, 'Alpha').getAttribute('aria-selected')).toBe('true');

      r.rerender(<Listbox aria-label='Letters' value={null}>{options}</Listbox>);

      expect(getOption(r, 'Alpha').getAttribute('aria-selected')).toBe('false');
    });

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

    it('drops the active option when it is removed', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options}</Listbox>);

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');

      r.rerender(<Listbox data-testid={LISTBOX} aria-label='Letters'>{options.slice(1)}</Listbox>);

      await expect.poll(() => getListbox(r).hasAttribute('aria-activedescendant')).toBe(false);
    });

    it('scrolls the active option into view inside the list only', async () => {
      const many = Array.from({ length: 50 }, (_, index) => (
        <ListboxOption key={index} value={index}>{`Item ${index}`}</ListboxOption>
      ));
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Items' style={{ height: 100 }}>{many}</Listbox>);

      getListbox(r).focus();
      await userEvent.keyboard('{End}');

      await expect.poll(() => getListbox(r).scrollTop).toBeGreaterThan(0);
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

    it('starts from the selected option', async () => {
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' defaultValue='c'>{options}</Listbox>);

      getListbox(r).focus();

      await toBeActive(r, 'Gamma');
    });

    it('moves with arrows without selecting, skips disabled and stops at the ends', async () => {
      const onChangeValue = vi.fn();
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' onChangeValue={onChangeValue}>{options}</Listbox>);

      getListbox(r).focus();
      await userEvent.keyboard('{ArrowDown}');
      await toBeActive(r, 'Gamma');
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await toBeActive(r, 'Delta');

      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('selects the active option with Enter and Space', async () => {
      const onChangeValue = vi.fn();
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' onChangeValue={onChangeValue}>{options}</Listbox>);

      getListbox(r).focus();
      await toBeActive(r, 'Alpha');
      await userEvent.keyboard('{Enter}');
      expect(onChangeValue).toHaveBeenLastCalledWith('a');

      await userEvent.keyboard('{End} ');
      expect(onChangeValue).toHaveBeenLastCalledWith('d');
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

    it('exposes multiple selection and toggles with Space and Enter without losing the others', async () => {
      const onChangeValue = vi.fn();
      const r = render(<Listbox data-testid={LISTBOX} aria-label='Letters' multiple defaultValue={['d', 'c']} onChangeValue={onChangeValue}>{options}</Listbox>);

      await expect.element(getListbox(r)).toHaveAttribute('aria-multiselectable', 'true');

      getListbox(r).focus();
      await toBeActive(r, 'Gamma');

      await userEvent.keyboard('{Home}');
      expect(onChangeValue).not.toHaveBeenCalled();

      await userEvent.keyboard(' ');
      expect(onChangeValue).toHaveBeenLastCalledWith(['d', 'c', 'a']);

      await userEvent.keyboard('{Enter}');
      expect(onChangeValue).toHaveBeenLastCalledWith(['d', 'c']);
    });

    it('exposes a named group', async () => {
      const r = render(
        <Listbox data-testid={LISTBOX} aria-label='Letters'>
          <ListboxGroup aria-label='Greek'>{options}</ListboxGroup>
        </Listbox>,
      );

      await expect.element(r.getByRole('group', { name: 'Greek' })).toBeVisible();
    });
  });
});
