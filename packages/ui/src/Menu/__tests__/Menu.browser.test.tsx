import { ComponentProps, FC, MouseEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Separator } from '../../Separator';
import { CheckIcon } from '@vega-ui/icons';
import { Menu } from '../Menu';
import { MenuCheckboxItem, MenuContent, MenuItem, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuSubmenu, MenuSubmenuTrigger, MenuTrigger } from '../components';

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
        <MenuCheckboxItem defaultChecked onChangeChecked={onRuler}><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Ruler</MenuCheckboxItem>
        <MenuRadioGroup aria-label='Zoom' defaultValue='fit' onChangeValue={onZoom}>
          <MenuRadioItem value='fit'><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Fit</MenuRadioItem>
          <MenuRadioItem value='100'><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Actual size</MenuRadioItem>
        </MenuRadioGroup>
        <MenuItem asChild><a href='#help'>Help</a></MenuItem>
      </MenuContent>
    </Menu>
    <input aria-label='after' />
  </>
);

interface SubmenuTestProps {
  onEmail?: () => void
  onShare?: () => void
}

const SubmenuTest: FC<SubmenuTestProps> = ({ onEmail, onShare }) => (
  <div>
    <Menu>
      <MenuTrigger>File</MenuTrigger>
      <MenuContent>
        <MenuItem>New</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger onClick={onShare}>Share</MenuSubmenuTrigger>
          <MenuContent>
            <MenuItem onClick={onEmail}>Email</MenuItem>
            <MenuItem>Messages</MenuItem>
          </MenuContent>
        </MenuSubmenu>
        <MenuSubmenu>
          <MenuSubmenuTrigger>Export</MenuSubmenuTrigger>
          <MenuContent>
            <MenuItem>PDF</MenuItem>
          </MenuContent>
        </MenuSubmenu>
        <MenuItem>Print</MenuItem>
      </MenuContent>
    </Menu>
    <input aria-label='after' />
  </div>
);

const menus = () => [...document.querySelectorAll<HTMLElement>('[role="menu"]')]
const menuItem = (name: string) => [...document.querySelectorAll<HTMLElement>('[role^="menuitem"]')].find((element) => element.textContent === name)!
const isShown = (element: HTMLElement) => element.matches(':popover-open')

