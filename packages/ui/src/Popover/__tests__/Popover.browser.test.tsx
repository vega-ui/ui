import { ComponentProps, FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, server, userEvent } from 'vitest/browser';

import { Popover } from '../Popover';
import { PopoverTrigger, PopoverContent } from '../components';

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

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER) as HTMLButtonElement;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLDivElement;
const getFocusableInside = (r: RenderResult) => r.getByRole('button', { name: 'Focusable' }) as HTMLButtonElement;

const openByTrigger = async (r: RenderResult) => {
  await userEvent.click(getTrigger(r));
};

const closeByEscape = async () => {
  await userEvent.keyboard('{Escape}');
};

const closeByOutsideClick = async () => {
  await userEvent.click(document.body);
};

const waitOpened = async (r: RenderResult) => {
  await expect.element(getContent(r)).toBeVisible()
  await expect.element(getContent(r)).toHaveAttribute('data-status', 'open')
  await expect.poll(() => getContent(r).matches(':popover-open')).toBe(true)
};

const waitClosed = async () => {
  await expect.element(page.getByTestId(TESTID_CONTENT)).not.toBeVisible()
  await expect.element(page.getByText(CONTENT_TEXT)).not.toBeInTheDocument()
};

describe('Popover', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<PopoverTest />);
      });

      it('renders trigger', async () => {
        await expect.element(getTrigger(r)).toBeInTheDocument();
      });

      it('is closed by default', async () => {
        await waitClosed();
      });

      it('opens on trigger click', async () => {
        await openByTrigger(r);
        await waitOpened(r);

        await expect.element(r.getByText(CONTENT_TEXT)).toBeInTheDocument();
      });

      it('closes on outside click', async () => {
        await openByTrigger(r);
        await waitOpened(r);

        await closeByOutsideClick();
        await waitClosed();
      });

      it('closes on a second trigger click', async () => {
        await openByTrigger(r);
        await waitOpened(r);

        await openByTrigger(r);
        await waitClosed();
      });
    });

    describe('uncontrolled (defaultOpen=true)', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<PopoverTest defaultOpen />);
      });

      it('renders opened content on mount', async () => {
        await waitOpened(r);

        await expect.element(r.getByText(CONTENT_TEXT)).toBeInTheDocument();
      });

      it('closes on outside click', async () => {
        await waitOpened(r);

        await closeByOutsideClick();
        await waitClosed();
      });
    });

    describe('controlled', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<PopoverTest open={false} />);
      });

      it('does not open by itself when open=false', async () => {
        await waitClosed();

        await openByTrigger(r);

        await waitClosed();
      });

      it('calls onChangeOpen(true) on trigger click when open=false', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<PopoverTest open={false} onChangeOpen={onChangeOpen} />);

        await openByTrigger(r);

        await expect.poll(() => onChangeOpen).toHaveBeenCalledTimes(1);
        expect(onChangeOpen).toHaveBeenLastCalledWith(true);
      });

      it('renders opened state when open=true', async () => {
        r.rerender(<PopoverTest open />);

        await waitOpened(r);
        await expect.element(r.getByText(CONTENT_TEXT)).toBeInTheDocument();
      });

      it('closes when parent sets open=false', async () => {
        r.rerender(<PopoverTest open />);
        await waitOpened(r);

        r.rerender(<PopoverTest open={false} />);

        await waitClosed();
      });

      it('calls onChangeOpen(false) on outside click when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<PopoverTest open onChangeOpen={onChangeOpen} />);

        await waitOpened(r);

        await closeByOutsideClick();

        await expect.poll(() => onChangeOpen).toHaveBeenCalled();
        expect(onChangeOpen).toHaveBeenLastCalledWith(false);
      });

      it('stays open on outside click until parent updates open=false', async () => {
        r.rerender(<PopoverTest open />);
        await waitOpened(r);

        await closeByOutsideClick();

        await waitOpened(r);
      });

      it('calls onChangeOpen(false) on Escape when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<PopoverTest open onChangeOpen={onChangeOpen} />);

        await waitOpened(r);

        await closeByEscape();

        await expect.poll(() => onChangeOpen).toHaveBeenCalled();
        expect(onChangeOpen).toHaveBeenLastCalledWith(false);
      });
    });
  });

  describe('Edge Cases', () => {
    it('scales the content in place, wherever the trigger is on the page', async () => {
      const r = render(<div style={{ padding: 300 }}><PopoverTest defaultOpen /></div>);
      await waitOpened(r);

      const content = getContent(r);
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

    it('renders the content in the top layer', async () => {
      const r = render(<PopoverTest defaultOpen />);
      await waitOpened(r);

      expect(getContent(r).matches(':popover-open')).toBe(true);
    });

    it('lays out children while open so they can measure themselves', async () => {
      let width = 0;
      const Measure: FC = () => <div ref={(element) => { if (element) width = element.offsetWidth; }} style={{ width: 120, height: 20 }} />;
      const r = render(
        <Popover>
          <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT}><Measure /></PopoverContent>
        </Popover>
      );

      await openByTrigger(r);
      await waitOpened(r);

      expect(width).toBe(120);
    });

    it('keeps the outer popover open while a nested one opens and closes', async () => {
      const r = render(
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

      await openByTrigger(r);
      await waitOpened(r);
      await userEvent.click(r.getByTestId('inner-trigger'));
      await expect.poll(() => r.getByTestId('inner-content').matches(':popover-open')).toBe(true);

      await closeByEscape();

      await expect.poll(() => r.getByTestId('inner-content').matches(':popover-open')).toBe(false);
      expect(getContent(r).matches(':popover-open')).toBe(true);
    });

    it('grows out of the side facing its trigger', async () => {
      const r = render(<PopoverTest defaultOpen placement='bottom-start' />);
      await waitOpened(r);

      await expect.element(getContent(r)).toHaveAttribute('data-side', 'bottom');
      await expect.element(getContent(r)).toHaveAttribute('data-align', 'start');
    });

    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <PopoverTest />
        </form>
      );

      await userEvent.click(getTrigger(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('applies data-shadowed=false when shadowed is disabled', async () => {
      const r = render(
        <Popover defaultOpen>
          <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
          <PopoverContent data-testid={TESTID_CONTENT} shadowed={false}>
            <div>{CONTENT_TEXT}</div>
          </PopoverContent>
        </Popover>
      );

      await waitOpened(r);
      await expect.element(getContent(r)).toHaveAttribute('data-shadowed', 'false');
    });

    it('passes html attributes to the root element', async () => {
      const r = render(<PopoverTest id='popover' data-testid='root' style={{ zIndex: 10 }} />);

      const root = r.getByTestId('root');
      await expect.element(root).toHaveAttribute('id', 'popover');
      await expect.element(root).toHaveStyle({ zIndex: '10' });
    });
  });

  describe('Accessibility', () => {
    describe('aria', () => {
      it('trigger invokes the content as a native popover', async () => {
        const r = render(<PopoverTest />);

        await expect.element(getTrigger(r)).toHaveAttribute('popovertarget', getContent(r).id);
        await expect.element(getTrigger(r)).not.toHaveAttribute('aria-expanded');
        await expect.element(getTrigger(r)).not.toHaveAttribute('aria-controls');
      });
    });

    describe('roles', () => {
      it('applies role=dialog to floating content when role prop is dialog', async () => {
        const r = render(<PopoverTest role='dialog' />);

        await openByTrigger(r);
        await waitOpened(r);

        await expect.element(r.getByRole('dialog')).toBeInTheDocument();
        await expect.element(getTrigger(r)).toHaveAttribute('aria-haspopup', 'dialog');
      });

      it('applies role=listbox to floating content when role prop is listbox', async () => {
        const r = render(<PopoverTest role='listbox' />);

        await openByTrigger(r);
        await waitOpened(r);

        await expect.element(r.getByRole('listbox')).toBeInTheDocument();
      });
    });

    describe('keyboard', () => {
      it('closes on Escape (uncontrolled)', async () => {
        const r = render(<PopoverTest />);

        await openByTrigger(r);
        await waitOpened(r);

        await closeByEscape();
        await waitClosed();
      });
    });

    describe('focus', () => {
      it.skipIf(server.browser === 'webkit')('keeps focus on the trigger on open and moves into the content on Tab', async () => {
        const r = render(<PopoverTest />);
        getTrigger(r).focus();

        await userEvent.keyboard('{Enter}');
        await waitOpened(r);
        await expect.element(getTrigger(r)).toHaveFocus();

        await userEvent.tab();
        await expect.element(getFocusableInside(r)).toHaveFocus();
      });

      it('focuses a child with autoFocus when it opens', async () => {
        const r = render(
          <Popover>
            <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
            <PopoverContent data-testid={TESTID_CONTENT}>
              <input aria-label='Name' autoFocus />
            </PopoverContent>
          </Popover>,
        );

        await openByTrigger(r);
        await waitOpened(r);

        await expect.element(r.getByRole('textbox', { name: 'Name' })).toHaveFocus();
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
        const r = render(<Controlled />);

        await userEvent.click(r.getByRole('button', { name: 'Open from outside' }));
        await waitOpened(r);

        await expect.element(r.getByRole('textbox', { name: 'Name' })).toHaveFocus();
      });

      it('returns focus to trigger on close (uncontrolled)', async () => {
        const r = render(<PopoverTest />);
        getTrigger(r).focus();

        await userEvent.keyboard('{Enter}');
        await waitOpened(r);

        getFocusableInside(r).focus();
        await expect.element(getFocusableInside(r)).toHaveFocus();

        await closeByEscape();
        await waitClosed();

        await expect.element(getTrigger(r)).toHaveFocus();
      });
    });
  });
});
