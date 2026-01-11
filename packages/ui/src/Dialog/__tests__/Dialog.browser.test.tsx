import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Dialog } from '../Dialog';
import {
  DialogBackdrop,
  DialogCloseButton,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../components';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_BACKDROP = 'backdrop';
const TESTID_CONTENT = 'content';
const TESTID_CLOSE = 'close';
const TESTID_OUTSIDE = 'outside';

const TESTID_INNER_TRIGGER = 'inner-trigger';
const TESTID_INNER_BACKDROP = 'inner-backdrop';
const TESTID_INNER_CONTENT = 'inner-content';
const TESTID_INNER_CLOSE = 'inner-close';

const DialogTest: FC<ComponentProps<typeof Dialog>> = ({ children, ...props }) => {
  return (
    <>
      <button data-testid={TESTID_OUTSIDE}>Outside</button>
      <Dialog {...props}>
        <DialogTrigger data-testid={TESTID_TRIGGER}>Open</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop data-testid={TESTID_BACKDROP}>
            <DialogContent data-testid={TESTID_CONTENT}>
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogCloseButton data-testid={TESTID_CLOSE} aria-label='Close dialog' />
              </DialogHeader>
              {children}
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </Dialog>
    </>
  );
};


const InnerDialogTest: FC<ComponentProps<typeof Dialog>> = (props) => {
  return (
    <Dialog {...props}>
      <DialogTrigger data-testid={TESTID_INNER_TRIGGER}>Open inner</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop data-testid={TESTID_INNER_BACKDROP}>
          <DialogContent data-testid={TESTID_INNER_CONTENT}>
            <DialogHeader>
              <DialogTitle>Inner title</DialogTitle>
              <DialogCloseButton data-testid={TESTID_INNER_CLOSE} aria-label='Close inner' />
            </DialogHeader>
          </DialogContent>
        </DialogBackdrop>
      </DialogPortal>
    </Dialog>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const getBackdrop = (r: RenderResult) => r.getByTestId(TESTID_BACKDROP);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getClose = (r: RenderResult) => r.getByTestId(TESTID_CLOSE);

const getInnerTrigger = (r: RenderResult) => r.getByTestId(TESTID_INNER_TRIGGER);
const queryInnerContent = (r: RenderResult) => r.queryByTestId(TESTID_INNER_CONTENT);
const getInnerContent = (r: RenderResult) => r.getByTestId(TESTID_INNER_CONTENT);
const getInnerClose = (r: RenderResult) => r.getByTestId(TESTID_INNER_CLOSE);

const toBeOpened = async (r: RenderResult) => {
  await expect.element(queryContent(r)).toBeInTheDocument();
};

const toBeClosed = async (r: RenderResult) => {
  await expect.element(queryContent(r)).not.toBeInTheDocument();
};

const toBeInnerOpened = async (r: RenderResult) => {
  await expect.element(queryInnerContent(r)).toBeInTheDocument();
};

const openByTrigger = async (r: RenderResult) => {
  await userEvent.click(getTrigger(r));
};

const closeByOutsideClick = async () => {
  fireEvent.pointerDown(document.body)
};

const closeByCloseButton = async (r: RenderResult) => {
  await userEvent.click(getClose(r));
};

describe('Dialog', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DialogTest />);
      });
      
      it('is closed by default', async () => {
        await toBeClosed(r)
      });
      
      it('opens on trigger click', async () => {
        await openByTrigger(r);
        await toBeOpened(r);
      });
      
      it('closes on outside mousedown', async () => {
        await openByTrigger(r);
        await toBeOpened(r);
        
        await closeByOutsideClick();
        await toBeClosed(r);
      });
      
      it('closes via close button click', async () => {
        await openByTrigger(r);
        await toBeOpened(r);
        
        await closeByCloseButton(r);
        await toBeClosed(r);
      });
      
      it('reopens after close', async () => {
        await openByTrigger(r);
        await toBeOpened(r);
        
        await closeByCloseButton(r);
        await toBeClosed(r);
        
        await openByTrigger(r);
        await toBeOpened(r);
      });
      
      describe('defaultOpen', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<DialogTest defaultOpen />);
        });
        
        it('is open on mount', async () => {
          await toBeOpened(r);
        });
        
        it('closes on close button click', async () => {
          await closeByCloseButton(r);
          await toBeClosed(r);
        });
      });
      
      it('supports fluid layout via data-fluid on content and backdrop', async () => {
        r.rerender(<DialogTest fluid />);
        await openByTrigger(r);
        await toBeOpened(r);
        
        await expect.element(getContent(r)).toHaveAttribute('data-fluid', 'true');
        await expect.element(getBackdrop(r)).toHaveAttribute('data-fluid', 'true');
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DialogTest open={false} />);
      });
      
      it('does not open itself when open=false (requires parent update)', async () => {
        await openByTrigger(r);
        
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
      
      it('calls onOpenChange(true) on trigger interaction', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<DialogTest open={false} onOpenChange={onOpenChange} />);
        
        await openByTrigger(r);
        
        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledTimes(1);
          expect(onOpenChange).toHaveBeenLastCalledWith(true);
        });
      });
      
      it('opens when parent sets open=true', async () => {
        r.rerender(<DialogTest open />);
        await toBeOpened(r);
      });
      
      it('calls onOpenChange(false) on outside press when open=true', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<DialogTest open onOpenChange={onOpenChange} />);
        await toBeOpened(r);
        
        await closeByOutsideClick();
        
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
      });
      
      it('calls onOpenChange(false) on close button click when open=true', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<DialogTest open onOpenChange={onOpenChange} />);
        await toBeOpened(r);
        
        await closeByCloseButton(r);
        
        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledTimes(1);
          expect(onOpenChange).toHaveBeenLastCalledWith(false);
        });
      });
      
      it('does not close itself until parent updates open=false', async () => {
        const onOpenChange = vi.fn();
        r.rerender(<DialogTest open onOpenChange={onOpenChange} />);
        
        await toBeOpened(r);
        await closeByOutsideClick();
        
        expect(onOpenChange).toHaveBeenCalledWith(false);
        
        r.rerender(<DialogTest open={false} onOpenChange={onOpenChange} />);
        await toBeClosed(r);
      });
    });
  });
  
  describe('Edge cases', () => {
    describe('nested dialogs', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<DialogTest><InnerDialogTest /></DialogTest>)
        await openByTrigger(r)
        
        await userEvent.click(getInnerTrigger(r));
        await toBeInnerOpened(r);
      })
      
      it('opening inner does not close outer', async () => {
        await expect.element(getContent(r)).toBeInTheDocument();
        await expect.element(getInnerContent(r)).toBeInTheDocument();
      });
      
      it('focus does not escape to outside while inner is open', async () => {
        getInnerClose(r).focus()
        await userEvent.tab();
        await expect.element(getInnerClose(r)).toHaveFocus();
        
        await userEvent.tab();
        await expect.element(getContent(r)).not.toHaveFocus();
      });
    })
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DialogTest defaultOpen />);
      });
      
      it('sets aria-modal=true on the dialog container', async () => {
        await toBeOpened(r);
        await expect.element(getContent(r)).toHaveAttribute('aria-modal', 'true');
      });
      
      it('close button has accessible name', async () => {
        await toBeOpened(r);
        await expect.element(getClose(r)).toHaveAccessibleName('Close dialog');
      });
    });
    
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DialogTest defaultOpen />);
      });
      
      it('dialog is exposed with role=dialog', async () => {
        await toBeOpened(r);
        await expect.element(r.getByRole('dialog')).toBeInTheDocument();
      });
    });
    
    describe('focus', () => {
      it('moves focus into the dialog on open', async () => {
        const r = render(<DialogTest defaultOpen />);
        await toBeOpened(r);
        
        await waitFor(() => {
          expect(getClose(r)).toHaveFocus();
        });
      });
      
      it('restores focus to the trigger after close', async () => {
        const r = render(<DialogTest />);
        const trigger = getTrigger(r);
        
        trigger.focus();
        await expect.element(trigger).toHaveFocus();
        
        await openByTrigger(r);
        await toBeOpened(r);
        
        await closeByCloseButton(r);
        await toBeClosed(r);
        
        await expect.element(getTrigger(r)).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('closes on Escape in uncontrolled mode', async () => {
        const r = render(<DialogTest />);
        await openByTrigger(r);
        await toBeOpened(r);
        
        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);
      });
    });
  });
});