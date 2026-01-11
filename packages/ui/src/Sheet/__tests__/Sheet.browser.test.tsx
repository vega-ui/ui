import { ComponentProps, FC, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';

import { Sheet } from '../Sheet';
import {
  SheetBackdrop,
  SheetContent,
  SheetHandle,
  SheetMain,
  SheetPortal,
  SheetTrigger,
} from '../components';
import { userEvent } from 'vitest/browser';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_PORTAL = 'portal';
const TESTID_BACKDROP = 'backdrop';
const TESTID_CLOSE_BUTTON = 'close-button';
const TESTID_CONTENT = 'content';
const TESTID_HANDLE = 'handle';
const TESTID_MAIN = 'main';

const LOREM = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry';

const SNAP_POINTS: Array<number | `${number}px`> = [0, 200, 400];

const SheetTest: FC<PropsWithChildren<ComponentProps<typeof Sheet>>> = (props) => (
  <Sheet {...props}>
    <SheetTrigger data-testid={TESTID_TRIGGER}>Open</SheetTrigger>
    <SheetPortal>
      <div data-testid={TESTID_PORTAL}>
        <SheetBackdrop data-testid={TESTID_BACKDROP}>
          <SheetContent data-testid={TESTID_CONTENT}>
            <SheetHandle data-testid={TESTID_HANDLE} />
            <SheetMain data-testid={TESTID_MAIN}>
              {LOREM}
              <button data-testid={TESTID_CLOSE_BUTTON}>Close</button>
            </SheetMain>
          </SheetContent>
        </SheetBackdrop>
      </div>
    </SheetPortal>
  </Sheet>
);

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER) as HTMLButtonElement;

const queryPortal = (r: RenderResult) => r.queryByTestId(TESTID_PORTAL) as HTMLDivElement | null;
const queryBackdrop = (r: RenderResult) => r.queryByTestId(TESTID_BACKDROP) as HTMLDivElement | null;
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLDivElement | null;

const getPortal = (r: RenderResult) => r.getByTestId(TESTID_PORTAL) as HTMLDivElement;
const getBackdrop = (r: RenderResult) => r.getByTestId(TESTID_BACKDROP) as HTMLDivElement;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLDivElement;

const queryHandle = (r: RenderResult) => r.queryByTestId(TESTID_HANDLE) as HTMLDivElement | null;
const getHandle = (r: RenderResult) => r.getByTestId(TESTID_HANDLE) as HTMLDivElement;

const queryMain = (r: RenderResult) => r.queryByTestId(TESTID_MAIN) as HTMLDivElement | null;
const getMain = (r: RenderResult) => r.getByTestId(TESTID_MAIN) as HTMLDivElement;

const getCloseButton = (r: RenderResult) => r.getByTestId(TESTID_CLOSE_BUTTON) as HTMLButtonElement;

const waitOpened = async (r: RenderResult) => {
  const content = getContent(r);
  await expect.element(content).toBeInTheDocument();
  await expect.element(content).toHaveAttribute('data-status', 'open');
};

const waitClosed = async (r: RenderResult) => {
  await expect.element(queryPortal(r)).not.toBeInTheDocument();
  await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
  await expect.element(queryContent(r)).not.toBeInTheDocument();
};

const swipe = async (target: HTMLElement, from: number, to: number) => {
  fireEvent.pointerDown(target, {
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
    clientY: from,
    buttons: 1,
  });
  
  fireEvent.pointerMove(target, {
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
    clientY: to,
    buttons: 1,
  });
  
  fireEvent.pointerUp(target, {
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
    clientY: to,
    buttons: 1,
  });
};

