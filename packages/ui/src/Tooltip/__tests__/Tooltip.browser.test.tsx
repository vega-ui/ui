import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Tooltip } from '../Tooltip';
import { TooltipContent, TooltipArrow, TooltipTrigger } from '../components';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';
const TESTID_ARROW = 'arrow';

const TRIGGER_TEXT = 'Trigger';
const CONTENT_TEXT = 'Content';

const TooltipTest: FC<ComponentProps<typeof Tooltip>> = (props) => {
  return (
    <Tooltip {...props}>
      <TooltipTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</TooltipTrigger>
      <TooltipContent data-testid={TESTID_CONTENT}>
        <TooltipArrow data-testid={TESTID_ARROW} />
        {CONTENT_TEXT}
      </TooltipContent>
    </Tooltip>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER) as HTMLElement;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLElement;
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLElement | null;
const getArrow = (r: RenderResult) => r.getByTestId(TESTID_ARROW) as HTMLElement;
const queryArrow = (r: RenderResult) => r.queryByTestId(TESTID_ARROW) as HTMLElement | null;

const focusEl = (el: HTMLElement) => {
  el.focus();
  fireEvent.focus(el);
  fireEvent.focusIn(el);
};

const blurEl = (el: HTMLElement) => {
  el.blur();
  fireEvent.blur(el);
  fireEvent.focusOut(el);
};

const advance = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await vi.runOnlyPendingTimersAsync();
};

describe('Tooltip', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TooltipTest />);
      });
      
      it('does not render content by default', async () => {
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
    });
    
    describe('open/close', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TooltipTest delayOpen={0} delayClose={0} />);
      });
      
      it('opens on hover and closes on unhover', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger)
        await expect.poll(() => getContent(r)).toBeInTheDocument();
        await expect.element(getContent(r)).toHaveTextContent(CONTENT_TEXT);
        await userEvent.unhover(trigger)
        
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
      
      it('opens on focus and closes on blur', async () => {
        const trigger = getTrigger(r);
        
        focusEl(trigger);
        await expect.poll(() => getContent(r)).toBeInTheDocument();
        
        blurEl(trigger);
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
      
      it('closes on Escape when open', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger)
        await expect.poll(() => getContent(r)).toBeInTheDocument();
        
        await userEvent.keyboard('{Escape}');
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
      
      it('renders arrow only when open', async () => {
        const trigger = getTrigger(r);
        
        await expect.element(queryArrow(r)).not.toBeInTheDocument();
        
        await userEvent.hover(trigger)
        await expect.poll(() => getArrow(r)).toBeInTheDocument();
        await userEvent.unhover(trigger)
        
        await expect.element(queryArrow(r)).not.toBeInTheDocument();
      });
    });
    
    describe('delays', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        vi.useFakeTimers();
        r = render(<TooltipTest delayOpen={200} delayClose={150} />);
      });
      
      afterEach(() => {
        vi.useRealTimers();
      });
      
      it('respects delayOpen (content appears only after timeout)', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger)
        await expect.element(queryContent(r)).not.toBeInTheDocument();
        
        await advance(199);
        await expect.element(queryContent(r)).not.toBeInTheDocument();
        
        await advance(1);
        await expect.poll(() => getContent(r)).toBeInTheDocument();
      });
      
      it('respects delayClose (content stays visible until timeout)', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger)
        await advance(200);
        await expect.poll(() => getContent(r)).toBeInTheDocument();
        await userEvent.unhover(trigger)
        
        await expect.element(getContent(r)).toBeInTheDocument();
        
        await advance(149);
        await expect.element(getContent(r)).toBeInTheDocument();
        
        await advance(1);
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TooltipTest delayOpen={0} delayClose={0} />);
      });
      
      it('applies role="tooltip" to content when open', async () => {
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger)
        await expect.poll(() => getContent(r)).toHaveRole('tooltip');
      });
    });
    
    describe('focus', () => {
      it('does not steal focus when opening via hover', async () => {
        const r = render(<TooltipTest delayOpen={0} delayClose={0} />);
        const trigger = getTrigger(r);
        
        focusEl(trigger);
        await expect.element(trigger).toHaveFocus();
        
        await userEvent.hover(trigger)
        await expect.poll(() => getContent(r)).toBeInTheDocument();
        await expect.element(trigger).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('closes on Escape when tooltip is open', async () => {
        const r = render(<TooltipTest delayOpen={0} delayClose={0} />);
        const trigger = getTrigger(r);
        
        await userEvent.hover(trigger)
        await expect.poll(() => getContent(r)).toBeInTheDocument();
        
        await userEvent.keyboard('{Escape}');
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
    });
  });
});