const openFile = async () => {
  document.querySelector<HTMLElement>('[aria-haspopup="menu"]:not([role])')!.focus();
  await userEvent.keyboard('{Enter}');
  await expect.poll(() => document.activeElement).toBe(menuItem('New'));
};

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

  it('gives the focus to the item under the pointer without the keyboard focus ring, after a menu opened with the keyboard', async () => {
    render(<MenuTest />);

    await openWithKeyboard();
    await userEvent.hover(item('Ruler'));

    expect(document.activeElement).toBe(item('Ruler'));
    expect(item('Ruler').matches(':focus-visible')).toBe(false);
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

  it('toggles a checkbox item on Space, Enter or a click and keeps the menu open', async () => {
    const onRuler = vi.fn();
    render(<MenuTest onRuler={onRuler} />);

    await openWithKeyboard();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    expect(document.activeElement).toBe(item('Ruler'));
    expect(item('Ruler').getAttribute('aria-checked')).toBe('true');

    await userEvent.keyboard(' ');
    expect(onRuler).toHaveBeenCalledExactlyOnceWith(false);
    expect(item('Ruler').getAttribute('aria-checked')).toBe('false');

    await userEvent.keyboard('{Enter}');
    expect(onRuler).toHaveBeenLastCalledWith(true);

    await userEvent.click(item('Ruler'));
    expect(onRuler).toHaveBeenLastCalledWith(false);
    expect(isOpen()).toBe(true);
    expect(document.activeElement).toBe(item('Ruler'));
  });

  it('checks one radio item of the group on Space or a click and keeps the menu open', async () => {
    const onZoom = vi.fn();
    render(<MenuTest onZoom={onZoom} />);

    await openWithKeyboard();
    await userEvent.keyboard('{End}{ArrowUp}');
    expect(document.activeElement).toBe(item('Actual size'));

    await userEvent.keyboard(' ');
    expect(onZoom).toHaveBeenCalledExactlyOnceWith('100');
    expect(item('Actual size').getAttribute('aria-checked')).toBe('true');
    expect(item('Fit').getAttribute('aria-checked')).toBe('false');

    await userEvent.click(item('Fit'));
    expect(onZoom).toHaveBeenLastCalledWith('fit');
    expect(isOpen()).toBe(true);
  });

  it('checks a checkbox or radio item with keepOpen false on a click or Enter and closes the menu', async () => {
    const onGrid = vi.fn();
    const onFill = vi.fn();
    render(
      <Menu>
        <MenuTrigger>View</MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem keepOpen={false} onChangeChecked={onGrid}><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Grid</MenuCheckboxItem>
          <MenuRadioGroup aria-label='Zoom' defaultValue='fit' onChangeValue={onFill}>
            <MenuRadioItem keepOpen={false} value='fit'><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Fit</MenuRadioItem>
            <MenuRadioItem keepOpen={false} value='fill'><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Fill</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>,
    );

    await userEvent.click(trigger());
    await userEvent.click(item('Grid'));
    expect(onGrid).toHaveBeenCalledExactlyOnceWith(true);
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger());

    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{Enter}');
    expect(onFill).toHaveBeenCalledExactlyOnceWith('fill');
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

  it('opens a submenu with the arrow into it, closes only it on Escape, and closes every menu back on the menu button when its item runs', async () => {
    const onEmail = vi.fn();
    render(<SubmenuTest onEmail={onEmail} />);

    await openFile();
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    expect(document.activeElement).toBe(menuItem('Email'));
    expect(menuItem('Share').getAttribute('aria-expanded')).toBe('true');

    await userEvent.keyboard('{Escape}');
    expect(document.activeElement).toBe(menuItem('Share'));
    expect(isShown(menus()[0])).toBe(true);

    await userEvent.keyboard(' ');
    await userEvent.keyboard('{Enter}');
    expect(onEmail).toHaveBeenCalledOnce();
    expect(menus().some(isShown)).toBe(false);
    expect(document.activeElement).toBe(document.querySelector('[aria-haspopup="menu"]:not([role])'));
  });

  it('opens a submenu when the pointer rests on its item or clicks it, and closes it when the pointer takes another item', async () => {
    const onShare = vi.fn();
    render(<SubmenuTest onShare={onShare} />);

    await openFile();
    await userEvent.hover(menuItem('Share'));
    await expect.poll(() => isShown(menus()[1])).toBe(true);
    expect(document.activeElement).toBe(menuItem('Share'));

    await userEvent.hover(menuItem('Messages'));
    expect(document.activeElement).toBe(menuItem('Messages'));

    await userEvent.hover(menuItem('Print'));
    await expect.poll(() => isShown(menus()[1])).toBe(false);
    expect(document.activeElement).toBe(menuItem('Print'));

    await userEvent.click(menuItem('Share'));
    expect(isShown(menus()[1])).toBe(true);
    expect(onShare).toHaveBeenCalledOnce();
  });

  it('keeps a submenu open while the pointer crosses another submenu item on its way into it', async () => {
    render(<SubmenuTest />);

    await openFile();
    await userEvent.hover(menuItem('Share'));
    await expect.poll(() => isShown(menus()[1])).toBe(true);

    const share = menuItem('Share');
    const exporting = menuItem('Export');
    const from = share.getBoundingClientRect();
    const to = exporting.getBoundingClientRect();
    const leave = { bubbles: true, pointerType: 'mouse', clientX: from.right - 2, clientY: from.bottom - 1 };
    const over = { bubbles: true, pointerType: 'mouse', clientX: from.right - 1, clientY: to.top + 4 };

    share.dispatchEvent(new PointerEvent('pointerout', { ...leave, relatedTarget: exporting }));
    exporting.dispatchEvent(new PointerEvent('pointerover', { ...over, relatedTarget: share }));
    await new Promise((resolve) => setTimeout(resolve, 20));
    exporting.dispatchEvent(new PointerEvent('pointermove', over));
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(isShown(menus()[1])).toBe(true);
    expect(isShown(menus()[2])).toBe(false);
    expect(document.activeElement).toBe(share);
  });

  it('closes every menu on Tab from a submenu', async () => {
    const result = render(<SubmenuTest />);

    await openFile();
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    await userEvent.tab();
    expect(menus().some(isShown)).toBe(false);
    expect(document.activeElement).toBe(result.getByRole('textbox', { name: 'after' }));
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

  it('wires a submenu item to its submenu, which its item names', () => {
    render(<SubmenuTest />);

    const share = menuItem('Share');
    expect(share.getAttribute('role')).toBe('menuitem');
    expect(share.getAttribute('aria-haspopup')).toBe('menu');
    expect(share.getAttribute('aria-expanded')).toBe('false');
    expect(share.getAttribute('aria-controls')).toBe(menus()[1].id);
    expect(menus()[1].getAttribute('aria-labelledby')).toBe(share.id);
  });

  it('names the menu by aria-label instead of the trigger when you pass one', () => {
    render(<MenuTest label='Edit actions' />);

    expect(menu().getAttribute('aria-label')).toBe('Edit actions');
    expect(menu().hasAttribute('aria-labelledby')).toBe(false);
  });
});
