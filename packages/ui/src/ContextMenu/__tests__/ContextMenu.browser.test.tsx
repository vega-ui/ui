import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Menu, MenuContent, MenuItem, MenuSubmenu, MenuSubmenuTrigger, MenuTrigger } from '../../Menu';
import { ContextMenu } from '../ContextMenu';
import { ContextMenuTrigger } from '../components';

afterEach(cleanup);

interface FileAreaProps {
  onRename?: () => void
  onEmail?: () => void
  onMore?: () => void
}

const FileArea = ({ onRename, onEmail, onMore }: FileAreaProps) => (
  <ContextMenu>
    <ContextMenuTrigger style={{ width: 300, height: 200 }}>
      <button type='button'>Q3 report.pdf</button>
      <Menu>
        <MenuTrigger>More</MenuTrigger>
        <MenuContent>
          <MenuItem onClick={onMore}>Download</MenuItem>
        </MenuContent>
      </Menu>
    </ContextMenuTrigger>
    <MenuContent aria-label='File actions'>
      <MenuItem onClick={onRename}>Rename</MenuItem>
      <MenuSubmenu>
        <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
        <MenuContent>
          <MenuItem onClick={onEmail}>Email</MenuItem>
        </MenuContent>
      </MenuSubmenu>
      <MenuItem>Delete</MenuItem>
    </MenuContent>
  </ContextMenu>
);

const menu = () => document.querySelector<HTMLElement>('[role="menu"][aria-label="File actions"]')!;
const item = (name: string) => [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find((element) => element.textContent === name)!;
const isOpen = (element: Element) => element.matches(':popover-open');

const openFrom = async (target: Element) => {
  let opener: Element | null = null;
  const remember = () => {
    opener = document.activeElement;
  };
  document.addEventListener('contextmenu', remember, { capture: true, once: true });
  await userEvent.click(target, { button: 'right' });
  return opener;
};

const pointerDown = (target: Element, pointerType: string, x: number, y: number) => target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType, pointerId: 7, isPrimary: true, button: 0, buttons: 1, clientX: x, clientY: y }));

describe('Critical User Paths', () => {
  it('opens at the point of a right click instead of the menu of the browser, with the focus on the first item', async () => {
    const result = render(<FileArea />);
    const area = result.getByRole('button', { name: 'Q3 report.pdf' }).parentElement!;
    const prevented = vi.fn();
    const listen = (event: Event) => prevented(event.defaultPrevented);
    document.addEventListener('contextmenu', listen);

    await userEvent.click(area, { button: 'right', position: { x: 120, y: 90 } });

    expect(menu().matches(':popover-open')).toBe(true);
    expect(document.activeElement).toBe(item('Rename'));
    expect(prevented).toHaveBeenCalledWith(true);
    document.removeEventListener('contextmenu', listen);

    const box = area.getBoundingClientRect();
    const rect = menu().getBoundingClientRect();
    expect(rect.left).toBeLessThan(box.left + 120);
    expect(rect.top).toBeLessThan(box.top + 90);
    expect(document.elementFromPoint(box.left + 120, box.top + 90)).toBe(menu());
  });

  it('gives the focus back to the element that had it when the menu opened, on Escape or after an item runs', async () => {
    const onRename = vi.fn();
    const result = render(<FileArea onRename={onRename} />);
    const file = result.getByRole('button', { name: 'Q3 report.pdf' });

    file.focus();
    const opener = await openFrom(file);
    expect(document.activeElement).toBe(item('Rename'));
    await userEvent.keyboard('{Escape}');
    expect(menu().matches(':popover-open')).toBe(false);
    await expect.poll(() => document.activeElement).toBe(opener);

    const again = await openFrom(file);
    await userEvent.keyboard('{Enter}');
    expect(onRename).toHaveBeenCalledOnce();
    expect(menu().matches(':popover-open')).toBe(false);
    await expect.poll(() => document.activeElement).toBe(again);
  });

  it('closes when Shift+Tab moves the focus from the menu back into the area', async () => {
    const result = render(<FileArea />);
    const file = result.getByRole('button', { name: 'Q3 report.pdf' });

    file.focus();
    await openFrom(file);
    expect(document.activeElement).toBe(item('Rename'));

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    expect(menu().matches(':popover-open')).toBe(false);
  });

  it('runs an item of a submenu and closes every menu', async () => {
    const onEmail = vi.fn();
    const result = render(<FileArea onEmail={onEmail} />);
    const file = result.getByRole('button', { name: 'Q3 report.pdf' });

    file.focus();
    await openFrom(file);
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    expect(document.activeElement).toBe(item('Email'));
    await userEvent.keyboard('{Enter}');

    expect(onEmail).toHaveBeenCalledOnce();
    expect(isOpen(menu())).toBe(false);
    expect(isOpen(item('Email').closest('[role="menu"]')!)).toBe(false);
  });

  it('leaves a menu button inside the area to its own menu, and opens the context menu on a right click on it', async () => {
    const onMore = vi.fn();
    const result = render(<FileArea onMore={onMore} />);
    const more = result.getByRole('button', { name: 'More' });

    await userEvent.click(more);
    expect(isOpen(item('Download').closest('[role="menu"]')!)).toBe(true);
    expect(isOpen(menu())).toBe(false);
    await userEvent.keyboard('{Enter}');
    expect(onMore).toHaveBeenCalledOnce();

    await userEvent.click(more, { button: 'right' });
    expect(isOpen(menu())).toBe(true);
    expect(isOpen(item('Download').closest('[role="menu"]')!)).toBe(false);
  });

  it('opens at the point of a long touch', async () => {
    const result = render(<FileArea />);
    const area = result.getByRole('button', { name: 'Q3 report.pdf' }).parentElement!;
    const box = area.getBoundingClientRect();

    pointerDown(area, 'touch', box.left + 60, box.top + 40);
    await expect.poll(() => menu().matches(':popover-open'), { timeout: 2000 }).toBe(true);
    expect(document.elementFromPoint(box.left + 60, box.top + 40)).toBe(menu());
    area.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch', pointerId: 7, clientX: box.left + 60, clientY: box.top + 40 }));
  });
});

