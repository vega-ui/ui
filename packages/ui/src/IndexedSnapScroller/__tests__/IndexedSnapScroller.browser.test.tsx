import { createRef, FC, PropsWithChildren, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

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

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

const scrollToStart = async (el: HTMLDivElement) => {
  await nextFrame();
  el.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
  await sleep(0);
};

const scrollToEnd = async (el: HTMLDivElement) => {
  await nextFrame();
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
          <IndexedSnapScrollerTest size={SIZE_5} shift={SHIFT_2} start={START_MINUS_2} />,
        );
      });
      
      it('renders an initial index window based on start/size', async () => {
        await expect.element(getItem(r, -2)).toBeInTheDocument();
        await expect.element(getItem(r, -1)).toBeInTheDocument();
        await expect.element(getItem(r, 0)).toBeInTheDocument();
        await expect.element(getItem(r, 1)).toBeInTheDocument();
        await expect.element(getItem(r, 2)).toBeInTheDocument();
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

      it('keeps a scroll made right after a snap settles', async () => {
        const r = render(<IndexedSnapScrollerTest defaultIndex={0} />);
        const scroller = getScroller(r);

        await waitFor(() => {
          expect(isFullyVisibleInScroller(scroller, getItem(r, 0))).toBe(true);
        });

        await nextFrame();
        await sleep(200);

        scroller.addEventListener('scrollend', () => {
          scroller.scrollBy({ left: PAGE_PX, behavior: 'instant' });
        }, { once: true });
        scroller.scrollBy({ left: PAGE_PX, behavior: 'instant' });

        await waitFor(() => {
          expect(queryItem(r, 4)).toBeInTheDocument();
        });

        await sleep(200);
        expect(isFullyVisibleInScroller(scroller, getItem(r, 2))).toBe(true);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('follows quick changes of the controlled index far outside the window', async () => {
      const onError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const r = render(<IndexedSnapScrollerTest index={0} />);
      await nextFrame();

      for (const index of [100, 300, 50, -200]) {
        r.rerender(<IndexedSnapScrollerTest index={index} />);
        await nextFrame();
      }

      await waitFor(() => {
        expect(isFullyVisibleInScroller(getScroller(r), getItem(r, -200))).toBe(true);
      });
      expect(onError).not.toHaveBeenCalled();
      onError.mockRestore();
    });

    it('calls the user onScrollSnapChange after the window is re-centered', async () => {
      const apiRef = createRef<IndexedSnapScrollerApiRef>();
      const rendered: boolean[] = [];
      const r = render(
        <IndexedSnapScrollerTest
          index={0}
          apiRef={apiRef}
          onScrollSnapChange={(_, key) => {
            if (key === 1) rendered.push(queryItem(r, 3) !== null);
          }}
        />,
      );

      await waitFor(() => expect(apiRef.current).toBeTruthy());
      await nextFrame();
      apiRef.current!.next();

      await waitFor(() => expect(rendered).toEqual([true]));
    });

    it('keeps reporting a swipe after setIndexTo() is called with the page already shown', async () => {
      const apiRef = createRef<IndexedSnapScrollerApiRef>();
      const onScrollSnapChanging = vi.fn();
      const r = render(<IndexedSnapScrollerTest defaultIndex={0} apiRef={apiRef} onScrollSnapChanging={onScrollSnapChanging} />);
      const scroller = getScroller(r);

      await waitFor(() => expect(isFullyVisibleInScroller(scroller, getItem(r, 0))).toBe(true));
      await nextFrame();
      apiRef.current!.setIndexTo(0);
      scroller.scrollBy({ left: PAGE_PX, behavior: 'instant' });

      await waitFor(() => expect(onScrollSnapChanging).toHaveBeenLastCalledWith(expect.anything(), 1));
    });

    it('does not jump to the page under the finger when the controlled index follows a swipe', async () => {
      const Following: FC = () => {
        const [index, setIndex] = useState(0);

        return (
          <IndexedSnapScrollerTest
            index={index}
            style={{ scrollSnapType: 'none' }}
            onScrollSnapChanging={(_, key) => setIndex(key)}
          />
        );
      };
      const r = render(<Following />);
      const scroller = getScroller(r);
      await nextFrame();

      const holdFinger = (event: Event) => event.stopPropagation();
      window.addEventListener('scrollend', holdFinger, true);
      onTestFinished(() => window.removeEventListener('scrollend', holdFinger, true));

      scroller.scrollTo({ left: scroller.scrollLeft + PAGE_PX * 0.6, behavior: 'instant' as ScrollBehavior });
      await nextFrame();
      await nextFrame();

      const left = getItem(r, 1).getBoundingClientRect().left - scroller.getBoundingClientRect().left;
      expect(left).toBeCloseTo(PAGE_PX * 0.4, -1);
    });

    it('is not a Tab stop of its own', async () => {
      const r = render(
        <>
          <input aria-label='before' />
          <IndexedSnapScrollerTest />
          <input aria-label='after' />
        </>,
      );

      r.getByRole('textbox', { name: 'before' }).focus();
      await userEvent.tab();

      expect(document.activeElement).toBe(r.getByRole('textbox', { name: 'after' }));
    });

    describe('right-to-left', () => {
      const RtlTest: FC<PropsWithChildren<IndexedSnapScrollerProps>> = (props) => (
        <div dir='rtl'>
          <IndexedSnapScrollerTest size={SIZE_5} shift={SHIFT_2} start={START_MINUS_2} {...props} />
        </div>
      );
    
      it('shows the initial index in view', async () => {
        const r = render(<RtlTest defaultIndex={0} />);
      
        await waitFor(() => {
          expect(isFullyVisibleInScroller(getScroller(r), getItem(r, 0))).toBe(true);
        });
        expect(getItem(r, 1).getBoundingClientRect().left).toBeLessThan(getItem(r, 0).getBoundingClientRect().left);
      });
    
      it('next() shows the next index on the left, prev() the previous one on the right', async () => {
        const apiRef = createRef<IndexedSnapScrollerApiRef>();
        const r = render(<RtlTest defaultIndex={0} apiRef={apiRef} />);
      
        await waitFor(() => {
          expect(isFullyVisibleInScroller(getScroller(r), getItem(r, 0))).toBe(true);
        });
      
        apiRef.current!.next();
        await waitFor(() => {
          expect(isFullyVisibleInScroller(getScroller(r), getItem(r, 1))).toBe(true);
        });
      
        apiRef.current!.prev();
        apiRef.current!.prev();
        await waitFor(() => {
          expect(isFullyVisibleInScroller(getScroller(r), getItem(r, -1))).toBe(true);
        });
      });
    
      it('fires onOffset(1) and extends the window when scrolled to the left end', async () => {
        const offsets: number[] = [];
        const r = render(<RtlTest onOffset={(v) => offsets.push(v)} />);
        const scroller = getScroller(r);
      
        await waitFor(() => {
          expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
        });
      
        await nextFrame();
        scroller.scrollTo({ left: -(scroller.scrollWidth - scroller.clientWidth), behavior: 'instant' });
      
        await waitFor(() => {
          expect(offsets).toContain(1);
          expect(queryItem(r, 4)).toBeInTheDocument();
        });
      });
    
      it('keeps the snapped page in view when the window is re-centered', async () => {
        const r = render(<RtlTest defaultIndex={0} />);
        const scroller = getScroller(r);
      
        await waitFor(() => {
          expect(isFullyVisibleInScroller(scroller, getItem(r, 0))).toBe(true);
        });
      
        await nextFrame();
        scroller.scrollBy({ left: -PAGE_PX, behavior: 'instant' });
      
        await waitFor(() => {
          expect(queryItem(r, 3)).toBeInTheDocument();
          expect(queryItem(r, -2)).not.toBeInTheDocument();
        });
      
        await sleep(200);
        expect(isFullyVisibleInScroller(scroller, getItem(r, 1))).toBe(true);
      });
    });
  });
});
