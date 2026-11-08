import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Drawer } from '../Drawer';
import { DrawerClose, DrawerContent, DrawerTrigger } from '../components';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';
const TESTID_CLOSE = 'close';

const TESTID_INNER_TRIGGER = 'inner-trigger';
const TESTID_INNER_CONTENT = 'inner-content';
const TESTID_INNER_CLOSE = 'inner-close';

type DrawerTestProps = ComponentProps<typeof Drawer> & Pick<ComponentProps<typeof DrawerContent>, 'closedBy'>

const DrawerTest: FC<DrawerTestProps> = ({ children, closedBy, ...props }) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger data-testid={TESTID_TRIGGER}>Open</DrawerTrigger>
      <DrawerContent data-testid={TESTID_CONTENT} aria-labelledby='title' closedBy={closedBy}>
        <h2 id='title'>Title</h2>
        <form method='dialog'>
          <button data-testid={TESTID_CLOSE} aria-label='Close drawer'>×</button>
        </form>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

const InnerDrawerTest: FC<ComponentProps<typeof Drawer>> = (props) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger data-testid={TESTID_INNER_TRIGGER}>Open inner</DrawerTrigger>
      <DrawerContent data-testid={TESTID_INNER_CONTENT} aria-label='Inner title'>
        <form method='dialog'>
          <button data-testid={TESTID_INNER_CLOSE} aria-label='Close inner'>×</button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLDialogElement | null;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLDialogElement;
const getClose = (r: RenderResult) => r.getByTestId(TESTID_CLOSE);

const getInnerTrigger = (r: RenderResult) => r.getByTestId(TESTID_INNER_TRIGGER);
const queryInnerContent = (r: RenderResult) => r.queryByTestId(TESTID_INNER_CONTENT);
const getInnerContent = (r: RenderResult) => r.getByTestId(TESTID_INNER_CONTENT) as HTMLDialogElement;
const getInnerClose = (r: RenderResult) => r.getByTestId(TESTID_INNER_CLOSE);

