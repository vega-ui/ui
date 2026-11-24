import { ComponentProps, FC, PropsWithChildren, createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { commands } from 'vitest/browser';

import { SnapScroller } from '../SnapScroller';
import { SnapScrollerContent } from '../components';
import type { SnapScrollerApiRef } from '../types';

afterEach(cleanup);

const TESTID_SCROLLER = 'scroller';

const ITEM_COUNT = 5;
const ITEM_SIZE = 200;

const DEFAULT_INDEX = 2;

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    index: i,
    testid: `item-${i}`,
    label: `Item ${i}`,
  }));

const SnapScrollerTest: FC<PropsWithChildren<ComponentProps<typeof SnapScroller> & { count?: number; contentProps?: Partial<ComponentProps<typeof SnapScrollerContent>>; }>> = ({
  count = ITEM_COUNT,
  contentProps,
  children,
  ...props
}) => {
  const items = makeItems(count);
  
  return (
    <SnapScroller data-testid={TESTID_SCROLLER} style={{ width: ITEM_SIZE }} {...props}>
      {children ??
        items.map((it) => (
          <SnapScrollerContent
            key={it.index}
            data-testid={it.testid}
            index={it.index}
            style={{ width: ITEM_SIZE }}
            {...contentProps}
          >
            {it.label}
          </SnapScrollerContent>
        ))}
    </SnapScroller>
  );
};

const getScroller = (view: RenderResult) => view.getByTestId(TESTID_SCROLLER) as HTMLDivElement;
const getItem = (view: RenderResult, index: number) => view.getByTestId(`item-${index}`) as HTMLDivElement;

