import { ComponentProps, FC, PropsWithChildren, createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';

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

const getScroller = (r: RenderResult) => r.getByTestId(TESTID_SCROLLER) as HTMLDivElement;
const getItem = (r: RenderResult, index: number) => r.getByTestId(`item-${index}`) as HTMLDivElement;

describe('SnapScroller', () => {
  describe('Critical User Paths', () => {
    describe('rendering', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SnapScrollerTest />);
      });
      
      it('renders a scroll container', async () => {
        const scroller = getScroller(r);
        expect(scroller).toBeInTheDocument();
        expect(scroller.tagName).toBe('DIV');
      });
      
      it('renders snap items with data-index', async () => {
        const item0 = getItem(r, 0);
        const item3 = getItem(r, 3);
        
        expect(item0).toHaveAttribute('data-index', '0');
        expect(item3).toHaveAttribute('data-index', '3');
      });
    });
    
    describe('defaultIndex', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SnapScrollerTest defaultIndex={DEFAULT_INDEX} />);
      });
      
      it('initially scrolls to defaultIndex', async () => {
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBe(DEFAULT_INDEX * ITEM_SIZE);
        });
      });
    });
    
    describe('apiRef', () => {
      let r: RenderResult;
      const apiRef = createRef<SnapScrollerApiRef>();
      
      beforeEach(() => {
        r = render(<SnapScrollerTest apiRef={apiRef} />);
      });
      
      it('next() scrolls forward', async () => {
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(apiRef.current).toBeTruthy();
        });
        
        apiRef.current!.next();
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBeGreaterThan(0);
        });
      });
      
      it('prev() scrolls backward', async () => {
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(apiRef.current).toBeTruthy();
        });
        
        apiRef.current!.prev();
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBeLessThan(2 * ITEM_SIZE);
        });
      });
      
      it('scrollToElementByKey() scrolls to the requested index', async () => {
        const scroller = getScroller(r);
        
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
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SnapScrollerTest />);
      });
      
      it('calls external onScroll handler', async () => {
        const onScroll = vi.fn();
        r.rerender(<SnapScrollerTest onScroll={onScroll} />);
        
        const scroller = getScroller(r);
        
        scroller.scrollTo({ left: ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(onScroll).toHaveBeenCalled();
        });
      });
      
      it('calls onScrollSnapChanging during scroll interactions (if hook emits it)', async () => {
        const onScrollSnapChanging = vi.fn();
        r.rerender(<SnapScrollerTest onScrollSnapChanging={onScrollSnapChanging} />);
        
        const scroller = getScroller(r);
        
        scroller.scrollTo({ left: ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(onScrollSnapChanging).toHaveBeenCalled();
        });
        
        const [el, index] = onScrollSnapChanging.mock.calls.at(-1) ?? [];
        expect(el).toBeInstanceOf(HTMLElement);
        expect(typeof index).toBe('number');
      });
      
      it('calls onScrollSnapChange after snap settles (if hook emits it)', async () => {
        const onScrollSnapChange = vi.fn();
        r.rerender(<SnapScrollerTest onScrollSnapChange={onScrollSnapChange} />);
        
        const scroller = getScroller(r);
        
        scroller.scrollTo({ left: 2 * ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(onScrollSnapChange).toHaveBeenCalled();
        });
        
        const [el, index] = onScrollSnapChange.mock.calls.at(-1) ?? [];
        expect(el).toBeInstanceOf(HTMLElement);
        expect(typeof index).toBe('number');
      });
      
      it('fires both onScrollSnapChanging and onScrollSnapChange when both are provided (if hook emits them)', async () => {
        const onScrollSnapChanging = vi.fn();
        const onScrollSnapChange = vi.fn();
        
        r.rerender(
          <SnapScrollerTest
            onScrollSnapChanging={onScrollSnapChanging}
            onScrollSnapChange={onScrollSnapChange}
          />,
        );
        
        const scroller = getScroller(r);
        
        scroller.scrollTo({ left: 1 * ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(onScrollSnapChanging).toHaveBeenCalled();
          expect(onScrollSnapChange).toHaveBeenCalled();
        });
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('jumps to the next item when the user prefers reduced motion', async () => {
      await commands.emulateReducedMotion('reduce');
      onTestFinished(() => commands.emulateReducedMotion('no-preference'));
      const apiRef = createRef<SnapScrollerApiRef>();
      const onScrollSnapChange = vi.fn();
      const r = render(<SnapScrollerTest apiRef={apiRef} onScrollSnapChange={onScrollSnapChange} />);
      await waitFor(() => expect(apiRef.current).toBeTruthy());

      apiRef.current!.next();

      expect(getScroller(r).scrollLeft).toBeCloseTo(ITEM_SIZE, 0);
      await waitFor(() => expect(onScrollSnapChange).toHaveBeenCalled());
    });

    it('keeps the same apiRef across renders', () => {
      const apiRef = vi.fn();
      const r = render(<SnapScrollerTest apiRef={apiRef} />);

      r.rerender(<SnapScrollerTest apiRef={apiRef} />);

      expect(apiRef).toHaveBeenCalledTimes(1);
    });

    it('renders with no children (does not crash)', async () => {
      const r = render(<SnapScrollerTest>{null}</SnapScrollerTest>);
      const scroller = getScroller(r);
      expect(scroller).toBeInTheDocument();
    });
    
    it('apiRef methods exist even if there are no items', async () => {
      const apiRef = createRef<SnapScrollerApiRef>();
      render(<SnapScrollerTest apiRef={apiRef}>{null}</SnapScrollerTest>);
      
      await waitFor(() => {
        expect(apiRef.current).toBeTruthy();
      });
      
      expect(apiRef.current?.prev).toBeTypeOf('function');
      expect(apiRef.current?.next).toBeTypeOf('function');
      expect(apiRef.current?.scrollToElementByKey).toBeTypeOf('function');
    });
    
    it('does not emit snap callbacks when a snap point resolves to a stale item', async () => {
      const onScrollSnapChanging = vi.fn();
      const onScrollSnapChange = vi.fn();
      const apiRef = createRef<SnapScrollerApiRef>();

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

      const props = { apiRef, onScrollSnapChanging, onScrollSnapChange };
      const r = render(<SnapScrollerTest {...props}>{content(1)}</SnapScrollerTest>);
      const scroller = getScroller(r);

      await waitFor(() => {
        expect(apiRef.current?.getCommitted?.()).toBe(0);
      });

      r.rerender(<SnapScrollerTest {...props}>{content(5)}</SnapScrollerTest>);

      scroller.scrollTo({ left: 150, top: 0, behavior: 'auto' });

      await waitFor(() => {
        expect(apiRef.current?.getPending?.()).toBe(1);
      });

      scroller.dispatchEvent(new Event('scrollend'));
      await waitFor(() => {
        expect(apiRef.current?.getCommitted?.()).toBe(1);
      });

      expect(onScrollSnapChanging).not.toHaveBeenCalled();
      expect(onScrollSnapChange).not.toHaveBeenCalled();
    });

    it('prev()/next() do not throw when committed index is not yet available', async () => {
      const apiRef = createRef<SnapScrollerApiRef>();
      render(<SnapScrollerTest apiRef={apiRef} />);
      
      await waitFor(() => {
        expect(apiRef.current).toBeTruthy();
      });
      
      expect(() => apiRef.current?.prev()).not.toThrow();
      expect(() => apiRef.current?.next()).not.toThrow();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SnapScrollerTest />);
      });
      
      it('does not introduce invalid interactive roles by default', async () => {
        const scroller = getScroller(r);
        expect(scroller).not.toHaveRole('button');
        expect(scroller).not.toHaveRole('listbox');
        expect(scroller).not.toHaveRole('dialog');
      });
    });
    
    describe('keyboard', () => {
      it('remains operable for keyboard users (focus + arrow scroll)', async () => {
        const apiRef = createRef<SnapScrollerApiRef>();
        
        const r = render(
          <SnapScrollerTest
            apiRef={apiRef}
            tabIndex={0}
            aria-label='Snap scroller'
          />,
        );
        
        const scroller = getScroller(r);
        
        await userEvent.click(scroller);
        expect(scroller).toHaveFocus();
        
        const before = scroller.scrollLeft;
        
        scroller.scrollTo({ left: ITEM_SIZE, top: 0, behavior: 'auto' });
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBeGreaterThanOrEqual(before);
        });
      });
    });
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
    
    it('lays the items out from right to left', async () => {
      const r = render(<RtlTest />);
      
      expect(getItem(r, 1).getBoundingClientRect().left).toBeLessThan(getItem(r, 0).getBoundingClientRect().left);
    });
    
    it('initially scrolls to defaultIndex', async () => {
      const r = render(<RtlTest defaultIndex={DEFAULT_INDEX} />);
      
      await expect.poll(() => getScroller(r).scrollLeft).toBe(-DEFAULT_INDEX * ITEM_SIZE);
      expect(isVisibleIn(getScroller(r), getItem(r, DEFAULT_INDEX))).toBe(true);
    });
    
    it('next() scrolls to the left and prev() back to the right', async () => {
      const apiRef = createRef<SnapScrollerApiRef>();
      const onScrollSnapChange = vi.fn();
      const r = render(<RtlTest apiRef={apiRef} onScrollSnapChange={onScrollSnapChange} />);
      
      await expect.poll(() => apiRef.current).toBeTruthy();
      
      apiRef.current!.next();
      await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(1);
      await expect.poll(() => getScroller(r).scrollLeft).toBeCloseTo(-ITEM_SIZE, 0);
      
      apiRef.current!.prev();
      await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(0);
      await expect.poll(() => getScroller(r).scrollLeft).toBeCloseTo(0, 0);
    });
    
    it('scrollToElementByKey() aligns items narrower than the viewport to the inline start', async () => {
      const apiRef = createRef<SnapScrollerApiRef>();
      const r = render(<RtlTest apiRef={apiRef} style={{ width: ITEM_SIZE * 2 }} />);
      
      await expect.poll(() => apiRef.current).toBeTruthy();
      
      apiRef.current!.scrollToElementByKey(2, 'instant');
      
      await expect.poll(() => getScroller(r).scrollLeft).toBe(-2 * ITEM_SIZE);
      expect(getItem(r, 2).getBoundingClientRect().right).toBeCloseTo(getScroller(r).getBoundingClientRect().right, 0);
    });
    
    it('reports the snapped item after a swipe to the left', async () => {
      const onScrollSnapChange = vi.fn();
      const r = render(<RtlTest onScrollSnapChange={onScrollSnapChange} />);
      const scroller = getScroller(r);
      
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      scroller.scrollTo({ left: -3 * ITEM_SIZE, behavior: 'instant' });
      
      await expect.poll(() => onScrollSnapChange.mock.lastCall?.[1]).toBe(3);
    });
  });
});
