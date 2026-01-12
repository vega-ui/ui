import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
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

describe('Tooltip', () => {
  describe('Critical User Paths', () => {
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
      
      it('opens on focus', async () => {
        const trigger = getTrigger(r);
        
        trigger.focus();
        
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
      });
      
      it('closes on blur', async () => {
        const trigger = getTrigger(r);
        
        trigger.focus();
        await waitFor(() => {
          expect(queryContent(r)).toBeInTheDocument();
        });
        
        trigger.blur();
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
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TooltipTest delayOpen={0} delayClose={0} />);
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