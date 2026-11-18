import { ComponentProps, FC, MouseEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Separator } from '../../Separator';
import { Menu } from '../Menu';
import { MenuCheckboxItem, MenuContent, MenuItem, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuTrigger } from '../components';

afterEach(cleanup);

interface MenuTestProps extends Partial<ComponentProps<typeof Menu>> {
  onUndo?: (event: MouseEvent) => void
  onRedo?: () => void
  onRuler?: (checked: boolean) => void
  onZoom?: (value: string) => void
  label?: string
}

const MenuTest: FC<MenuTestProps> = ({ onUndo, onRedo, onRuler, onZoom, label, ...props }) => (
  <>
    <button type='button'>before</button>
    <Menu {...props}>
      <MenuTrigger>Edit</MenuTrigger>
      <MenuContent aria-label={label}>
        <MenuItem onClick={onUndo}>Undo</MenuItem>
        <MenuItem disabled onClick={onRedo}>Redo</MenuItem>
        <Separator />
        <MenuCheckboxItem defaultChecked onChangeChecked={onRuler}><MenuItemIndicator />Ruler</MenuCheckboxItem>
        <MenuRadioGroup aria-label='Zoom' defaultValue='fit' onChangeValue={onZoom}>
          <MenuRadioItem value='fit'><MenuItemIndicator />Fit</MenuRadioItem>
          <MenuRadioItem value='100'><MenuItemIndicator />Actual size</MenuRadioItem>
        </MenuRadioGroup>
        <MenuItem asChild><a href='#help'>Help</a></MenuItem>
      </MenuContent>
    </Menu>
    <input aria-label='after' />
  </>
);

const trigger = () => document.querySelector<HTMLButtonElement>('[aria-haspopup="menu"]')!;
const menu = () => document.querySelector<HTMLElement>('[role="menu"]')!;
const item = (name: string) => [...menu().querySelectorAll<HTMLElement>('[role^="menuitem"]')].find((element) => element.textContent === name)!;
const isOpen = () => menu().matches(':popover-open');

const openWithKeyboard = async () => {
  trigger().focus();
  await userEvent.keyboard('{Enter}');
  await expect.poll(() => document.activeElement).toBe(item('Undo'));
};

