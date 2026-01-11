import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Popover } from '../Popover';
import { PopoverTrigger, PopoverContent, PopoverBackdrop } from '../components';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';
const TESTID_BACKDROP = 'backdrop';

const CONTENT_TEXT = 'Popover content';
const TRIGGER_TEXT = 'Open popover';

const PopoverTest: FC<Partial<ComponentProps<typeof Popover>> & { withBackdrop?: boolean; }> = ({ withBackdrop = true, ...props }) => {
  return (
    <Popover {...props}>
      <PopoverTrigger data-testid={TESTID_TRIGGER}>{TRIGGER_TEXT}</PopoverTrigger>
      
      {withBackdrop && <PopoverBackdrop data-testid={TESTID_BACKDROP} />}
      
      <PopoverContent data-testid={TESTID_CONTENT}>
        <button type='button'>Focusable</button>
        <div>{CONTENT_TEXT}</div>
      </PopoverContent>
    </Popover>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER) as HTMLButtonElement;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLDivElement;
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLDivElement | null;
const getBackdrop = (r: RenderResult) => r.getByTestId(TESTID_BACKDROP) as HTMLElement;
const queryBackdrop = (r: RenderResult) => r.queryByTestId(TESTID_BACKDROP) as HTMLElement | null;
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
  await waitFor(() => expect.element(getContent(r)).toBeInTheDocument());
  await waitFor(() => expect.element(getContent(r)).toHaveAttribute('data-status', 'open'));
};

const waitClosed = async (r: RenderResult) => {
  await waitFor(() => expect.element(getContent(r)).not.toBeInTheDocument());
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
        await expect.element(queryContent(r)).not.toBeInTheDocument();
        await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
      });
      
      it('opens on trigger click', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await expect.element(r.getByText(CONTENT_TEXT)).toBeInTheDocument();
        await expect.element(getBackdrop(r)).toBeInTheDocument();
      });
      
      it('closes on outside click', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await closeByOutsideClick();
        await waitClosed(r);
        
        await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
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
        await expect.element(getBackdrop(r)).toBeInTheDocument();
      });
      
      it('closes on outside click', async () => {
        await waitOpened(r);
        
        await closeByOutsideClick();
        await waitClosed(r);
        
        await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PopoverTest open={false} />);
      });
      
      it('does not open by itself when open=false', async () => {
        await expect.element(queryContent(r)).not.toBeInTheDocument();
        
        await openByTrigger(r);
        
        await expect.element(queryContent(r)).not.toBeInTheDocument();
        await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
      });
      
      it('calls onOpenChange(true) on trigger click when open=false', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<PopoverTest open={false} onOpenChange={onOpenChange} />);
        
        await openByTrigger(r);
        
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenLastCalledWith(true);
      });
      
      it('renders opened state when open=true', async () => {
        r.rerender(<PopoverTest open />);
        
        await waitOpened(r);
        await expect.element(r.getByText(CONTENT_TEXT)).toBeInTheDocument();
      });
      
      it('calls onOpenChange(false) on outside click when open=true', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<PopoverTest open onOpenChange={onOpenChange} />);
        
        await waitOpened(r);
        
        await closeByOutsideClick();
        
        expect(onOpenChange).toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
      });
      
      it('calls onOpenChange(false) on Escape when open=true', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<PopoverTest open onOpenChange={onOpenChange} />);
        
        await waitOpened(r);
        
        await closeByEscape();
        
        expect(onOpenChange).toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('does not render backdrop when it is not provided', async () => {
      const r = render(<PopoverTest withBackdrop={false} />);
      
      await openByTrigger(r);
      await waitOpened(r);
      
      await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
      await expect.element(r.getByText(CONTENT_TEXT)).toBeInTheDocument();
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
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('applies role=dialog to floating content when role prop is dialog', async () => {
        const r = render(<PopoverTest role='dialog' />);
        
        await openByTrigger(r);
        await waitOpened(r);
        
        await expect.element(r.getByRole('dialog')).toBeInTheDocument();
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
        await waitClosed(r);
      });
    });
    
    describe('focus', () => {
      it('returns focus to trigger on close (uncontrolled)', async () => {
        const r = render(<PopoverTest />);
        
        await openByTrigger(r);
        await waitOpened(r);
        
        getFocusableInside(r).focus();
        await expect.element(getFocusableInside(r)).toHaveFocus();
        
        await closeByEscape();
        await waitClosed(r);
        
        await expect.element(getTrigger(r)).toHaveFocus();
      });
    });
  });
});