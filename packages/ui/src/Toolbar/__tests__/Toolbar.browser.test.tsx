import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { server, userEvent } from 'vitest/browser';

import { Button } from '../../Button';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../../Menu';
import { Separator } from '../../Separator';
import { TextField, TextFieldInput } from '../../TextField';
import { Toolbar, ToolbarItem, ToolbarOrientation } from '..';

afterEach(cleanup);

const pressTab = (shift = false) => {
  const tab = server.browser === 'webkit' ? '{Alt>}{Tab}{/Alt}' : '{Tab}';
  return userEvent.keyboard(shift ? `{Shift>}${tab}{/Shift}` : tab);
};

const Formatting = ({ orientation, onBold, onInsert }: { orientation?: ToolbarOrientation, onBold?: () => void, onInsert?: () => void }) => (
  <>
    <button type='button'>Before</button>
    <Toolbar aria-label='Formatting' orientation={orientation}>
      <ToolbarItem asChild>
        <Button onClick={onBold}>Bold</Button>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Button>Italic</Button>
      </ToolbarItem>
      <Separator orientation='vertical' />
      <ToolbarItem asChild>
        <Button onClick={onInsert}>Insert</Button>
      </ToolbarItem>
      <ToolbarItem asChild disabled>
        <Button>Comment</Button>
      </ToolbarItem>
      <Menu>
        <ToolbarItem asChild>
          <MenuTrigger>More</MenuTrigger>
        </ToolbarItem>
        <MenuContent>
          <MenuItem>Clear formatting</MenuItem>
          <MenuItem>Print</MenuItem>
        </MenuContent>
      </Menu>
    </Toolbar>
    <button type='button'>After</button>
  </>
);

const button = (name: string) => [...document.querySelectorAll<HTMLElement>('button')].find((element) => element.textContent === name)!;

describe('Critical User Paths', () => {
  it('takes one Tab stop and moves the focus with the arrows across its items, skipping a disabled one', async () => {
    render(<Formatting />);
    button('Before').focus();

    await pressTab();
    expect(document.activeElement).toBe(button('Bold'));

    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(button('Italic'));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(button('Insert'));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(button('More'));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(button('Bold'));
    await userEvent.keyboard('{End}');
    expect(document.activeElement).toBe(button('More'));

    await pressTab();
    expect(document.activeElement).toBe(button('After'));
    await pressTab(true);
    expect(document.activeElement).toBe(button('More'));
  });

  it('runs an item with Enter and Space, as its own button does', async () => {
    const onBold = vi.fn();
    const onInsert = vi.fn();
    render(<Formatting onBold={onBold} onInsert={onInsert} />);
    button('Bold').focus();

    await userEvent.keyboard(' ');
    expect(onBold).toHaveBeenCalledOnce();

    await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');
    expect(onInsert).toHaveBeenCalledOnce();
  });

  it('opens a menu on its item with the Down arrow and keeps the arrows inside the open menu', async () => {
    render(<Formatting />);
    button('More').focus();

    await userEvent.keyboard('{ArrowDown}');
    const clear = [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find((element) => element.textContent === 'Clear formatting')!;
    expect(document.activeElement).toBe(clear);

    await userEvent.keyboard('{ArrowRight}{ArrowLeft}');
    expect(document.activeElement).toBe(clear);

    await userEvent.keyboard('{Escape}');
    expect(document.activeElement).toBe(button('More'));
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(button('Insert'));
  });
});

describe('Edge Cases', () => {
  it('leaves the arrows of a text field inside it to the caret', async () => {
    const result = render(
      <Toolbar aria-label='Find'>
        <ToolbarItem asChild><Button>Previous</Button></ToolbarItem>
        <TextField>
          <ToolbarItem asChild><TextFieldInput aria-label='Search' defaultValue='report' /></ToolbarItem>
        </TextField>
        <ToolbarItem asChild><Button>Next</Button></ToolbarItem>
      </Toolbar>,
    );
    const field = result.getByRole('textbox', { name: 'Search' }) as HTMLInputElement;
    field.focus();
    field.setSelectionRange(6, 6);

    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(field);
    expect(field.selectionStart).toBe(5);
  });

  it('moves the focus with the Up and Down arrows when vertical', async () => {
    render(<Formatting orientation='vertical' />);
    button('Bold').focus();

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Italic'));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(button('Italic'));
  });
});

describe('Accessibility', () => {
  it('is a toolbar with its orientation and the name you pass, and disables a disabled item for real', () => {
    const result = render(<Formatting />);

    const toolbar = result.getByRole('toolbar', { name: 'Formatting' });
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
    expect((button('Comment') as HTMLButtonElement).disabled).toBe(true);
    expect([...toolbar.querySelectorAll('[tabindex="0"]')]).toEqual([button('Bold')]);
  });
});