describe('SnapScroller', () => {
  describe('Critical User Paths', () => {
    describe('defaultIndex', () => {
      let view: RenderResult;
      
      beforeEach(() => {
        view = render(<SnapScrollerTest defaultIndex={DEFAULT_INDEX} />);
      });
      
      it('initially scrolls to defaultIndex', async () => {
        const scroller = getScroller(view);
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBe(DEFAULT_INDEX * ITEM_SIZE);
        });
      });
    });
    
    describe('apiRef', () => {
      let view: RenderResult;
      const apiRef = createRef<SnapScrollerApiRef>();
      
      beforeEach(() => {
        view = render(<SnapScrollerTest apiRef={apiRef} />);
      });
      
      it('next() scrolls forward', async () => {
        const scroller = getScroller(view);
        
        await waitFor(() => {
          expect(apiRef.current).toBeTruthy();
        });
        
        apiRef.current!.next();
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBeGreaterThan(0);
        });
      });
      
      it('scrollToElementByKey() scrolls to the requested index', async () => {
        const scroller = getScroller(view);
        
        await waitFor(() => {
          expect(apiRef.current).toBeTruthy();
        });
        
        apiRef.current?.scrollToElementByKey?.(3, 'instant');
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBe(3 * ITEM_SIZE);
        });
      });
    });
    
    describe('handlers', () => {
      let view: RenderResult;
      
      beforeEach(() => {
        view = render(<SnapScrollerTest />);
      });
      
      it('calls external onScroll handler', async () => {
        const onScroll = vi.fn();
        view.rerender(<SnapScrollerTest onScroll={onScroll} />);
        
        const scroller = getScroller(view);
        
        scroller.scrollTo({ left: ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(onScroll).toHaveBeenCalled();
        });
      });
      
      it('calls onScrollSnapChanging during scroll interactions (if hook emits it)', async () => {
        const onScrollSnapChanging = vi.fn();
        view.rerender(<SnapScrollerTest onScrollSnapChanging={onScrollSnapChanging} />);
        
        const scroller = getScroller(view);
        
        scroller.scrollTo({ left: ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(onScrollSnapChanging).toHaveBeenCalled();
        });
        
        const [el, index] = onScrollSnapChanging.mock.calls.at(-1) ?? [];
        expect(el).toBeInstanceOf(HTMLElement);
        expect(typeof index).toBe('number');
      });
      
    });
  });
  
  describe('Edge Cases', () => {
    it('jumps to the next item when the user prefers reduced motion', async () => {
      await commands.emulateReducedMotion('reduce');
      onTestFinished(() => commands.emulateReducedMotion('no-preference'));
      const apiRef = createRef<SnapScrollerApiRef>();
      const onScrollSnapChange = vi.fn();
      const view = render(<SnapScrollerTest apiRef={apiRef} onScrollSnapChange={onScrollSnapChange} />);
      await waitFor(() => expect(apiRef.current).toBeTruthy());

      apiRef.current!.next();

      expect(getScroller(view).scrollLeft).toBeCloseTo(ITEM_SIZE, 0);
      await waitFor(() => expect(onScrollSnapChange).toHaveBeenCalled());
    });

    it('keeps the same apiRef across renders', () => {
      const apiRef = vi.fn();
      const view = render(<SnapScrollerTest apiRef={apiRef} />);

      view.rerender(<SnapScrollerTest apiRef={apiRef} />);

      expect(apiRef).toHaveBeenCalledTimes(1);
    });

    it('reports the new index of an item whose index changed', async () => {
      const onScrollSnapChange = vi.fn();

      const content = (secondIndex: number) => (
        <>
          <SnapScrollerContent data-testid='item-0' index={0} style={{ width: ITEM_SIZE, flexShrink: 0 }}>
            Item 0
          </SnapScrollerContent>
          <SnapScrollerContent data-testid='item-1' index={secondIndex} style={{ width: ITEM_SIZE, flexShrink: 0 }}>
            Item 1
          </SnapScrollerContent>
        </>
      );

      const view = render(<SnapScrollerTest onScrollSnapChange={onScrollSnapChange}>{content(1)}</SnapScrollerTest>);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      view.rerender(<SnapScrollerTest onScrollSnapChange={onScrollSnapChange}>{content(5)}</SnapScrollerTest>);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      getScroller(view).scrollTo({ left: ITEM_SIZE, behavior: 'instant' });

      await expect.poll(() => onScrollSnapChange.mock.lastCall).toEqual([getItem(view, 1), 5]);
    });

    it('scrolls to defaultIndex once a scroller mounted while hidden is shown', async () => {
      const host = document.createElement('div');
      host.style.display = 'none';
      document.body.appendChild(host);
      onTestFinished(() => host.remove());
      const apiRef = createRef<SnapScrollerApiRef>();
      const view = render(<SnapScrollerTest apiRef={apiRef} defaultIndex={DEFAULT_INDEX} />, { container: host });
      await new Promise((resolve) => requestAnimationFrame(resolve));

      host.style.display = '';

      await waitFor(() => expect(getScroller(view).scrollLeft).toBeCloseTo(DEFAULT_INDEX * ITEM_SIZE, 0));
      apiRef.current!.next();
      await waitFor(() => expect(getScroller(view).scrollLeft).toBeCloseTo((DEFAULT_INDEX + 1) * ITEM_SIZE, 0));
    });

    describe('right-to-left', () => {
      const RtlTest: FC<ComponentProps<typeof SnapScrollerTest>> = (props) => (
        <div dir='rtl'>
          <SnapScrollerTest {...props} />
        </div>
      );
    
      const isVisibleIn = (scroller: HTMLElement, element: HTMLElement) => {
        const outer = scroller.getBoundingClientRect();
        const inner = element.getBoundingClientRect();
      
        return inner.left >= outer.left - 1 && inner.right <= outer.right + 1;
      };
    
      it('initially scrolls to defaultIndex', async () => {
        const view = render(<RtlTest defaultIndex={DEFAULT_INDEX} />);
      
        await expect.poll(() => getScroller(view).scrollLeft).toBe(-DEFAULT_INDEX * ITEM_SIZE);
        expect(isVisibleIn(getScroller(view), getItem(view, DEFAULT_INDEX))).toBe(true);
      });
    
      it('next() scrolls to the left and prev() back to the right', async () => {
        const apiRef = createRef<SnapScrollerApiRef>();
        const onScrollSnapChange = vi.fn();
        const view = render(<RtlTest apiRef={apiRef} onScrollSnapChange={onScrollSnapChange} />);
      
        await expect.poll(() => apiRef.current).toBeTruthy();
      
        apiRef.current!.next();
        await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(1);
        await expect.poll(() => getScroller(view).scrollLeft).toBeCloseTo(-ITEM_SIZE, 0);
      
        apiRef.current!.prev();
        await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(0);
        await expect.poll(() => getScroller(view).scrollLeft).toBeCloseTo(0, 0);
      });
    
      it('scrollToElementByKey() aligns items narrower than the viewport to the inline start', async () => {
        const apiRef = createRef<SnapScrollerApiRef>();
        const view = render(<RtlTest apiRef={apiRef} style={{ width: ITEM_SIZE * 2 }} />);
      
        await expect.poll(() => apiRef.current).toBeTruthy();
      
        apiRef.current!.scrollToElementByKey(2, 'instant');
      
        await expect.poll(() => getScroller(view).scrollLeft).toBe(-2 * ITEM_SIZE);
        expect(getItem(view, 2).getBoundingClientRect().right).toBeCloseTo(getScroller(view).getBoundingClientRect().right, 0);
      });
    
      it('reports the snapped item after a swipe to the left', async () => {
        const onScrollSnapChange = vi.fn();
        const view = render(<RtlTest onScrollSnapChange={onScrollSnapChange} />);
        const scroller = getScroller(view);
      
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        scroller.scrollTo({ left: -3 * ITEM_SIZE, behavior: 'instant' });
      
        await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(3);
      });

      it('keeps paging after the page switches to right-to-left', async () => {
        const apiRef = createRef<SnapScrollerApiRef>();
        const onScrollSnapChange = vi.fn();
        const view = render(<div><SnapScrollerTest apiRef={apiRef} onScrollSnapChange={onScrollSnapChange} /></div>);
        await expect.poll(() => apiRef.current).toBeTruthy();
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        (view.container.firstElementChild as HTMLElement).dir = 'rtl';
        apiRef.current!.next();

        await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(1);
        await expect.poll(() => getScroller(view).scrollLeft).toBeCloseTo(-ITEM_SIZE, 0);
      });
    });

    describe('vertical', () => {
      const ROW = 40;

      const VerticalTest: FC<ComponentProps<typeof SnapScrollerTest>> = (props) => (
        <SnapScrollerTest orientation='vertical' style={{ height: ROW, width: ITEM_SIZE }} contentProps={{ style: { height: ROW } }} {...props} />
      );

      it('opens at defaultIndex and pages along the block axis', async () => {
        const apiRef = createRef<SnapScrollerApiRef>();
        const onScrollSnapChange = vi.fn();
        const view = render(<VerticalTest apiRef={apiRef} defaultIndex={DEFAULT_INDEX} onScrollSnapChange={onScrollSnapChange} />);

        await expect.poll(() => getScroller(view).scrollTop).toBe(DEFAULT_INDEX * ROW);
        expect(getScroller(view).scrollLeft).toBe(0);

        apiRef.current!.next();
        await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(DEFAULT_INDEX + 1);
        await expect.poll(() => getScroller(view).scrollTop).toBeCloseTo((DEFAULT_INDEX + 1) * ROW, 0);
      });

      it('reports the snapped item after a scroll down', async () => {
        const onScrollSnapChange = vi.fn();
        const view = render(<VerticalTest onScrollSnapChange={onScrollSnapChange} />);

        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        getScroller(view).scrollTo({ top: 3 * ROW, behavior: 'instant' });

        await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(3);
      });
    });
  });
});
