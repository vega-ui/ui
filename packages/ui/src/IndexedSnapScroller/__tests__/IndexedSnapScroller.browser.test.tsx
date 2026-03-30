import { createRef, FC, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';

import { IndexedSnapScroller, type IndexedSnapScrollerProps } from '../IndexedSnapScroller';
import { IndexedSnapScrollerContent } from '../components';
import { useIndexedSnapScrollerContext } from '../contexts';
import { IndexedSnapScrollerApiRef } from '../types';

afterEach(cleanup);

const TESTID = {
  scroller: 'scroller',
} as const;

const ITEM_PREFIX = 'item';
const VIEWPORT_PX = 240;
const PAGE_PX = 240;

const SIZE_5 = 5;
const SHIFT_2 = 2;
const START_MINUS_2 = -2;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const getScroller = (r: RenderResult) => r.getByTestId(TESTID.scroller) as HTMLDivElement;

const getItem = (r: RenderResult, index: number) => r.getByTestId(`${ITEM_PREFIX}-${index}`) as HTMLElement;
const queryItem = (r: RenderResult, index: number) => r.queryByTestId(`${ITEM_PREFIX}-${index}`) as HTMLElement | null;

const scrollToStart = async (el: HTMLDivElement) => {
  el.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
  await sleep(0);
};

const scrollToEnd = async (el: HTMLDivElement) => {
  el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: 'instant' as ScrollBehavior });
  await sleep(0);
};

const isFullyVisibleInScroller = (scroller: HTMLElement, el: HTMLElement) => {
  const s = scroller.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return r.left >= s.left && r.right <= s.right;
};

const Page: FC = () => {
  const { index } = useIndexedSnapScrollerContext();
  
  return (
    <IndexedSnapScrollerContent>
      <div
        data-testid={`${ITEM_PREFIX}-${index}`}
        style={{
          width: PAGE_PX,
          flex: `0 0 ${PAGE_PX}px`,
          scrollSnapAlign: 'start',
        }}
      >
        Item {index}
      </div>
    </IndexedSnapScrollerContent>
  );
};

const IndexedSnapScrollerTest: FC<PropsWithChildren<IndexedSnapScrollerProps>> = ({ children, style, ...props }) => {
  return (
    <IndexedSnapScroller
      data-testid={TESTID.scroller}
      style={{
        width: VIEWPORT_PX,
        overflowX: 'auto',
        display: 'flex',
        scrollSnapType: 'x mandatory',
        ...style,
      }}
      {...props}
    >
      {children ?? <Page />}
    </IndexedSnapScroller>
  );
};

