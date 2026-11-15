import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { server, userEvent } from 'vitest/browser';

import { Tooltip } from '../Tooltip';
import { TooltipContent, TooltipTrigger } from '../components';
import { Dialog, DialogContent } from '../../Dialog';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';

const TRIGGER_TEXT = 'Trigger';
const CONTENT_TEXT = 'Content';

const TooltipTest: FC<ComponentProps<typeof Tooltip>> = (props) => {
  return (
    <Tooltip {...props}>
      <TooltipTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</TooltipTrigger>
      <TooltipContent data-testid={TESTID_CONTENT}>
        {CONTENT_TEXT}
      </TooltipContent>
    </Tooltip>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER) as HTMLElement;
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLElement | null;

const focusByKeyboard = async (element: HTMLElement) => {
  await userEvent.keyboard('{Shift}');
  element.focus();
};

const pressTab = () => userEvent.keyboard(server.browser === 'webkit' ? '{Alt>}{Tab}{/Alt}' : '{Tab}');

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForWarmUpToExpire = () => wait(600);

describe('Tooltip', () => {
  describe('Critical User Paths', () => {
    describe('controlled', () => {
      it('keeps the content mounted while the close transition runs', async () => {
        document.documentElement.dataset.motion = '';
        onTestFinished(() => {
          delete document.documentElement.dataset.motion;
        });
        const r = render(<TooltipTest open />);
        await waitFor(() => {
          expect(queryContent(r)).toHaveAttribute('data-status', 'open');
        });

        r.rerender(<TooltipTest open={false} />);

        await waitFor(() => {
          expect(queryContent(r)).toHaveAttribute('data-status', 'close');
        });
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
    });

    describe('open/close', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TooltipTest />);
      });
      
      it('opens on keyboard focus', async () => {
        await pressTab();

        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
      });

      it('closes on blur', async () => {
        render(<button type='button'>Next</button>);
        await pressTab();
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });

        await pressTab();
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
      
      it('closes on Escape when open', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger);
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
        
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });

      it('stays open while the trigger is hovered', async () => {
        const trigger = getTrigger(r);

        await userEvent.hover(trigger);
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
        await wait(300);

        expect(queryContent(r)).toHaveAttribute('data-status', 'open');
      });
    });

    describe('delays', () => {
      beforeEach(waitForWarmUpToExpire);

      it('waits for delayClose before hiding on unhover', async () => {
        const r = render(<TooltipTest delayOpen={0} delayClose={200} />);

        await userEvent.hover(getTrigger(r));
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });

        await userEvent.unhover(getTrigger(r));
        await wait(100);
        expect(queryContent(r)).toHaveAttribute('data-status', 'open');

        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('closes only itself on Escape inside a dialog', async () => {
      const onChangeOpen = vi.fn();
      const r = render(
        <Dialog defaultOpen onChangeOpen={onChangeOpen}>
          <DialogContent aria-label='Dialog'>
            <TooltipTest />
          </DialogContent>
        </Dialog>
      );

      await focusByKeyboard(getTrigger(r));
      await waitFor(() => {
        expect(queryContent(r)).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(queryContent(r)).not.toBeInTheDocument();
      });
      expect(onChangeOpen).not.toHaveBeenCalled();

      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(onChangeOpen).toHaveBeenCalledWith(false);
      });
    });

    it('describes the trigger with its own id on TooltipContent', async () => {
      const r = render(
        <Tooltip open>
          <TooltipTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</TooltipTrigger>
          <TooltipContent data-testid={TESTID_CONTENT} id='custom'>{CONTENT_TEXT}</TooltipContent>
        </Tooltip>
      );

      await expect.element(r.getByTestId(TESTID_CONTENT)).toBeVisible();

      expect(getTrigger(r)).toHaveAttribute('aria-describedby', 'custom');
    });

    it('shows on the preferred side from placement', async () => {
      const r = render(
        <div style={{ paddingTop: 200 }}>
          <TooltipTest delayOpen={0} placement='top' />
        </div>
      );

      await userEvent.hover(getTrigger(r));
      await waitFor(() => {
        expect(queryContent(r)).toHaveAttribute('data-side', 'top');
      });
      expect(queryContent(r)!.getBoundingClientRect().bottom).toBeLessThanOrEqual(getTrigger(r).getBoundingClientRect().top);
    });

    it('scales the content in place, wherever the trigger is on the page', async () => {
      const r = render(<div style={{ padding: 300 }}><TooltipTest open /></div>);
      await expect.element(r.getByTestId(TESTID_CONTENT)).toBeVisible();

      const content = queryContent(r)!;
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

    it('hides the previous tooltip at once when the next one of its group shows', async () => {
      await waitForWarmUpToExpire();
      const r = render(
        <>
          <Tooltip delayOpen={0}>
            <TooltipTrigger data-testid='first'>First</TooltipTrigger>
            <TooltipContent data-testid='first-content'>First tip</TooltipContent>
          </Tooltip>
          <Tooltip delayOpen={5000}>
            <TooltipTrigger data-testid='second'>Second</TooltipTrigger>
            <TooltipContent data-testid='second-content'>Second tip</TooltipContent>
          </Tooltip>
        </>
      );

      await userEvent.hover(r.getByTestId('first'));
      await expect.element(r.getByTestId('first-content')).toBeInTheDocument();
      await userEvent.hover(r.getByTestId('second'));

      await expect.element(r.getByTestId('second-content')).toBeInTheDocument();
      expect(r.queryByTestId('first-content')).not.toBeInTheDocument();
    });

    it('flips to the opposite side when there is no room', async () => {
      const r = render(
        <Tooltip open>
          <TooltipTrigger data-testid={TESTID_TRIGGER} style={{ position: 'fixed', bottom: 0 }}>{TRIGGER_TEXT}</TooltipTrigger>
          <TooltipContent data-testid={TESTID_CONTENT}>{CONTENT_TEXT}</TooltipContent>
        </Tooltip>
      );

      await expect.poll(() => queryContent(r)?.matches(':popover-open')).toBe(true);
      await expect.poll(() => queryContent(r)!.getBoundingClientRect().bottom).toBeLessThanOrEqual(getTrigger(r).getBoundingClientRect().top);
    });

    it('renders the content in the top layer', async () => {
      const r = render(<TooltipTest defaultOpen />);

      await expect.poll(() => queryContent(r)?.matches(':popover-open')).toBe(true);
    });

    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <TooltipTest />
        </form>
      );

      await userEvent.click(getTrigger(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TooltipTest delayOpen={0} delayClose={0} />);
      });
      
      it('describes the trigger while open', async () => {
        await userEvent.hover(getTrigger(r));

        await waitFor(() => {
          expect(getTrigger(r)).toHaveAttribute('aria-describedby', queryContent(r)?.id);
        });
        expect(getTrigger(r)).toHaveAccessibleDescription(CONTENT_TEXT);
      });

    });

    describe('aria', () => {
      it('keeps the trigger own aria-describedby next to the tooltip', async () => {
        const r = render(
          <>
            <span id='hint'>Hint</span>
            <Tooltip delayOpen={0}>
              <TooltipTrigger data-testid={TESTID_TRIGGER} aria-describedby='hint'>{TRIGGER_TEXT}</TooltipTrigger>
              <TooltipContent data-testid={TESTID_CONTENT}>{CONTENT_TEXT}</TooltipContent>
            </Tooltip>
          </>
        );

        await userEvent.hover(getTrigger(r));
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });

        expect(getTrigger(r).getAttribute('aria-describedby')?.split(' ')).toEqual(expect.arrayContaining(['hint', queryContent(r)?.id]));
      });

      it('keeps the asChild trigger own aria-describedby next to the tooltip', async () => {
        const r = render(
          <>
            <span id='hint'>Hint</span>
            <Tooltip delayOpen={0}>
              <TooltipTrigger asChild>
                <a href='#details' data-testid={TESTID_TRIGGER} aria-describedby='hint'>{TRIGGER_TEXT}</a>
              </TooltipTrigger>
              <TooltipContent data-testid={TESTID_CONTENT}>{CONTENT_TEXT}</TooltipContent>
            </Tooltip>
          </>
        );

        await userEvent.hover(getTrigger(r));
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });

        expect(getTrigger(r).getAttribute('aria-describedby')?.split(' ')).toEqual(expect.arrayContaining(['hint', queryContent(r)?.id]));
      });
    });

    describe('content on hover or focus', () => {
      it('stays open while the pointer moves from the trigger onto the tooltip', async () => {
        const r = render(<TooltipTest delayOpen={0} />);

        await userEvent.hover(getTrigger(r));
        await waitFor(() => {
          expect(queryContent(r)).toHaveAttribute('data-status', 'open');
        });

        await userEvent.hover(queryContent(r)!, { force: true });
        await wait(300);

        expect(queryContent(r)).toHaveAttribute('data-status', 'open');
      });
    });
  });
});