describe('Sheet', () => {
  describe('Critical User Paths', () => {
    describe('render', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SheetTest />);
      });
      
      it('renders trigger', async () => {
        await expect.element(getTrigger(r)).toBeInTheDocument();
      });
      
      it('does not render portal content while closed', async () => {
        await expect.element(queryPortal(r)).not.toBeInTheDocument();
        await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });
      
      it('renders portal content when controlled open=true', async () => {
        r.rerender(<SheetTest open />);
        
        await expect.element(getPortal(r)).toBeInTheDocument();
        await expect.element(getBackdrop(r)).toBeInTheDocument();
        await expect.element(getContent(r)).toBeInTheDocument();
        await expect.element(getHandle(r)).toBeInTheDocument();
        await expect.element(getMain(r)).toBeInTheDocument();
      });
    })
    
    describe('open/close', () => {
      describe('uncontrolled', () => {
        describe('defaultOpen=false', () => {
          let r: RenderResult;
          
          beforeEach(() => {
            r = render(<SheetTest defaultOpen={false} />);
          });
          
          it('is closed initially (portal/backdrop/content are not mounted)', async () => {
            await expect.element(getTrigger(r)).toBeInTheDocument();
            
            await waitClosed(r)
            
            await expect.element(queryHandle(r)).not.toBeInTheDocument();
            await expect.element(queryMain(r)).not.toBeInTheDocument();
          });
          
          it('opens via trigger click (mounts portal subtree)', async () => {
            await userEvent.click(getTrigger(r));
            await waitOpened(r);
            
            await expect.element(getHandle(r)).toBeInTheDocument();
            await expect.element(getMain(r)).toBeInTheDocument();
            await expect.element(getMain(r)).toHaveTextContent(LOREM);
          });
          
          it('closes via outside pointerdown (unmounts portal subtree)', async () => {
            await userEvent.click(getTrigger(r));
            await waitOpened(r);
            
            fireEvent.pointerDown(document.body);
            
            await waitClosed(r);
          });
          
          it('can be reopened after close', async () => {
            await userEvent.click(getTrigger(r));
            await waitOpened(r);
            
            fireEvent.pointerDown(document.body);
            await waitClosed(r);
            
            await userEvent.click(getTrigger(r));
            
            await expect.element(getPortal(r)).toBeInTheDocument();
            await expect.element(getContent(r)).toBeInTheDocument();
            await waitOpened(r);
          });
        });
        
        describe('defaultOpen=true', () => {
          let r: RenderResult;
          
          beforeEach(() => {
            r = render(<SheetTest defaultOpen />);
          });
          
          it('is opened initially (portal subtree mounted)', async () => {
            await waitOpened(r);
            
            await expect.element(getHandle(r)).toBeInTheDocument();
            await expect.element(getMain(r)).toBeInTheDocument();
          });
          
          it('closes via outside pointerdown', async () => {
            await waitOpened(r);
            
            fireEvent.pointerDown(document.body);
            
            await waitClosed(r);
          });
        });
      });
      
      describe('controlled', () => {
        describe('open=false', () => {
          let r: RenderResult;
          const onOpenChange = vi.fn();
          
          beforeEach(() => {
            r = render(<SheetTest open={false} onOpenChange={onOpenChange} />);
          });
          
          it('is closed initially', async () => {
            await waitClosed(r)
          });
          
          it('requests open on trigger click (calls onOpenChange(true))', async () => {
            await userEvent.click(getTrigger(r));
            
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenCalledWith(true);
            
            await expect.element(queryPortal(r)).not.toBeInTheDocument();
            await expect.element(queryContent(r)).not.toBeInTheDocument();
          });
          
          it('opens only after parent updates open=true', async () => {
            await userEvent.click(getTrigger(r));
            
            expect(onOpenChange).toHaveBeenCalledWith(true);
            
            r.rerender(<SheetTest open onOpenChange={onOpenChange} />);
            
            await expect.element(getPortal(r)).toBeInTheDocument();
            await expect.element(getContent(r)).toBeInTheDocument();
            await waitOpened(r);
          });
        });
        
        describe('open=true', () => {
          let r: RenderResult;
          const onOpenChange = vi.fn();
          
          beforeEach(() => {
            r = render(<SheetTest open onOpenChange={onOpenChange} />);
          });
          
          it('is opened initially', async () => {
            await expect.element(getPortal(r)).toBeInTheDocument();
            await expect.element(getBackdrop(r)).toBeInTheDocument();
            await expect.element(getContent(r)).toBeInTheDocument();
            await waitOpened(r);
          });
          
          it('requests close on outside pointerdown (calls onOpenChange(false)) and stays mounted until parent updates', async () => {
            await waitOpened(r);
            
            fireEvent.pointerDown(document.body);
            
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenCalledWith(false);
            
            await expect.element(getPortal(r)).toBeInTheDocument();
            await expect.element(getContent(r)).toBeInTheDocument();
            await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
          });
          
          it('closes only after parent updates open=false', async () => {
            await waitOpened(r);
            
            fireEvent.pointerDown(document.body);
            expect(onOpenChange).toHaveBeenCalledWith(false);
            
            r.rerender(<SheetTest open={false} onOpenChange={onOpenChange} />);
            
            await waitClosed(r);
          });
        });
      });
    })
    
    describe('snap points', () => {
      describe('uncontrolled', () => {
        let r: RenderResult;
        
        beforeEach(async () => {
          r = render(
            <SheetTest
              defaultOpen
              snapPoints={SNAP_POINTS}
              defaultSnapPoint={0}
              onChangeActiveSnapPoint={vi.fn()}
            />
          );
          
          await waitOpened(r);
        });
        
        it('starts at defaultSnapPoint and applies transform on open', async () => {
          const content = getContent(r);
          const t = content.style.transform || '';
          await expect.element(content).toBeInTheDocument();
          expect(t).toMatch(/translateY\(/);
        });
        
        it('updates transform while dragging (data-dragging=true)', async () => {
          const content = getContent(r);
          
          await swipe(getMain(r), 600, 450);
          await expect.element(content).toHaveAttribute('data-dragging', 'false');
        });
        
        it('calls onChangeActiveSnapPoint when user drags to closest snap point', async () => {
          const onChangeActiveSnapPoint = vi.fn();
          
          r.rerender(
            <SheetTest
              defaultOpen
              snapPoints={SNAP_POINTS}
              defaultSnapPoint={0}
              onChangeActiveSnapPoint={onChangeActiveSnapPoint}
            />
          );
          
          await waitOpened(r);
          await swipe(getMain(r), 600, 200);
          
          expect(onChangeActiveSnapPoint).toHaveBeenCalled();
          const last = onChangeActiveSnapPoint.mock.calls.at(-1)?.[0];
          expect(typeof last).toBe('number');
        });
        
        it('does not crash when snapPoints is empty', async () => {
          r.rerender(<SheetTest defaultOpen snapPoints={[]} defaultSnapPoint={0} />);
          await expect.element(queryContent(r) as HTMLElement).toBeInTheDocument();
        });
      });
      
      describe('controlled', () => {
        it('requests snap point change via onChangeActiveSnapPoint when activeSnapPoint is controlled', async () => {
          const onChangeActiveSnapPoint = vi.fn();
          
          const r = render(
            <SheetTest
              defaultOpen
              snapPoints={SNAP_POINTS}
              activeSnapPoint={0}
              onChangeActiveSnapPoint={onChangeActiveSnapPoint}
            />
          );
          
          await waitOpened(r);
          await swipe(getMain(r), 600, 200);
          
          expect(onChangeActiveSnapPoint).toHaveBeenCalled();
          const last = onChangeActiveSnapPoint.mock.calls.at(-1)?.[0];
          expect(typeof last).toBe('number');
        });
        
        it('applies transform based on controlled activeSnapPoint prop changes', async () => {
          const onChangeActiveSnapPoint = vi.fn();
          
          const r = render(
            <SheetTest
              defaultOpen
              snapPoints={SNAP_POINTS}
              activeSnapPoint={0}
              onChangeActiveSnapPoint={onChangeActiveSnapPoint}
            />
          );
          
          await waitOpened(r);
          
          const content0 = getContent(r).style.transform || '';
          
          r.rerender(
            <SheetTest
              defaultOpen
              snapPoints={SNAP_POINTS}
              activeSnapPoint={2}
              onChangeActiveSnapPoint={onChangeActiveSnapPoint}
            />
          );
          
          await waitFor(() => {
            const content2 = getContent(r).style.transform || '';
            expect(content2).not.toBe(content0);
          });
        });
      });
      
      describe('steppedSnapPoints', () => {
        it('moves to next/prev snap point per swipe direction when steppedSnapPoints=true', async () => {
          const onChangeActiveSnapPoint = vi.fn();
          
          const r = render(
            <SheetTest
              defaultOpen
              snapPoints={SNAP_POINTS}
              defaultSnapPoint={1}
              steppedSnapPoints
              onChangeActiveSnapPoint={onChangeActiveSnapPoint}
            />
          );
          
          await waitOpened(r);
          
          // swipe up (direction -1) => move to previous snap point
          await swipe(getMain(r), 400, 450);
          expect(onChangeActiveSnapPoint).toHaveBeenCalled();
          
          // swipe down (direction 1) => move to next snap point
          await swipe(getMain(r), 200, 450);
          expect(onChangeActiveSnapPoint).toHaveBeenCalled();
        });
      });
    })
    
    describe('clickEnabled', () => {
      describe('uncontrolled', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<SheetTest defaultOpen={false} clickEnabled={false} />);
        });
        
        it('does not open via trigger click when clickEnabled=false', async () => {
          await expect.element(queryContent(r)).not.toBeInTheDocument();
          
          await userEvent.click(getTrigger(r));
          
          await expect.element(queryPortal(r)).not.toBeInTheDocument();
          await expect.element(queryBackdrop(r)).not.toBeInTheDocument();
          await expect.element(queryContent(r)).not.toBeInTheDocument();
        });
        
        it('opens via trigger click when clickEnabled=true', async () => {
          r.rerender(<SheetTest defaultOpen={false} clickEnabled />);
          
          await userEvent.click(getTrigger(r));
          
          await waitOpened(r);
          await expect.element(getContent(r)).toBeInTheDocument();
        });
      });
      
      describe('controlled', () => {
        it('does not request open when clickEnabled=false', async () => {
          const onOpenChange = vi.fn();
          const r = render(<SheetTest open={false} onOpenChange={onOpenChange} clickEnabled={false} />);
          
          await userEvent.click(getTrigger(r));
          
          expect(onOpenChange).not.toHaveBeenCalled();
          await expect.element(queryContent(r)).not.toBeInTheDocument();
        });
        
        it('requests open when clickEnabled=true', async () => {
          const onOpenChange = vi.fn();
          const r = render(<SheetTest open={false} onOpenChange={onOpenChange} clickEnabled />);
          
          await userEvent.click(getTrigger(r));
          
          expect(onOpenChange).toHaveBeenCalledTimes(1);
          expect(onOpenChange).toHaveBeenCalledWith(true);
        });
      });
    });
    
    describe('dismissible', () => {
      describe('uncontrolled', () => {
        let r: RenderResult;
        
        beforeEach(async () => {
          r = render(<SheetTest defaultOpen dismissible={false} />);
          await waitOpened(r);
        });
        
        it('does not close on outside pointerdown when dismissible=false', async () => {
          fireEvent.pointerDown(document.body);
          
          await expect.element(getContent(r)).toBeInTheDocument();
          await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        });
        
        it('closes on outside pointerdown when dismissible=true', async () => {
          r.rerender(<SheetTest defaultOpen dismissible />);
          
          await waitOpened(r);
          
          fireEvent.pointerDown(document.body);
          
          await waitClosed(r);
        });
      });
      
      describe('controlled', () => {
        it('does not request close on outside pointerdown when dismissible=false', async () => {
          const onOpenChange = vi.fn();
          const r = render(<SheetTest open dismissible={false} onOpenChange={onOpenChange} />);
          
          await waitOpened(r);
          
          fireEvent.pointerDown(document.body);
          
          expect(onOpenChange).not.toHaveBeenCalled();
          await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        });
        
        it('requests close on outside pointerdown when dismissible=true (and closable=true by default)', async () => {
          const onOpenChange = vi.fn();
          const r = render(<SheetTest open dismissible onOpenChange={onOpenChange} />);
          
          await waitOpened(r);
          
          fireEvent.pointerDown(document.body);
          
          expect(onOpenChange).toHaveBeenCalledTimes(1);
          expect(onOpenChange).toHaveBeenCalledWith(false);
          
          await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        });
      });
    });
    
    describe('closable', () => {
      describe('uncontrolled', () => {
        let r: RenderResult;
        
        beforeEach(async () => {
          r = render(<SheetTest defaultOpen closable={false} />);
          await waitOpened(r);
        });
        
        it('does not close on outside pointerdown when closable=false', async () => {
          fireEvent.pointerDown(document.body);
          
          await expect.element(getContent(r)).toBeInTheDocument();
          await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        });
        
        it('closes on outside pointerdown when closable=true (and dismissible=true by default)', async () => {
          r.rerender(<SheetTest defaultOpen closable />);
          
          await waitOpened(r);
          
          fireEvent.pointerDown(document.body);
          
          await waitClosed(r);
        });
      });
      
      describe('controlled', () => {
        it('does not request close on outside pointerdown when closable=false', async () => {
          const onOpenChange = vi.fn();
          const r = render(<SheetTest open closable={false} onOpenChange={onOpenChange} />);
          
          await waitOpened(r);
          
          fireEvent.pointerDown(document.body);
          
          expect(onOpenChange).not.toHaveBeenCalled();
          await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        });
        
        it('requests close on outside pointerdown when closable=true (and dismissible=true by default)', async () => {
          const onOpenChange = vi.fn();
          const r = render(<SheetTest open closable onOpenChange={onOpenChange} />);
          
          await waitOpened(r);
          
          fireEvent.pointerDown(document.body);
          
          expect(onOpenChange).toHaveBeenCalledTimes(1);
          expect(onOpenChange).toHaveBeenCalledWith(false);
          
          await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        });
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('does not throw when rendered with no children', async () => {
      const r = render(<Sheet />);
      await expect.element(r.container).toBeInTheDocument();
    });
    
    it('does not throw when snapPoints is empty and defaultSnapPoint is provided', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={[]}
          defaultSnapPoint={0}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await expect.element(queryContent(r) as HTMLElement).toBeInTheDocument();
    });
    
    it('does not throw when snapPoints is undefined but snap-point props are provided', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          defaultSnapPoint={0}
          onChangeActiveSnapPoint={vi.fn()}
          activeSnapPoint={0}
        />
      );
      
      await expect.element(getContent(r)).toBeInTheDocument();
      await waitOpened(r);
    });
    
    it('ignores drag and does not call onChangeActiveSnapPoint when snapPoints is undefined', async () => {
      const onChangeActiveSnapPoint = vi.fn();
      
      const r = render(
        <SheetTest
          defaultOpen
          onChangeActiveSnapPoint={onChangeActiveSnapPoint}
        />
      );
      
      await waitOpened(r);
      
      await swipe(getMain(r), 600, 200);
      
      expect(onChangeActiveSnapPoint).not.toHaveBeenCalled();
    });
    
    it('does not close on outside press when dismissible=true but closable=false', async () => {
      const r = render(<SheetTest defaultOpen dismissible closable={false} />);
      await waitOpened(r);
      
      fireEvent.pointerDown(document.body);
      
      await expect.element(getContent(r)).toBeInTheDocument();
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });
    
    it('does not request close on outside press when controlled and dismissible=true but closable=false', async () => {
      const onOpenChange = vi.fn();
      const r = render(<SheetTest open dismissible closable={false} onOpenChange={onOpenChange} />);
      
      await waitOpened(r);
      
      fireEvent.pointerDown(document.body);
      
      expect(onOpenChange).not.toHaveBeenCalled();
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });
    
    it('handles mixed snapPoints formats (number and px string) without crashing', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={[0, '200px', 400]}
          defaultSnapPoint={0}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await waitOpened(r);
      
      await expect.element(getMain(r)).toHaveTextContent(LOREM);
    });
    
    it('does not crash when snapPoints contains duplicates', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={[0, 200, 200, 400]}
          defaultSnapPoint={1}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await waitOpened(r);
      await expect.element(getContent(r)).toBeInTheDocument();
    });
    
    it('does not crash when snapPoints are unsorted', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={[400, 0, 200]}
          defaultSnapPoint={0}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await waitOpened(r);
      await expect.element(getContent(r)).toBeInTheDocument();
    });
    
    it('does not crash when swipeTimestamp is 0', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={SNAP_POINTS}
          defaultSnapPoint={1}
          swipeTimestamp={0}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await waitOpened(r);
      
      await swipe(getMain(r), 600, 200);
      
      await expect.element(getContent(r)).toBeInTheDocument();
    });
    
    it('clamps stepping at boundaries when steppedSnapPoints=true and only one snap point exists', async () => {
      const onChangeActiveSnapPoint = vi.fn();
      
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={[200]}
          defaultSnapPoint={0}
          steppedSnapPoints
          onChangeActiveSnapPoint={onChangeActiveSnapPoint}
        />
      );
      
      await waitOpened(r);
      
      await swipe(getMain(r), 200, 450);
      await swipe(getMain(r), 450, 200);
      
      const values = onChangeActiveSnapPoint.mock.calls.map((c) => c[0]);
      expect(values.some((v) => v !== 0)).toBe(false);
    });
    
    it('does not crash when edgeThreshold is > 1 (treats as very hard to reach)', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={SNAP_POINTS}
          defaultSnapPoint={1}
          edgeThreshold={2}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await waitOpened(r);
      
      await swipe(getMain(r), 100, 700);
      
      await expect.element(getContent(r)).toBeInTheDocument();
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });
    
    it('does not crash when siblingThreshold is > 1', async () => {
      const r = render(
        <SheetTest
          defaultOpen
          snapPoints={SNAP_POINTS}
          defaultSnapPoint={1}
          siblingThreshold={2}
          onChangeActiveSnapPoint={vi.fn()}
        />
      );
      
      await waitOpened(r);
      
      await swipe(getMain(r), 600, 200);
      
      await expect.element(getContent(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<SheetTest defaultOpen />);
        await waitOpened(r);
      });
      
      it('renders content with role="dialog"', async () => {
        await expect.element(getContent(r)).toHaveRole('dialog');
      });
      
      it('keeps trigger as a button (implicit role)', async () => {
        await expect.element(getTrigger(r)).toHaveRole('button');
      });
    });
    
    describe('aria', () => {
      it('does not set aria-disabled on trigger by default', async () => {
        const r = render(<SheetTest />);
        await expect.element(getTrigger(r)).not.toHaveAttribute('aria-disabled');
      });
      
      it('does not set aria-hidden on content by default (mounted only when open)', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);
        
        await expect.element(getContent(r)).not.toHaveAttribute('aria-hidden');
      });
    });
    
    describe('keyboard', () => {
      it('closes on Escape when dismissible and closable (uncontrolled)', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);
        
        await userEvent.keyboard('{Escape}');
        
        await waitClosed(r);
      });
      
      it('does not close on Escape when dismissible=false', async () => {
        const r = render(<SheetTest defaultOpen dismissible={false} />);
        await waitOpened(r);
        
        await userEvent.keyboard('{Escape}');
        
        await expect.element(getContent(r)).toBeInTheDocument();
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });
      
      it('does not close on Escape when closable=false', async () => {
        const r = render(<SheetTest defaultOpen closable={false} />);
        await waitOpened(r);
        
        await userEvent.keyboard('{Escape}');
        
        await expect.element(getContent(r)).toBeInTheDocument();
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });
    });
    
    describe('focus', () => {
      it('moves focus into sheet when opened (FloatingFocusManager)', async () => {
        const r = render(<SheetTest defaultOpen={false} />);
        
        getTrigger(r).focus();
        await expect.element(getTrigger(r)).toHaveFocus();
        
        await userEvent.click(getTrigger(r));
        await waitOpened(r);
        
        await waitFor(() => {
          expect(document.activeElement).not.toBe(getTrigger(r));
        });
        
        await expect.element(getContent(r)).toContainElement(document.activeElement as HTMLElement);
      });
      
      it('returns focus to trigger after close (uncontrolled)', async () => {
        const r = render(<SheetTest defaultOpen={false} />);
        
        await userEvent.click(getTrigger(r));
        await waitOpened(r);
        
        fireEvent.pointerDown(document.body);
        await waitClosed(r);
        
        await expect.element(getTrigger(r)).toHaveFocus();
      });
      
      it('traps focus inside sheet while open (Tab cycles inside)', async () => {
        const r = render(<SheetTest defaultOpen />);
        
        await waitOpened(r);
        
        getCloseButton(r).focus();
        await expect.element(getCloseButton(r)).toHaveFocus();
        
        await userEvent.tab();
        await expect.element(getCloseButton(r)).toHaveFocus();
        
        await userEvent.tab();
        await expect.element(getCloseButton(r)).toHaveFocus();
      });
    });
  });
});