describe('IndexedSnapScroller', () => {
  describe('Critical User Paths', () => {
    describe('rendering & initial window', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(
          <IndexedSnapScrollerTest size={SIZE_5} shift={SHIFT_2} start={START_MINUS_2} startDir={1} />,
        );
      });
      
      it('renders an initial index window based on start/size/startDir', async () => {
        await expect.element(getItem(r, -2)).toBeInTheDocument();
        await expect.element(getItem(r, -1)).toBeInTheDocument();
        await expect.element(getItem(r, 0)).toBeInTheDocument();
        await expect.element(getItem(r, 1)).toBeInTheDocument();
        await expect.element(getItem(r, 2)).toBeInTheDocument();
      });
      
      it('does not render indexes outside the initial window', async () => {
        await expect.element(queryItem(r, -3)).not.toBeInTheDocument();
        await expect.element(queryItem(r, 3)).not.toBeInTheDocument();
      });
    });
    
    describe('defaultIndex / index initialization', () => {
      it('uses defaultIndex when provided (uncontrolled) and builds window around it', async () => {
        const defaultIndex = 10;
        
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            defaultIndex={defaultIndex}
          />,
        );
        
        const centerOffset = Math.floor(SIZE_5 / 2);
        const expectedStart = defaultIndex - centerOffset;
        
        await expect.element(getItem(r, expectedStart)).toBeInTheDocument();
        await expect.element(getItem(r, expectedStart + 4)).toBeInTheDocument();
      });
      
      it('uses index when provided (controlled) and builds window around it', async () => {
        const index = 7;
        
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            index={index}
          />,
        );
        
        const centerOffset = Math.floor(SIZE_5 / 2);
        const expectedStart = index - centerOffset;
        
        await expect.element(getItem(r, expectedStart)).toBeInTheDocument();
        await expect.element(getItem(r, expectedStart + 4)).toBeInTheDocument();
      });
    });
    
    describe('offset detection via scroll and virtual window shifting', () => {
      it('fires onOffset(-1) and shifts window backward when scrolled to start', async () => {
        const offsets: number[] = [];
        
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            onOffset={(v) => offsets.push(v)}
          />,
        );
        
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
        
        await scrollToStart(scroller);
        
        await waitFor(() => {
          expect(offsets).toContain(-1);
        });
        
        // expected shift by 2: [-2,-1,0,1,2] -> [-4,-3,-2,-1,0]
        await expect.element(getItem(r, -4)).toBeInTheDocument();
        await expect.element(getItem(r, -3)).toBeInTheDocument();
        await expect.element(getItem(r, 0)).toBeInTheDocument();
        
        await expect.element(queryItem(r, 1)).not.toBeInTheDocument();
        await expect.element(queryItem(r, 2)).not.toBeInTheDocument();
      });
      
      it('fires onOffset(1) and pushes window forward when scrolled to end', async () => {
        const offsets: number[] = [];
        
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            onOffset={(v) => offsets.push(v)}
          />,
        );
        
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
        
        await scrollToEnd(scroller);
        
        await waitFor(() => {
          expect(offsets).toContain(1);
          expect(queryItem(r, 4)).toBeInTheDocument();
        });

        // expected push by 2: [-2,-1,0,1,2] -> [0,1,2,3,4]
        await expect.element(getItem(r, 0)).toBeInTheDocument();
        await expect.element(getItem(r, 4)).toBeInTheDocument();
        
        await expect.element(queryItem(r, -2)).not.toBeInTheDocument();
        await expect.element(queryItem(r, -1)).not.toBeInTheDocument();
      });
      
      it('calls user onScroll handler alongside internal scroll logic', async () => {
        let called = 0;
        
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            onScroll={() => {
              called += 1;
            }}
          />,
        );
        
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
        
        scroller.scrollTo({ left: 1, behavior: 'instant' as ScrollBehavior });
        
        await waitFor(() => {
          expect(called).toBeGreaterThan(0);
        });
      });
    });
    
    describe('preserveScroll behavior', () => {
      it('after offset at start, preserveScroll=true moves scroll away from the boundary', async () => {
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            preserveScroll
          />,
        );
        
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
        
        await scrollToStart(scroller);
        
        await waitFor(() => {
          expect(getItem(r, -4)).toBeInTheDocument();
        });
        
        await waitFor(() => {
          expect(scroller.scrollLeft).toBeGreaterThan(0);
        });
      });
      
      it('after offset at end, preserveScroll=true moves scroll away from the boundary', async () => {
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            preserveScroll
          />,
        );
        
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
        
        await scrollToEnd(scroller);
        
        await waitFor(() => {
          expect(getItem(r, 4)).toBeInTheDocument();
        });
        
        await waitFor(() => {
          const max = scroller.scrollWidth - scroller.clientWidth;
          expect(Math.ceil(scroller.scrollLeft)).toBeLessThan(max);
        });
      });
    });
    
    describe('controlled index syncing', () => {
      it('when controlled index is outside current window, window rebuilds to include it', async () => {
        const nextIndex = 100;
        
        const apiRef = createRef<IndexedSnapScrollerApiRef>();
        
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            index={0}
            apiRef={apiRef}
          />,
        );
        
        await expect.element(getItem(r, -2)).toBeInTheDocument();
        await expect.element(getItem(r, 2)).toBeInTheDocument();
        
        await waitFor(() => {
          expect(apiRef.current).toBeTruthy();
        });
        
        apiRef.current!.measure();
        
        r.rerender(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            index={nextIndex}
            apiRef={apiRef}
          />,
        );
        
        await waitFor(() => {
          expect(queryItem(r, nextIndex)).toBeTruthy();
        });
        
        await expect.element(getItem(r, nextIndex)).toBeInTheDocument();
      });
      
      it('when controlled index is within the current window, it becomes visible in the viewport', async () => {
        const r = render(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            index={0}
          />,
        );
        
        const scroller = getScroller(r);
        
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
        
        const nextIndex = 2;
        
        r.rerender(
          <IndexedSnapScrollerTest
            size={SIZE_5}
            shift={SHIFT_2}
            start={START_MINUS_2}
            startDir={1}
            index={nextIndex}
          />,
        );
        
        await waitFor(() => {
          const el = getItem(r, nextIndex);
          expect(isFullyVisibleInScroller(scroller, el)).toBe(true);
        });
      });
    });
    
    describe('startDir patterns', () => {
      it('renders decreasing sequence when startDir=-1', async () => {
        const r = render(
          <IndexedSnapScrollerTest size={SIZE_5} shift={SHIFT_2} start={START_MINUS_2} startDir={-1} />,
        );
        
        await expect.element(getItem(r, -2)).toBeInTheDocument();
        await expect.element(getItem(r, -3)).toBeInTheDocument();
        await expect.element(getItem(r, -4)).toBeInTheDocument();
        await expect.element(getItem(r, -5)).toBeInTheDocument();
        await expect.element(getItem(r, -6)).toBeInTheDocument();
        
        await expect.element(queryItem(r, -1)).not.toBeInTheDocument();
        await expect.element(queryItem(r, 0)).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('size=1 renders a single page index', async () => {
      const r = render(<IndexedSnapScrollerTest size={1} shift={SHIFT_2} start={START_MINUS_2} startDir={1} />);
      
      await expect.element(getItem(r, -2)).toBeInTheDocument();
      await expect.element(queryItem(r, -1)).not.toBeInTheDocument();
      await expect.element(queryItem(r, 0)).not.toBeInTheDocument();
    });
    
    it('does not crash when onOffset is not provided and scroll hits boundaries', async () => {
      const r = render(<IndexedSnapScrollerTest size={SIZE_5} shift={SHIFT_2} start={START_MINUS_2} startDir={1} />);
      
      const scroller = getScroller(r);
      
      await waitFor(() => {
        expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
      });
      
      await scrollToStart(scroller);
      
      await waitFor(() => {
        expect(getItem(r, -4)).toBeInTheDocument();
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('renders content into the document (not aria-hidden)', async () => {
        const r = render(<IndexedSnapScrollerTest size={SIZE_5} shift={SHIFT_2} start={START_MINUS_2} startDir={1} />);
        
        const scroller = getScroller(r);
        
        await expect.element(scroller).toBeInTheDocument();
        await expect.element(scroller).not.toHaveAttribute('aria-hidden', 'true');
        await expect.element(getItem(r, 0)).toBeInTheDocument();
      });
    });
  });
});