import { CSSProperties, FC, useEffect, useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ScrollSnapAlign, ScrollSnapAxis, useScrollSnap } from '../useScrollSnap';

const KEYS = ['a', 'b', 'c', 'd', 'e'];
const ITEM_SIZE = 100;

type ScrollSnapApi = ReturnType<typeof useScrollSnap<string, HTMLDivElement>>;

interface ScrollerProps {
  axis?: ScrollSnapAxis
  align?: ScrollSnapAlign
  viewportSize?: number
  dir?: 'ltr' | 'rtl'
  scrollPadding?: number
  onSnapChange?: (element: HTMLElement, key: string) => void
  onSnapChanging?: (element: HTMLElement, key: string) => void
  onApi: (api: ScrollSnapApi, scroller: HTMLDivElement) => void
}

const Scroller: FC<ScrollerProps> = ({
  axis = 'x',
  align = 'start',
  viewportSize = ITEM_SIZE,
  dir,
  scrollPadding = 0,
  onSnapChange,
  onSnapChanging,
  onApi,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const api = useScrollSnap<string, HTMLDivElement>({ scrollerRef, axis, align, onSnapChange, onSnapChanging });

  useEffect(() => {
    if (scrollerRef.current) onApi(api, scrollerRef.current);
  });

  const style: CSSProperties = axis === 'x'
    ? { display: 'flex', width: viewportSize, height: 50, overflowX: 'auto', scrollPaddingInline: scrollPadding }
    : { display: 'flex', flexDirection: 'column', height: viewportSize, width: 50, overflowY: 'auto', scrollPaddingBlock: scrollPadding };

  return (
    <div ref={scrollerRef} dir={dir} onScroll={api.onScroll} style={{ ...style, position: 'relative' }}>
      {KEYS.map((key) => (
        <div key={key} ref={api.itemRef(key)} style={{ flex: `0 0 ${ITEM_SIZE}px` }} />
      ))}
    </div>
  );
};

const renderScroller = async (props: Omit<ScrollerProps, 'onApi'> = {}) => {
  let api!: ScrollSnapApi;
  let scroller!: HTMLDivElement;

  await render(<Scroller {...props} onApi={(a, s) => { api = a; scroller = s; }} />);
  await expect.poll(() => api.getCommitted()).not.toBeNull();

  return { api: () => api, scroller: () => scroller };
};

describe('useScrollSnap', () => {
  it('commits the first item on mount', async () => {
    const { api } = await renderScroller();

    expect(api().getCommitted()).toBe('a');
    expect(api().getPending()).toBe('a');
  });

  it('scrolls to an item by key', async () => {
    const { api, scroller } = await renderScroller();

    expect(api().scrollToElementByKey('c', 'instant')).toBe(true);

    expect(scroller().scrollLeft).toBe(2 * ITEM_SIZE);
  });

  it('returns false for an unknown key', async () => {
    const { api } = await renderScroller();

    expect(api().scrollToElementByKey('z', 'instant')).toBe(false);
  });

  it('commits the item reached by scrolling', async () => {
    const onSnapChange = vi.fn();
    const { api, scroller } = await renderScroller({ onSnapChange });

    api().scrollToElementByKey('c', 'instant');

    await expect.poll(() => api().getCommitted()).toBe('c');
    expect(onSnapChange).toHaveBeenCalledExactlyOnceWith(scroller().children[2], 'c');
  });

  it('reports the pending item while scrolling', async () => {
    const onSnapChanging = vi.fn();
    const { api, scroller } = await renderScroller({ onSnapChanging });

    scroller().scrollLeft = 3 * ITEM_SIZE;

    await expect.poll(() => api().getPending()).toBe('d');
    expect(onSnapChanging).toHaveBeenCalledWith(scroller().children[3], 'd');
  });

  it('scrolls along the y axis', async () => {
    const { api, scroller } = await renderScroller({ axis: 'y' });

    api().scrollToElementByKey('d', 'instant');

    expect(scroller().scrollTop).toBe(3 * ITEM_SIZE);
  });

  it('aligns an item to the center', async () => {
    const { api, scroller } = await renderScroller({ align: 'center', viewportSize: 2 * ITEM_SIZE });

    api().scrollToElementByKey('c', 'instant');

    expect(scroller().scrollLeft).toBe(2.5 * ITEM_SIZE - ITEM_SIZE);
  });

  it('aligns an item to the end', async () => {
    const { api, scroller } = await renderScroller({ align: 'end', viewportSize: 2 * ITEM_SIZE });

    expect(api().getCommitted()).toBe('b');
    api().scrollToElementByKey('c', 'instant');

    expect(scroller().scrollLeft).toBe(3 * ITEM_SIZE - 2 * ITEM_SIZE);
  });

  it('respects scroll padding', async () => {
    const { api, scroller } = await renderScroller({ scrollPadding: 20, viewportSize: 2 * ITEM_SIZE });

    api().scrollToElementByKey('c', 'instant');

    expect(scroller().scrollLeft).toBe(2 * ITEM_SIZE - 20);
  });

  it('scrolls to an item by key in RTL', async () => {
    const { api, scroller } = await renderScroller({ dir: 'rtl' });

    expect(api().getCommitted()).toBe('a');
    api().scrollToElementByKey('c', 'instant');

    expect(scroller().scrollLeft).toBe(-2 * ITEM_SIZE);
  });

  it('forgets a removed item', async () => {
    const { api } = await renderScroller();

    api().removeItemRef('c');

    expect(api().scrollToElementByKey('c', 'instant')).toBe(false);
  });
});