describe('Edge Cases', () => {
  it('leaves a right click and a long touch on a text field inside the area to the browser, for its own menu and the selection', async () => {
    const result = render(
      <ContextMenu>
        <ContextMenuTrigger>
          <input aria-label='File name' defaultValue='Q3 report.pdf' />
        </ContextMenuTrigger>
        <MenuContent aria-label='File actions'>
          <MenuItem>Rename</MenuItem>
        </MenuContent>
      </ContextMenu>,
    );
    const field = result.getByRole('textbox', { name: 'File name' });
    const prevented = vi.fn();
    const listen = (event: Event) => prevented(event.defaultPrevented);
    document.addEventListener('contextmenu', listen);

    await userEvent.click(field, { button: 'right' });
    document.removeEventListener('contextmenu', listen);
    expect(prevented).toHaveBeenCalledWith(false);
    expect(isOpen(menu())).toBe(false);

    const box = field.getBoundingClientRect();
    pointerDown(field, 'touch', box.left + 10, box.top + 5);
    await new Promise((resolve) => setTimeout(resolve, 800));
    expect(isOpen(menu())).toBe(false);
    field.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch', pointerId: 7, clientX: box.left + 10, clientY: box.top + 5 }));
  });

  it('opens at the point inside a transformed container, which would move a fixed element with it', async () => {
    const result = render(<div style={{ transform: 'translateZ(0)', margin: 120 }}><FileArea /></div>);
    const area = result.getByRole('button', { name: 'Q3 report.pdf' }).parentElement!;

    await userEvent.click(area, { button: 'right', position: { x: 100, y: 80 } });

    const box = area.getBoundingClientRect();
    expect(document.elementFromPoint(box.left + 100, box.top + 80)).toBe(menu());
  });

  it('turns toward the page near the corner of the viewport and stays open under the pointer', async () => {
    const result = render(<FileArea />);
    const area = result.getByRole('button', { name: 'Q3 report.pdf' }).parentElement!;
    area.style.position = 'fixed';
    area.style.right = '0';
    area.style.bottom = '0';

    await userEvent.click(area, { button: 'right', position: { x: 288, y: 188 } });

    const box = area.getBoundingClientRect();
    const rect = menu().getBoundingClientRect();
    expect(menu().matches(':popover-open')).toBe(true);
    expect(rect.right).toBeGreaterThan(box.left + 288);
    expect(rect.bottom).toBeGreaterThan(box.top + 188);
    expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
    expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
  });

  it('lets no key reach the menu while it fades out, when there is no element to give the focus back to', async () => {
    document.documentElement.dataset.motion = '';
    try {
      const onRename = vi.fn();
      const result = render(<FileArea onRename={onRename} />);
      const area = result.getByRole('button', { name: 'Q3 report.pdf' }).parentElement!;

      await userEvent.click(area, { button: 'right', position: { x: 200, y: 150 } });
      expect(document.activeElement).toBe(item('Rename'));
      await userEvent.keyboard('{Escape}');
      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(menu().contains(document.activeElement)).toBe(false);
      await userEvent.keyboard('{Enter}');
      expect(onRename).not.toHaveBeenCalled();
    } finally {
      delete document.documentElement.dataset.motion;
    }
  });
});

describe('Accessibility', () => {
  it('leaves the area without menu button semantics and names the menu only by the label you pass', () => {
    const result = render(<FileArea />);
    const area = result.getByRole('button', { name: 'Q3 report.pdf' }).parentElement!;

    expect(area.getAttribute('role')).toBeNull();
    expect(area.getAttribute('aria-haspopup')).toBeNull();
    expect(menu().getAttribute('aria-labelledby')).toBeNull();
    expect(menu().getAttribute('aria-label')).toBe('File actions');
  });
});
