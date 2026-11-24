import { ComponentProps, FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { Popover } from '../Popover';
import { PopoverAnchor, PopoverClose, PopoverTrigger, PopoverContent } from '../components';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';

const CONTENT_TEXT = 'Popover content';
const TRIGGER_TEXT = 'Open popover';

const PopoverTest: FC<Partial<ComponentProps<typeof Popover>>> = (props) => {
  return (
    <Popover {...props}>
      <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>

      <PopoverContent data-testid={TESTID_CONTENT}>
        <button type='button'>Focusable</button>
        <div>{CONTENT_TEXT}</div>
      </PopoverContent>
    </Popover>
  );
};

const getTrigger = (view: RenderResult) => view.getByTestId(TESTID_TRIGGER) as HTMLButtonElement;
const getContent = (view: RenderResult) => view.getByTestId(TESTID_CONTENT) as HTMLDivElement;
const getFocusableInside = (view: RenderResult) => view.getByRole('button', { name: 'Focusable' }) as HTMLButtonElement;

const openByTrigger = async (view: RenderResult) => {
  await userEvent.click(getTrigger(view));
};

const closeByEscape = async () => {
  await userEvent.keyboard('{Escape}');
};

const closeByOutsideClick = async () => {
  await userEvent.click(document.body);
};

const waitOpened = async (view: RenderResult) => {
  await expect.element(getContent(view)).toBeVisible()
  await expect.element(getContent(view)).toHaveAttribute('data-status', 'open')
  await expect.poll(() => getContent(view).matches(':popover-open')).toBe(true)
};

const waitClosed = async () => {
  await expect.element(page.getByTestId(TESTID_CONTENT)).not.toBeVisible()
  await expect.element(page.getByText(CONTENT_TEXT)).not.toBeInTheDocument()
};

describe('Popover', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let view: RenderResult;

      beforeEach(() => {
        view = render(<PopoverTest />);
      });

      it('closes on outside click', async () => {
        await openByTrigger(view);
        await waitOpened(view);

        await closeByOutsideClick();
        await waitClosed();
      });

      it('closes on a second trigger click', async () => {
        await openByTrigger(view);
        await waitOpened(view);

        await openByTrigger(view);
        await waitClosed();
      });
    });

    describe('uncontrolled (defaultOpen=true)', () => {
      let view: RenderResult;

      beforeEach(() => {
        view = render(<PopoverTest defaultOpen />);
      });

      it('closes on outside click', async () => {
        await waitOpened(view);

        await closeByOutsideClick();
        await waitClosed();
      });
    });

    describe('controlled', () => {
      let view: RenderResult;

      beforeEach(() => {
        view = render(<PopoverTest open={false} />);
      });

      it('opens for good on a trigger click while open=false, as a native popover does', async () => {
        await waitClosed();

        await openByTrigger(view);

        await expect.poll(() => getContent(view).matches(':popover-open')).toBe(true);
        await expect.element(view.getByText(CONTENT_TEXT)).toBeVisible();
      });

      it('calls onChangeOpen(false) on outside click when open=true', async () => {
        const onChangeOpen = vi.fn();
        view.rerender(<PopoverTest open onChangeOpen={onChangeOpen} />);

        await waitOpened(view);

        await closeByOutsideClick();

        await expect.poll(() => onChangeOpen).toHaveBeenCalled();
        expect(onChangeOpen).toHaveBeenLastCalledWith(false);
      });

      it('closes for good on an outside click and opens again once open changes', async () => {
        view.rerender(<PopoverTest open />);
        await waitOpened(view);

        await closeByOutsideClick();
        await expect.poll(() => getContent(view).matches(':popover-open')).toBe(false);
        await expect.element(getContent(view)).toHaveAttribute('data-status', 'close');

        view.rerender(<PopoverTest open={false} />);
        view.rerender(<PopoverTest open />);
        await waitOpened(view);
      });

      it('calls onChangeOpen(false) on Escape when open=true', async () => {
        const onChangeOpen = vi.fn();
        view.rerender(<PopoverTest open onChangeOpen={onChangeOpen} />);

        await waitOpened(view);

        await closeByEscape();

        await expect.poll(() => onChangeOpen).toHaveBeenCalled();
        expect(onChangeOpen).toHaveBeenLastCalledWith(false);
      });

      it('calls onChangeOpen(false) on trigger click when open=true', async () => {
        const onChangeOpen = vi.fn();
        view.rerender(<PopoverTest open onChangeOpen={onChangeOpen} />);
        await waitOpened(view);

        await openByTrigger(view);

        await expect.poll(() => onChangeOpen).toHaveBeenCalledTimes(1);
        expect(onChangeOpen).toHaveBeenLastCalledWith(false);
        await expect.poll(() => getContent(view).matches(':popover-open')).toBe(false);
      });

      it('does not loop between two popovers their parents keep open', async () => {
        let toggles = 0;
        const countToggle = () => {
          toggles += 1;
        };
        document.addEventListener('toggle', countToggle, true);
        onTestFinished(() => document.removeEventListener('toggle', countToggle, true));

        view.rerender(
          <>
            <PopoverTest open />
            <Popover open>
              <PopoverTrigger>Other</PopoverTrigger>
              <PopoverContent>Other content</PopoverContent>
            </Popover>
          </>
        );
        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(toggles).toBeLessThan(5);
      });
    });
  });

  describe('Edge Cases', () => {
    it('hides a closing popover at once where the browser cannot keep it in the top layer for the fade', async () => {
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      const view = render(<PopoverTest />);
      await openByTrigger(view);
      await waitOpened(view);
      const content = getContent(view);

      await closeByEscape();
      await expect.poll(() => content.matches(':popover-open')).toBe(false);

      expect(content.isConnected && getComputedStyle(content).display !== 'none').toBe(CSS.supports('overlay', 'auto'));
    });

    it('closes with PopoverClose and returns focus to the trigger', async () => {
      const view = render(
        <Popover role='dialog'>
          <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT} aria-label='Details'>
            <PopoverClose>Done</PopoverClose>
          </PopoverContent>
        </Popover>
      );

      getTrigger(view).focus();
      await userEvent.keyboard('{Enter}');
      await waitOpened(view);
      view.getByRole('button', { name: 'Done' }).focus();
      await userEvent.keyboard('{Enter}');

      await waitClosed();
      await expect.element(getTrigger(view)).toHaveFocus();
    });

    it('positions against PopoverAnchor instead of the trigger', async () => {
      const view = render(
        <Popover placement='bottom-start'>
          <PopoverAnchor data-testid='anchor' style={{ marginLeft: 200, width: 300 }}>
            <PopoverTrigger data-testid={TESTID_TRIGGER} style={{ marginLeft: 150 }}>{TRIGGER_TEXT}</PopoverTrigger>
          </PopoverAnchor>
          <PopoverContent data-testid={TESTID_CONTENT}>{CONTENT_TEXT}</PopoverContent>
        </Popover>
      );

      await openByTrigger(view);
      await waitOpened(view);

      await expect.poll(() => Math.round(getContent(view).getBoundingClientRect().left)).toBe(Math.round(view.getByTestId('anchor').getBoundingClientRect().left));
    });

    it('flips to the opposite side when there is no room', async () => {
      const view = render(
        <Popover defaultOpen>
          <PopoverTrigger data-testid={TESTID_TRIGGER} style={{ position: 'fixed', bottom: 0 }}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT}>{CONTENT_TEXT}</PopoverContent>
        </Popover>
      );
      await waitOpened(view);

      await expect.poll(() => getContent(view).getBoundingClientRect().bottom).toBeLessThanOrEqual(getTrigger(view).getBoundingClientRect().top);
    });

    it('scales the content in place, wherever the trigger is on the page', async () => {
      const view = render(<div style={{ padding: 300 }}><PopoverTest defaultOpen /></div>);
      await waitOpened(view);

      const content = getContent(view);
      await expect.poll(() => content.getBoundingClientRect().top).toBeGreaterThan(300);
      content.style.transition = 'none';
      const full = content.getBoundingClientRect();
      content.style.scale = '0.5';
      const scaled = content.getBoundingClientRect();

      expect(scaled.left).toBeGreaterThanOrEqual(full.left);
      expect(scaled.top).toBeGreaterThanOrEqual(full.top);
      expect(scaled.right).toBeLessThanOrEqual(full.right);
      expect(scaled.bottom).toBeLessThanOrEqual(full.bottom);
    });

    it('lays out children while open so they can measure themselves', async () => {
      let width = 0;
      const Measure: FC = () => <div ref={(element) => { if (element) width = element.offsetWidth; }} style={{ width: 120, height: 20 }} />;
      const view = render(
        <Popover>
          <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT}><Measure /></PopoverContent>
        </Popover>
      );

      await openByTrigger(view);
      await waitOpened(view);

      expect(width).toBe(120);
    });

    it('starts the opening animation only with its children, so an empty box does not fade in', async () => {
      const view = render(<PopoverTest />);
      let animatedEmpty: boolean | undefined;
      document.addEventListener('toggle', () => {
        animatedEmpty = getContent(view).getAnimations().length > 0 && getContent(view).childElementCount === 0;
      }, { capture: true, once: true });

      await openByTrigger(view);
      await waitOpened(view);

      expect(animatedEmpty).toBe(false);
      await expect.poll(() => getComputedStyle(getContent(view)).opacity).toBe('1');
    });

    it('keeps the outer popover open while a nested one opens and closes', async () => {
      const view = render(
        <Popover>
          <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT}>
            <Popover>
              <PopoverTrigger data-testid='inner-trigger'>Inner</PopoverTrigger>
              <PopoverContent data-testid='inner-content'>Inner content</PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>
      );

      await openByTrigger(view);
      await waitOpened(view);
      await userEvent.click(view.getByTestId('inner-trigger'));
      await expect.poll(() => view.getByTestId('inner-content').matches(':popover-open')).toBe(true);

      await closeByEscape();

      await expect.poll(() => view.getByTestId('inner-content').matches(':popover-open')).toBe(false);
      expect(getContent(view).matches(':popover-open')).toBe(true);
    });

    it('returns the focus from a closed nested popover to its trigger, which the browsers leave inside', async () => {
      const view = render(
        <Popover>
          <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT}>
            <Popover>
              <PopoverTrigger data-testid='inner-trigger'>Inner</PopoverTrigger>
              <PopoverContent data-testid='inner-content'><button autoFocus>Inner action</button></PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>
      );

      await openByTrigger(view);
      await waitOpened(view);
      view.getByTestId('inner-trigger').focus();
      await userEvent.keyboard('{Enter}');
      await expect.element(view.getByRole('button', { name: 'Inner action' })).toHaveFocus();

      await closeByEscape();

      await expect.element(view.getByTestId('inner-trigger')).toHaveFocus();
      expect(getContent(view).matches(':popover-open')).toBe(true);
    });

    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const view = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <PopoverTest />
        </form>
      );

      await userEvent.click(getTrigger(view));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('does not catch clicks at its old position once closed', async () => {
      const view = render(<PopoverTest defaultOpen />);
      await waitOpened(view);
      const { left, top, width, height } = getContent(view).getBoundingClientRect();

      await closeByEscape();
      await waitClosed();

      const hit = document.elementFromPoint(left + width / 2, top + height / 2);
      expect(getContent(view).contains(hit)).toBe(false);
    });
  });

  describe('Accessibility', () => {
    describe('aria', () => {
      it('trigger invokes the content as a native popover', async () => {
        const view = render(<PopoverTest />);

        await expect.element(getTrigger(view)).toHaveAttribute('popovertarget', getContent(view).id);
        await expect.element(getTrigger(view)).not.toHaveAttribute('aria-expanded');
        await expect.element(getTrigger(view)).not.toHaveAttribute('aria-controls');
      });
    });

    describe('roles', () => {
      it('applies role=dialog to floating content when role prop is dialog', async () => {
        const view = render(<PopoverTest role='dialog' />);

        await openByTrigger(view);
        await waitOpened(view);

        await expect.element(view.getByRole('dialog')).toBeInTheDocument();
        await expect.element(getTrigger(view)).toHaveAttribute('aria-haspopup', 'dialog');
      });
    });

    describe('focus', () => {
      it('focuses a child with autoFocus when it opens', async () => {
        const view = render(
          <Popover>
            <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
            <PopoverContent data-testid={TESTID_CONTENT}>
              <input aria-label='Name' autoFocus />
            </PopoverContent>
          </Popover>,
        );

        await openByTrigger(view);
        await waitOpened(view);

        await expect.element(view.getByRole('textbox', { name: 'Name' })).toHaveFocus();
      });

      it('focuses a child with autoFocus when it opens from state', async () => {
        const Controlled: FC = () => {
          const [open, setOpen] = useState(false);
          return (
            <>
              <button type='button' onClick={() => setOpen(true)}>Open from outside</button>
              <Popover open={open} onChangeOpen={setOpen}>
                <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
                <PopoverContent data-testid={TESTID_CONTENT}>
                  <input aria-label='Name' autoFocus />
                </PopoverContent>
              </Popover>
            </>
          );
        };
        const view = render(<Controlled />);

        await userEvent.click(view.getByRole('button', { name: 'Open from outside' }));
        await waitOpened(view);

        await expect.element(view.getByRole('textbox', { name: 'Name' })).toHaveFocus();
      });

      it('returns focus to trigger on close (uncontrolled)', async () => {
        const view = render(<PopoverTest />);
        getTrigger(view).focus();

        await userEvent.keyboard('{Enter}');
        await waitOpened(view);

        getFocusableInside(view).focus();
        await expect.element(getFocusableInside(view)).toHaveFocus();

        await closeByEscape();
        await waitClosed();

        await expect.element(getTrigger(view)).toHaveFocus();
      });

    });
  });
});
