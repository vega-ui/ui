import { ComponentProps, FC, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';

import { SnapScroller } from '../SnapScroller';
import { SnapScrollerContent } from '../components';

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

const TESTID_SCROLLER = 'scroller';
const makeItemTestId = (index: number) => `item-${index}`;
const makeAsChildTestId = (index: number) => `as-child-${index}`;

const MIN_INDEX = 0;
const MAX_INDEX = 4;
const INITIAL_INDEX = 2;

const WIDTH = 300;
const HEIGHT = 80;

const makeItems = (from = MIN_INDEX, to = MAX_INDEX) =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const index = from + i;
    
    return (
      <SnapScrollerContent
        key={index}
        index={index}
        data-testid={makeItemTestId(index)}
        style={{
          scrollSnapAlign: 'start',
          flex: '0 0 100%',
          width: WIDTH,
          height: HEIGHT,
        }}
      >
        {index}
      </SnapScrollerContent>
    );
  });

const SnapScrollerTest: FC<PropsWithChildren<ComponentProps<typeof SnapScroller>>> = (props) => {
  return (
    <div style={{ width: WIDTH, overflow: 'hidden' }}>
      <SnapScroller
        data-testid={TESTID_SCROLLER}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'auto',
          width: WIDTH,
        }}
        {...props}
      >
        {props.children ?? makeItems()}
      </SnapScroller>
    </div>
  );
};

const getScroller = (r: RenderResult) => r.getByTestId(TESTID_SCROLLER) as HTMLDivElement;
const getItem = (r: RenderResult, index: number) => r.getByTestId(makeItemTestId(index)) as HTMLDivElement;

const waitNextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const scrollToLeft = async (el: HTMLDivElement, left: number) => {
  el.scrollTo({ left, behavior: 'instant' });
  await waitNextFrame();
  fireEvent.scroll(el);
};

describe('SnapScroller', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<SnapScrollerTest initialIndex={INITIAL_INDEX} />);
    });
    
    it('renders a scroll container and children', async () => {
      const scroller = getScroller(r);
      await expect.element(scroller).toBeInTheDocument();
      
      for (let i = MIN_INDEX; i <= MAX_INDEX; i += 1) {
        await expect.element(getItem(r, i)).toBeInTheDocument();
      }
    });
    
    it('fires onOffset(-1) when reaching start edge and does not re-fire until leaving edge', async () => {
      const onOffset = vi.fn();
      
      r.rerender(<SnapScrollerTest initialIndex={INITIAL_INDEX} onOffset={onOffset} />);
      
      const scroller = getScroller(r);
      
      await scrollToLeft(scroller, 0);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
        expect(onOffset).toHaveBeenCalledWith(-1);
      });
      
      fireEvent.scroll(scroller);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
      });
      
      await scrollToLeft(scroller, 10);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
      });
      
      await scrollToLeft(scroller, 0);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
      });
    });
    
    it('fires onOffset(1) when reaching end edge and does not re-fire until leaving edge', async () => {
      const onOffset = vi.fn();
      
      r.rerender(<SnapScrollerTest initialIndex={INITIAL_INDEX} onOffset={onOffset} />);
      
      const scroller = getScroller(r);
      
      const end = scroller.scrollWidth - scroller.clientWidth;
      
      await scrollToLeft(scroller, end);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
        expect(onOffset).toHaveBeenCalledWith(1);
      });
      
      fireEvent.scroll(scroller);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
      });
      
      await scrollToLeft(scroller, Math.max(0, end - 1));
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
      });
      
      await scrollToLeft(scroller, end);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledTimes(1);
      });
    });
    
    it('preserves snapped index after offset-triggered content changes (instant restore)', async () => {
      const onOffset = vi.fn();
      
      r.rerender(<SnapScrollerTest initialIndex={INITIAL_INDEX} onOffset={onOffset} preserveScroll />);
      
      const scroller = getScroller(r);
      
      await scrollToLeft(scroller, 0);
      
      await waitFor(() => {
        expect(onOffset).toHaveBeenCalledWith(-1);
      });
      
      r.rerender(
        <SnapScrollerTest initialIndex={INITIAL_INDEX} onOffset={onOffset} preserveScroll>
          {makeItems(MIN_INDEX - 2, MAX_INDEX + 2)}
        </SnapScrollerTest>
      );
      
      await waitNextFrame();
      await waitNextFrame();
      
      await waitFor(() => {
        const snapped = Math.round(scroller.scrollLeft / WIDTH);
        expect(snapped).toBe(INITIAL_INDEX);
      });
    });
  });
  
  describe('Error handling', () => {
    it('SnapScrollerContent(asChild) throws when Slot child is not a valid React element', async () => {
      expect(() => {
        render(
          <SnapScrollerTest>
            <SnapScrollerContent index={0} asChild>
              {'text'}
            </SnapScrollerContent>
          </SnapScrollerTest>
        );
      }).toThrowError();
    });
  });
  
  describe('Edge cases', () => {
    it('SnapScrollerContent(asChild) passes data-index to custom element', async () => {
      const r = render(
        <SnapScrollerTest>
          <SnapScrollerContent index={1} asChild data-testid={makeAsChildTestId(1)}>
            <section data-testid={makeItemTestId(1)}>child</section>
          </SnapScrollerContent>
        </SnapScrollerTest>
      );
      
      const el = r.getByTestId(makeItemTestId(1)) as HTMLElement;
      
      await expect.element(el).toBeInTheDocument();
      await expect.element(el).toHaveAttribute('data-index', '1');
    });
  });
});