describe('Critical User Paths', () => {
  it('opens on Enter with the focus on the first item, moves with the arrows around the ends and closes on Escape back on the trigger', async () => {
    render(<MenuTest />);

    await openWithKeyboard();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(item('Redo'));

    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    expect(document.activeElement).toBe(item('Help'));

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(item('Undo'));

    await userEvent.keyboard('{End}');
    expect(document.activeElement).toBe(item('Help'));

    await userEvent.keyboard('{Home}');
    expect(document.activeElement).toBe(item('Undo'));

    await userEvent.keyboard('{Escape}');
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger());
    await expect.poll(() => trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('opens on the Down arrow at the first item and on the Up arrow at the last one', async () => {
    render(<MenuTest />);

    trigger().focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(item('Undo'));

    await userEvent.keyboard('{Escape}{ArrowUp}');
    expect(document.activeElement).toBe(item('Help'));
  });

  it('opens on a click with the focus on the first item and follows the pointer with the focus', async () => {
    render(<MenuTest />);

    await userEvent.click(trigger());
    await expect.poll(() => document.activeElement).toBe(item('Undo'));

    await userEvent.hover(item('Ruler'));
    expect(document.activeElement).toBe(item('Ruler'));
  });

  it('runs an item on a click, Enter or Space, closes the menu and gives the focus back to the trigger', async () => {
    const onUndo = vi.fn();
    render(<MenuTest onUndo={onUndo} />);

    for (const press of [() => userEvent.click(item('Undo')), () => userEvent.keyboard('{Enter}'), () => userEvent.keyboard(' ')]) {
      await openWithKeyboard();
      await press();
      expect(isOpen()).toBe(false);
      expect(document.activeElement).toBe(trigger());
    }

    expect(onUndo).toHaveBeenCalledTimes(3);
  });

  it('toggles a checkbox item on Space without closing and on Enter with closing', async () => {
    const onRuler = vi.fn();
    render(<MenuTest onRuler={onRuler} />);

    await openWithKeyboard();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    expect(document.activeElement).toBe(item('Ruler'));
    expect(item('Ruler').getAttribute('aria-checked')).toBe('true');

    await userEvent.keyboard(' ');
    expect(onRuler).toHaveBeenCalledExactlyOnceWith(false);
    expect(item('Ruler').getAttribute('aria-checked')).toBe('false');
    expect(isOpen()).toBe(true);
    expect(document.activeElement).toBe(item('Ruler'));

    await userEvent.keyboard('{Enter}');
    expect(onRuler).toHaveBeenLastCalledWith(true);
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger());
  });

  it('checks one radio item of the group on Space without closing and on a click with closing', async () => {
    const onZoom = vi.fn();
    render(<MenuTest onZoom={onZoom} />);

    await openWithKeyboard();
    await userEvent.keyboard('{End}{ArrowUp}');
    expect(document.activeElement).toBe(item('Actual size'));

    await userEvent.keyboard(' ');
    expect(onZoom).toHaveBeenCalledExactlyOnceWith('100');
    expect(item('Actual size').getAttribute('aria-checked')).toBe('true');
    expect(item('Fit').getAttribute('aria-checked')).toBe('false');
    expect(isOpen()).toBe(true);

    await userEvent.click(item('Fit'));
    expect(onZoom).toHaveBeenLastCalledWith('fit');
    expect(isOpen()).toBe(false);
  });

  it('moves the focus to the next item whose label starts with the typed character, disabled ones too', async () => {
    render(<MenuTest />);

    await openWithKeyboard();
    await userEvent.keyboard('r');
    expect(document.activeElement).toBe(item('Redo'));

    await userEvent.keyboard('r');
    expect(document.activeElement).toBe(item('Ruler'));
  });
});

describe('Error handling', () => {
  it('keeps a disabled item focusable and leaves the menu open when it is pressed', async () => {
    const onRedo = vi.fn();
    render(<MenuTest onRedo={onRedo} />);

    await openWithKeyboard();
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(item('Redo'));

    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await userEvent.click(item('Redo'), { force: true });
    expect(onRedo).not.toHaveBeenCalled();
    expect(isOpen()).toBe(true);
  });
});

describe('Edge Cases', () => {
  it('closes on Tab with the focus moving on past the trigger, and on Shift+Tab with the focus on the trigger', async () => {
    const result = render(<MenuTest />);

    await openWithKeyboard();
    await userEvent.tab();
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(result.getByRole('textbox', { name: 'after' }));

    await openWithKeyboard();
    await userEvent.tab({ shift: true });
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger());
  });

  it('keeps the menu open with the focus inside on a click between the items, and moves on with the arrows', async () => {
    render(<MenuTest />);

    await openWithKeyboard();
    await userEvent.click(menu().querySelector('[role="separator"]')!);
    expect(isOpen()).toBe(true);
    expect(menu().contains(document.activeElement)).toBe(true);

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(item('Undo'));
  });

  it('keeps the menu open when onClick of an item calls preventDefault', async () => {
    render(<MenuTest onUndo={(event) => event.preventDefault()} />);

    await openWithKeyboard();
    await userEvent.keyboard('{Enter}');
    expect(isOpen()).toBe(true);
  });

  it('shows and hides the menu when a controlled parent changes open', async () => {
    const result = render(<MenuTest open={false} />);

    result.rerender(<MenuTest open />);
    await expect.poll(() => document.activeElement).toBe(item('Undo'));

    result.rerender(<MenuTest open={false} />);
    expect(isOpen()).toBe(false);
  });
});

describe('Accessibility', () => {
  it('wires the menu button to the menu and gives every item its role and no tab stop', () => {
    render(<MenuTest />);

    expect(trigger().getAttribute('aria-controls')).toBe(menu().id);
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(menu().getAttribute('aria-labelledby')).toBe(trigger().id);
    expect(item('Undo').getAttribute('role')).toBe('menuitem');
    expect(item('Redo').getAttribute('aria-disabled')).toBe('true');
    expect(item('Redo').hasAttribute('disabled')).toBe(false);
    expect(item('Ruler').getAttribute('role')).toBe('menuitemcheckbox');
    expect(item('Fit').getAttribute('role')).toBe('menuitemradio');
    expect(item('Help').tagName).toBe('A');
    expect([...menu().querySelectorAll('[role^="menuitem"]')].every((element) => element.getAttribute('tabindex') === '-1')).toBe(true);
  });

  it('names the menu by aria-label instead of the trigger when you pass one', () => {
    render(<MenuTest label='Edit actions' />);

    expect(menu().getAttribute('aria-label')).toBe('Edit actions');
    expect(menu().hasAttribute('aria-labelledby')).toBe(false);
  });
});
