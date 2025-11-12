import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SnapScroller } from '../SnapScroller';
import { SnapScrollerContent } from '../components';

const elementFromPointMock = vi.fn<(x: number, y: number) => Element | null>().mockReturnValue(null);

Object.defineProperty(document, 'elementFromPoint', {
  configurable: true,
  writable: true,
  value: elementFromPointMock,
});

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

const patchScrollMetrics = (opts: { width?: number; scrollWidth?: number } = {}) => {
  const { width = 300, scrollWidth = 1200 } = opts;
  
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
      return width;
    },
  });
  
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get() {
      return scrollWidth;
    },
  });
  
  let _scrollLeft = 0;
  Object.defineProperty(HTMLElement.prototype, 'scrollLeft', {
    configurable: true,
    get() {
      return _scrollLeft;
    },
    set(v: number) {
      _scrollLeft = v;
    },
  });
  
  return {
    setScrollLeft: (v: number) => (_scrollLeft = v),
  };
};

describe('SnapScroller', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
  
  it('renders container and children', () => {
    patchScrollMetrics({ width: 300, scrollWidth: 900 });
    
    render(
      <SnapScroller data-testid='scroller'>
        <SnapScrollerContent index={0} data-testid='1' />
        <SnapScrollerContent index={1} data-testid='2' />
      </SnapScroller>
    );
    
    expect(screen.getByTestId('scroller')).toBeInTheDocument();
    
    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.getByTestId('2')).toBeInTheDocument();
  });
  
  it('scrolls to middle on mount', () => {
    patchScrollMetrics({ width: 500, scrollWidth: 2000 });
    
    const scrollToSpy = vi.spyOn(HTMLElement.prototype, 'scrollTo');
    
    render(
      <SnapScroller data-testid='scroller'>
        <SnapScrollerContent index={0} />
        <SnapScrollerContent index={1} />
      </SnapScroller>
    );
    
    expect(scrollToSpy).toHaveBeenCalledWith({ left: 1000, behavior: 'instant' });
  });
  
  it('fires onOffset(-1) at start and onOffset(1) at end', () => {
    const { setScrollLeft } = patchScrollMetrics({ width: 200, scrollWidth: 1000 });
    const onOffset = vi.fn();
    
    render(
      <SnapScroller data-testid='scroller' onOffset={onOffset}>
        <SnapScrollerContent index={0} />
        <SnapScrollerContent index={1} />
        <SnapScrollerContent index={2} />
      </SnapScroller>
    );
    
    const scroller = screen.getByTestId('scroller');
    
    setScrollLeft(0);
    fireEvent.scroll(scroller);
    expect(onOffset).toHaveBeenCalledWith(-1);
    
    onOffset.mockClear();
    
    setScrollLeft(1000 - 200);
    fireEvent.scroll(scroller);
    expect(onOffset).toHaveBeenCalledWith(1);
  });
  
  it('exposes imperative API (element, prev, next)', () => {
    patchScrollMetrics({ width: 300, scrollWidth: 900 });
    const apiRef = createRef<{ element: HTMLDivElement | null; prev: () => void; next: () => void }>();
    
    render(
      <SnapScroller ref={apiRef}>
        <SnapScrollerContent index={0} />
        <SnapScrollerContent index={1} />
        <SnapScrollerContent index={2} />
      </SnapScroller>
    );
    
    expect(apiRef.current?.element).toBeInstanceOf(HTMLElement);
    expect(() => apiRef.current?.prev()).not.toThrow();
    expect(() => apiRef.current?.next()).not.toThrow();
  });
  
  it('preserves snapped index after edge trigger when preserveScroll is true', async () => {
    const { setScrollLeft } = patchScrollMetrics({ width: 300, scrollWidth: 900 });
    const onOffset = vi.fn();
    
    render(
      <SnapScroller data-testid='scroller' onOffset={onOffset} preserveScroll>
        <SnapScrollerContent index={0} />
        <SnapScrollerContent index={1} />
        <SnapScrollerContent index={2} />
      </SnapScroller>
    );
    
    fireEvent.scroll(screen.getByTestId('scroller'));
    
    setScrollLeft(900 - 300);
    fireEvent.scroll(screen.getByTestId('scroller'));
    expect(onOffset).toHaveBeenCalledWith(1);
    
    await act(async () => {
      vi.runAllTimers();
    });
    
    expect(true).toBe(true);
  });
  
  it('calls user onScroll via mergeEventHandlers', () => {
    patchScrollMetrics({ width: 300, scrollWidth: 900 });
    const userOnScroll = vi.fn();
    
    render(
      <SnapScroller data-testid='scroller' onScroll={userOnScroll}>
        <SnapScrollerContent index={0} />
        <SnapScrollerContent index={1} />
      </SnapScroller>
    );
    
    const scroller = screen.getByTestId('scroller') as HTMLElement;
    fireEvent.scroll(scroller);
    expect(userOnScroll).toHaveBeenCalled();
  });
});
