import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Tooltip } from '../Tooltip';
import { TooltipArrow, TooltipContent, TooltipTrigger } from '../components';

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
        <TooltipArrow />
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

describe('Tooltip', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      it('starts open with defaultOpen', () => {
        const r = render(<TooltipTest defaultOpen />);

        expect(queryContent(r)).toBeInTheDocument();
      });

      it('reports opening on hover', async () => {
        const onChangeOpen = vi.fn();
        const r = render(<TooltipTest delayOpen={0} onChangeOpen={onChangeOpen} />);

        await userEvent.hover(getTrigger(r));

        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenLastCalledWith(true);
        });
      });
    });

    describe('controlled', () => {
      it('shows the content while open is true', () => {
        const r = render(<TooltipTest open />);

        expect(queryContent(r)).toBeInTheDocument();
      });

      it('stays closed on hover until the parent opens it', async () => {
        const onChangeOpen = vi.fn();
        const r = render(<TooltipTest open={false} delayOpen={0} onChangeOpen={onChangeOpen} />);

        await userEvent.hover(getTrigger(r));
        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenLastCalledWith(true);
        });

        expect(queryContent(r)).not.toBeInTheDocument();
      });

      it('stays open on Escape until the parent closes it', async () => {
        const onChangeOpen = vi.fn();
        const r = render(<TooltipTest open onChangeOpen={onChangeOpen} />);

        getTrigger(r).focus();
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenLastCalledWith(false);
        });

        expect(queryContent(r)).toBeInTheDocument();
      });

      it('keeps the content mounted while the close transition runs', async () => {
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
      
      it('opens on hover', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger);
        
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
      });
      
      it('closes on unhover', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger);
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
        
        await userEvent.unhover(trigger);
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
      
      it('opens on keyboard focus', async () => {
        await focusByKeyboard(getTrigger(r));
        
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
      });
      
      it('closes on blur', async () => {
        await focusByKeyboard(getTrigger(r));
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
        
        getTrigger(r).blur();
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
      
      it('does not open on a tap', async () => {
        const trigger = getTrigger(r);

        fireEvent.pointerEnter(trigger, { pointerType: 'touch' });
        fireEvent.pointerDown(trigger, { pointerType: 'touch' });
        await new Promise((resolve) => setTimeout(resolve, 700));

        expect(queryContent(r)).not.toBeInTheDocument();
      });

      it('closes when the trigger is pressed', async () => {
        const trigger = getTrigger(r);

        await userEvent.hover(trigger);
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });

        fireEvent.pointerDown(trigger, { pointerType: 'mouse' });
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
    });
  });
  
  describe('Edge Cases', () => {
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

    it('shows the next tooltip at once right after another closes', async () => {
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
    });

    it('grows out of its arrow', async () => {
      const r = render(<TooltipTest defaultOpen />);

      await expect.poll(() => queryContent(r)?.getAttribute('data-side')).toBe('bottom');
      await expect.poll(() => queryContent(r)?.style.getPropertyValue('--tooltip-arrow-x')).toMatch(/px$/);
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

      it('sets role="tooltip" on content when open', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger);
        
        await waitFor(() => {
          expect(queryContent(r)).toHaveRole('tooltip');
        });
      });
    });
  });
});