const waitOpened = async (r: RenderResult) => {
  await expect.element(queryContent(r)).toBeInTheDocument();
  await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
  await expect.poll(() => getContent(r).matches(':modal')).toBe(true);
  await expect.poll(() => getContent(r).getAnimations().length).toBe(0);
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

const clickBackdrop = async (dialog: HTMLDialogElement) => {
  await userEvent.click(dialog, { position: { x: -1, y: -1 } });
};

const closeByCloseButton = async (r: RenderResult) => {
  await userEvent.click(getClose(r));
};

const getDrag = (r: RenderResult) => parseFloat(getContent(r).style.getPropertyValue('--drawer-drag'));

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const touch = { pointerId: 1, isPrimary: true, button: 0, pointerType: 'touch' };

const touchAt = (target: HTMLElement, dx = 0, dy = 0, pointerType = 'touch') => {
  const rect = target.getBoundingClientRect();
  return { ...touch, pointerType, clientX: rect.left + rect.width / 2 + dx, clientY: rect.top + rect.height / 2 + dy };
};

const swipe = async (target: HTMLElement, axis: 'x' | 'y', distance: number, { flick = false } = {}) => {
  const origin = touchAt(target);
  const at = (step: number) => {
    const shift = (distance * step) / 6;
    return { ...origin, clientX: origin.clientX + (axis === 'x' ? shift : 0), clientY: origin.clientY + (axis === 'y' ? shift : 0) };
  };

  fireEvent.pointerDown(target, at(0));

  for (let step = 1; step <= 6; step++) {
    await wait(16);
    fireEvent.pointerMove(target, at(step));
  }

  if (!flick) await wait(150);
  fireEvent.pointerUp(target, at(6));
};

describe('Drawer', () => {
  describe('Critical User Paths', () => {
    describe('DrawerClose', () => {
      it('closes the drawer with the close transition', async () => {
        const r = render(
          <Drawer defaultOpen>
            <DrawerContent data-testid='close-content' aria-label='Panel'>
              <DrawerClose>Done</DrawerClose>
            </DrawerContent>
          </Drawer>
        );
        await expect.poll(() => (r.getByTestId('close-content') as HTMLDialogElement).matches(':modal')).toBe(true);

        await userEvent.click(r.getByRole('button', { name: 'Done' }));

        expect((r.getByTestId('close-content') as HTMLDialogElement).open).toBe(true);
        expect(r.getByTestId('close-content')).toHaveAttribute('data-status', 'close');
        await expect.element(r.queryByTestId('close-content')).not.toBeInTheDocument();
      });

      it('closes inside a form without submitting it', async () => {
        const onSubmit = vi.fn();
        const r = render(
          <Drawer defaultOpen>
            <DrawerContent data-testid={TESTID_CONTENT} aria-label='Panel'>
              <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
                <DrawerClose>Cancel</DrawerClose>
              </form>
            </DrawerContent>
          </Drawer>
        );
        await waitOpened(r);

        await userEvent.click(r.getByRole('button', { name: 'Cancel' }));

        await waitClosed(r);
        expect(onSubmit).not.toHaveBeenCalled();
      });

      it('closes through its child with asChild and keeps the child onClick', async () => {
        const onClick = vi.fn();
        const onChangeOpen = vi.fn();
        const r = render(
          <Drawer open onChangeOpen={onChangeOpen}>
            <DrawerContent aria-label='Panel'>
              <DrawerClose asChild>
                <button aria-label='Close' onClick={onClick}>×</button>
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        );

        await userEvent.click(r.getByRole('button', { name: 'Close' }));

        expect(onClick).toHaveBeenCalledOnce();
        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      });

      it('requests close once when asChild submits a form with method dialog', async () => {
        const onChangeOpen = vi.fn();
        const r = render(
          <Drawer open onChangeOpen={onChangeOpen}>
            <DrawerContent aria-label='Panel'>
              <form method='dialog'>
                <DrawerClose asChild>
                  <button>Done</button>
                </DrawerClose>
              </form>
            </DrawerContent>
          </Drawer>
        );

        await userEvent.click(r.getByRole('button', { name: 'Done' }));

        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      });
    });

    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DrawerTest />);
      });
      
      it('closes on backdrop click', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await clickBackdrop(getContent(r));
        await waitClosed(r);
      });

      it('stays open on a click inside the content', async () => {
        await openByTrigger(r);
        await waitOpened(r);

        await userEvent.click(getContent(r), { position: { x: 4, y: 4 } });

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('closes on Escape when closedBy=closerequest', async () => {
        r.rerender(<DrawerTest closedBy='closerequest' />);
        await openByTrigger(r);
        await waitOpened(r);

        await userEvent.keyboard('{Escape}');

        await waitClosed(r);
      });

      it('stays open on backdrop click when closedBy=none', async () => {
        r.rerender(<DrawerTest closedBy='none' />);
        await openByTrigger(r);
        await waitOpened(r);

        await clickBackdrop(getContent(r));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('stays open on backdrop click when closedBy=closerequest', async () => {
        r.rerender(<DrawerTest closedBy='closerequest' />);
        await openByTrigger(r);
        await waitOpened(r);

        await clickBackdrop(getContent(r));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('reopens after close', async () => {
        await openByTrigger(r);
        await waitOpened(r);
        
        await closeByCloseButton(r);
        await waitClosed(r);
        
        await openByTrigger(r);
        await waitOpened(r);
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
      
      it('calls onChangeOpen(false) on backdrop click when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DrawerTest open onChangeOpen={onChangeOpen} />);
        
        await waitOpened(r);
        
        await clickBackdrop(getContent(r));
        
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
        
        await clickBackdrop(getContent(r));
        
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
      describe('right to left', () => {
        beforeEach(() => {
          document.documentElement.dir = 'rtl';
        });

        afterEach(() => {
          document.documentElement.removeAttribute('dir');
        });

        it('closes the end drawer on a flick to the left', async () => {
          const r = render(<DrawerTest defaultOpen position='end' />);
          await waitOpened(r);

          await swipe(getContent(r), 'x', -60, { flick: true });

          await waitClosed(r);
        });
      });
    })

    describe('swipe', () => {
      it('follows a touch swipe toward its edge', async () => {
        const r = render(<DrawerTest defaultOpen position='end' />);
        await waitOpened(r);

        fireEvent.pointerDown(getContent(r), touchAt(getContent(r)));
        fireEvent.pointerMove(getContent(r), touchAt(getContent(r), 50));

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'true');
        expect(getDrag(r)).toBe(50);
        fireEvent.pointerUp(getContent(r), touchAt(getContent(r), 50));
      });

      it('closes on a swipe past half its size', async () => {
        const r = render(<DrawerTest defaultOpen position='end' />);
        await waitOpened(r);

        await swipe(getContent(r), 'x', getContent(r).offsetWidth);

        await waitClosed(r);
      });

      it('closes on a flick toward its edge', async () => {
        const r = render(<DrawerTest defaultOpen position='start' />);
        await waitOpened(r);

        await swipe(getContent(r), 'x', -60, { flick: true });

        await waitClosed(r);
      });

      it('closes on a swipe down from the bottom', async () => {
        const r = render(<DrawerTest defaultOpen position='bottom' />);
        await waitOpened(r);

        await swipe(getContent(r), 'y', getContent(r).offsetHeight);

        await waitClosed(r);
      });

      it('springs back after a short swipe', async () => {
        const r = render(<DrawerTest defaultOpen position='end' />);
        await waitOpened(r);

        await swipe(getContent(r), 'x', 20);

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'false');
        expect(getDrag(r)).toBe(0);
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('resists a swipe away from its edge', async () => {
        const r = render(<DrawerTest defaultOpen position='end' />);
        await waitOpened(r);

        fireEvent.pointerDown(getContent(r), touchAt(getContent(r)));
        fireEvent.pointerMove(getContent(r), touchAt(getContent(r), -200));

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'true');
        expect(getDrag(r)).toBeLessThan(0);
        expect(getDrag(r)).toBeGreaterThan(-200);
        fireEvent.pointerUp(getContent(r), touchAt(getContent(r), -200));
      });

      it('ignores swipes when closedBy is not any', async () => {
        const r = render(<DrawerTest defaultOpen position='end' closedBy='closerequest' />);
        await waitOpened(r);

        fireEvent.pointerDown(getContent(r), touchAt(getContent(r)));
        fireEvent.pointerMove(getContent(r), touchAt(getContent(r), 200));

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'false');
        fireEvent.pointerUp(getContent(r), touchAt(getContent(r), 200));
      });

      it('ignores mouse drags so text stays selectable', async () => {
        const r = render(<DrawerTest defaultOpen position='end' />);
        await waitOpened(r);

        fireEvent.pointerDown(getContent(r), touchAt(getContent(r), 0, 0, 'mouse'));
        fireEvent.pointerMove(getContent(r), touchAt(getContent(r), 200, 0, 'mouse'));

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'false');
        fireEvent.pointerUp(getContent(r), touchAt(getContent(r), 200, 0, 'mouse'));
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('slides in when something reads its style before it opens, as password managers do', async () => {
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      const showModal = HTMLDialogElement.prototype.showModal;
      HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
        this.getBoundingClientRect();
        showModal.call(this);
      };
      onTestFinished(() => {
        HTMLDialogElement.prototype.showModal = showModal;
      });
      const r = render(<DrawerTest />);

      await openByTrigger(r);

      await expect.poll(() => getContent(r).getAnimations().length).toBeGreaterThan(0);
    });

    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <DrawerTest />
        </form>
      );

      await userEvent.click(getTrigger(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('stays open when the user prevents the submit of a form with method dialog', async () => {
      const r = render(
        <DrawerTest defaultOpen>
          <form method='dialog' onSubmit={(event) => event.preventDefault()}>
            <button>Submit</button>
          </form>
        </DrawerTest>
      );
      await waitOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Submit' }));

      await wait(500);
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });

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
      
      it('keeps Tab inside the inner drawer', async () => {
        getInnerClose(r).focus();

        for (let i = 0; i < 4; i++) {
          await userEvent.tab();
          expect(getContent(r).querySelector(':focus')).toBeNull();
        }
      });

      it('Escape closes only the inner drawer', async () => {
        await userEvent.keyboard('{Escape}');

        await expect.element(queryInnerContent(r)).not.toBeInTheDocument();
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('backdrop click closes only the inner drawer', async () => {
        await clickBackdrop(getInnerContent(r));

        await expect.element(queryInnerContent(r)).not.toBeInTheDocument();
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('focus', () => {
      it('focuses the drawer itself on open', async () => {
        const r = render(<DrawerTest defaultOpen />);
        await waitOpened(r);

        await expect.element(getContent(r)).toHaveFocus();
      });

      it('focuses the autoFocus element on open', async () => {
        const r = render(<DrawerTest defaultOpen><input data-testid='input' autoFocus /></DrawerTest>);
        await waitOpened(r);

        await expect.element(r.getByTestId('input')).toHaveFocus();
      });

      it('returns focus to the trigger on close', async () => {
        const r = render(<DrawerTest />);
        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await waitOpened(r);

        await userEvent.keyboard('{Escape}');
        await waitClosed(r);

        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('returns focus to the trigger after closing with DrawerClose', async () => {
        const r = render(
          <Drawer>
            <DrawerTrigger data-testid={TESTID_TRIGGER}>Open</DrawerTrigger>
            <DrawerContent data-testid={TESTID_CONTENT} aria-label='Panel'>
              <DrawerClose>Done</DrawerClose>
            </DrawerContent>
          </Drawer>
        );
        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await waitOpened(r);

        r.getByRole('button', { name: 'Done' }).focus();
        await userEvent.keyboard('{Enter}');
        await waitClosed(r);

        await expect.element(getTrigger(r)).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      const TabTest: FC = () => (
        <Drawer defaultOpen>
          <DrawerContent data-testid={TESTID_CONTENT} aria-label='Panel'>
            <input aria-label='First' />
            <input aria-label='Last' />
          </DrawerContent>
        </Drawer>
      );

      it('moves Tab from the drawer to its first tabbable element', async () => {
        const r = render(<TabTest />);
        await waitOpened(r);
        await expect.element(getContent(r)).toHaveFocus();

        await userEvent.tab();

        await expect.element(r.getByRole('textbox', { name: 'First' })).toHaveFocus();
      });

      it('does not close on Escape when closedBy=none', async () => {
        const r = render(<DrawerTest closedBy='none' />);
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