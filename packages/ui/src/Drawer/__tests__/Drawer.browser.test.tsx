import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Drawer } from '../Drawer';
import {
  DrawerBackdrop,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '../components';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_BACKDROP = 'backdrop';
const TESTID_CONTENT = 'content';
const TESTID_CLOSE = 'close';

const TESTID_INNER_TRIGGER = 'inner-trigger';
const TESTID_INNER_BACKDROP = 'inner-backdrop';
const TESTID_INNER_CONTENT = 'inner-content';
const TESTID_INNER_CLOSE = 'inner-close';

const DrawerTest: FC<ComponentProps<typeof Drawer>> = ({ children, ...props }) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger data-testid={TESTID_TRIGGER}>Open</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop data-testid={TESTID_BACKDROP}>
          <DrawerContent data-testid={TESTID_CONTENT}>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
              <DrawerCloseButton data-testid={TESTID_CLOSE} aria-label='Close drawer' />
            </DrawerHeader>
            {children}
          </DrawerContent>
        </DrawerBackdrop>
      </DrawerPortal>
    </Drawer>
  );
};

const InnerDrawerTest: FC<ComponentProps<typeof Drawer>> = (props) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger data-testid={TESTID_INNER_TRIGGER}>Open inner</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop data-testid={TESTID_INNER_BACKDROP}>
          <DrawerContent data-testid={TESTID_INNER_CONTENT}>
            <DrawerHeader>
              <DrawerTitle>Inner title</DrawerTitle>
              <DrawerCloseButton data-testid={TESTID_INNER_CLOSE} aria-label='Close inner' />
            </DrawerHeader>
          </DrawerContent>
        </DrawerBackdrop>
      </DrawerPortal>
    </Drawer>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getClose = (r: RenderResult) => r.getByTestId(TESTID_CLOSE);

const getInnerTrigger = (r: RenderResult) => r.getByTestId(TESTID_INNER_TRIGGER);
const queryInnerContent = (r: RenderResult) => r.queryByTestId(TESTID_INNER_CONTENT);
const getInnerContent = (r: RenderResult) => r.getByTestId(TESTID_INNER_CONTENT);
const getInnerClose = (r: RenderResult) => r.getByTestId(TESTID_INNER_CLOSE);

const waitOpened = async (r: RenderResult) => {
  await expect.element(queryContent(r)).toBeInTheDocument();
  await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
};

const waitClosed = async (r: RenderResult) => {
  await expect.element(queryContent(r)).not.toBeInTheDocument();
};

const waitInnerOpened = async (r: RenderResult) => {
  await expect.element(queryInnerContent(r)).toBeInTheDocument();
  await expect.element(getInnerContent(r)).toHaveAttribute('data-status', 'open');
};

const openByTrigger = async (r: RenderResult) => {
  await userEvent.click(getTrigger(r));
};

const closeByOutsideClick = async () => {
  fireEvent.pointerDown(document.body)
};

const closeByCloseButton = async (r: RenderResult) => {
  fireEvent.click(getClose(r));
};

describe('Drawer', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DrawerTest />);
      });
      
      it('is closed by default', async () => {
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
      
      it('opens on trigger click', async () => {
        await openByTrigger(r);
        await waitOpened(r);
      });
      
      it('closes on outside mousedown', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await closeByOutsideClick();
        await waitClosed(r);
      });
      
      it('closes via close button click', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await closeByCloseButton(r);
        await waitClosed(r);
      });
      
      it('reopens after close', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await closeByCloseButton(r);
        await waitClosed(r);
        
        await openByTrigger(r);
        await waitOpened(r);
      });
      
      describe('defaultOpen', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<DrawerTest defaultOpen />);
        });
        
        it('is open on mount', async () => {
          await waitOpened(r);
        });
        
        it('closes on close button click', async () => {
          await closeByCloseButton(r);
          await waitClosed(r);
        });
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DrawerTest open={false} />);
      });
      
      it('does not open itself when open=false (requires parent update)', async () => {
        await openByTrigger(r);
        
        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });
      
      it('calls onChangeOpen(true) on trigger interaction', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DrawerTest open={false} onChangeOpen={onChangeOpen} />);
        
        await openByTrigger(r);
        
        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenCalledTimes(1);
          expect(onChangeOpen).toHaveBeenLastCalledWith(true);
        });
      });
      
      it('opens when parent sets open=true', async () => {
        r.rerender(<DrawerTest open />);
        await waitOpened(r);
      });
      
      it('calls onChangeOpen(false) on outside press when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DrawerTest open onChangeOpen={onChangeOpen} />);
        
        await waitOpened(r);
        
        await closeByOutsideClick();
        
        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenCalledTimes(1);
          expect(onChangeOpen).toHaveBeenLastCalledWith(false);
        });
      });
      
      it('calls onChangeOpen(false) on close button click when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DrawerTest open onChangeOpen={onChangeOpen} />);
        await waitOpened(r);
        
        await closeByCloseButton(r);
        
        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenCalledTimes(1);
          expect(onChangeOpen).toHaveBeenLastCalledWith(false);
        });
      });
      
      it('does not close itself until parent updates open=false', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DrawerTest open onChangeOpen={onChangeOpen} />);
        await waitOpened(r);
        
        await closeByOutsideClick();
        
        await waitFor(() => {
          expect(onChangeOpen).toHaveBeenCalledWith(false);
        });
        
        await waitFor(() => {
          expect(getContent(r)).toHaveAttribute('data-status', 'open');
        });
        
        r.rerender(<DrawerTest open={false} onChangeOpen={onChangeOpen} />);
        await waitClosed(r);
      });
    });
    
    describe('position', () => {
      it('passes position via data-position', async () => {
        const r = render(<DrawerTest position='left' />);
        
        await openByTrigger(r);
        await waitOpened(r);
        
        await expect.element(getContent(r)).toHaveAttribute('data-position', 'left');
      });
    })
  });
  
  describe('Edge cases', () => {
    describe('nested drawers', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(
          <DrawerTest>
            <InnerDrawerTest />
          </DrawerTest>
        );
        
        await openByTrigger(r);
        
        await userEvent.click(getInnerTrigger(r));
        await waitInnerOpened(r);
      });
      
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
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DrawerTest defaultOpen />);
      });
      
      it('close button has accessible name (WCAG 4.1.2)', async () => {
        await waitOpened(r);
        await expect.element(getClose(r)).toHaveAccessibleName('Close drawer');
      });
    });
    
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DrawerTest defaultOpen />);
      });
      
      it('drawer is exposed with role=dialog (APG Dialog / Floating UI role)', async () => {
        await waitOpened(r);
        await expect.element(r.getByRole('dialog')).toBeInTheDocument();
      });
      
      it('title is exposed as heading level 3', async () => {
        await waitOpened(r);
        await expect.element(r.getByRole('heading', { level: 3 })).toBeInTheDocument();
      });
    });
    
    describe('focus', () => {
      it('moves focus into the drawer on open', async () => {
        const r = render(<DrawerTest defaultOpen />);
        await waitOpened(r);
        
        await expect.element(getClose(r)).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('closes on Escape in uncontrolled mode', async () => {
        const r = render(<DrawerTest />);
        await openByTrigger(r);
        await waitOpened(r);
        
        await userEvent.keyboard('{Escape}');
        await waitClosed(r);
      });
      
      it('does not close on Escape when dismissible=false', async () => {
        const r = render(<DrawerTest dismissible={false} />);
        await openByTrigger(r);
        await waitOpened(r);
        
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
          expect(getContent(r)).toHaveAttribute('data-status', 'open');
        });
      });
    });
  });
});