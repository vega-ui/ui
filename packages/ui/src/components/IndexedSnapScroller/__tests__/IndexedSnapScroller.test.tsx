import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IndexedSnapScroller } from '../IndexedSnapScroller';
import { IndexedSnapScrollerContent, IndexedSnapScrollerContentProps } from '../components';
import { FC } from 'react';
import { useIndexedSnapScrollerContext } from '../contexts';

const TestIndexedSnapScrollerContent: FC<IndexedSnapScrollerContentProps> = (props) => {
  const { index } = useIndexedSnapScrollerContext();
  
  return (
    <IndexedSnapScrollerContent data-testid='page' {...props}>
      {index}
    </IndexedSnapScrollerContent>
  );
};

const patchScrollMetrics = (opts: { width?: number; scrollWidth?: number } = {}) => {
  const { width = 300, scrollWidth = 1500 } = opts;
  
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
    setScrollLeft: (v: number) => {
      _scrollLeft = v;
    },
  };
};

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
  
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
  
  Object.defineProperty(document, 'elementFromPoint', {
    configurable: true,
    writable: true,
    value: vi.fn().mockReturnValue(null),
  });
  
  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    writable: true,
    value: (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    },
  });
});

describe('IndexedSnapScroller', () => {
  it('renders initial window of indexes and passes index to content', () => {
    patchScrollMetrics({ width: 300, scrollWidth: 1500 });
    
    render(
      <IndexedSnapScroller style={{ width: 300 }}>
        <TestIndexedSnapScrollerContent />
      </IndexedSnapScroller>
    );
    
    const pages = screen.getAllByTestId('page');
    expect(pages.length).toBe(5);
    
    const values = pages.map((el) => Number(el.textContent));
    expect(values).toEqual([-2, -1, 0, 1, 2]);
    
    const dataIndexes = pages.map((el) => Number(el.getAttribute('data-index')));
    expect(dataIndexes).toEqual(values);
  });
  
  it('shifts indexes backward when scrolled to start (onOffset -1)', () => {
    const { setScrollLeft } = patchScrollMetrics({ width: 300, scrollWidth: 1500 });
    
    render(
      <IndexedSnapScroller data-testid='scroller' style={{ width: 300 }}>
        <TestIndexedSnapScrollerContent />
      </IndexedSnapScroller>
    );
    
    const scroller = screen.getByTestId('scroller');
    
    setScrollLeft(0);
    fireEvent.scroll(scroller!);
    
    const pages = screen.getAllByTestId('page');
    const values = pages.map((el) => Number(el.textContent));
    expect(values).toEqual([-4, -3, -2, -1, 0]);
  });
  
  it('shifts indexes forward when scrolled to end (onOffset 1)', () => {
    const { setScrollLeft } = patchScrollMetrics({ width: 300, scrollWidth: 1500 });
    
    render(
      <IndexedSnapScroller data-testid='scroller' style={{ width: 300 }}>
        <TestIndexedSnapScrollerContent />
      </IndexedSnapScroller>
    );
    
    const scroller = screen.getByTestId('scroller')
    
    setScrollLeft(1500 - 300);
    fireEvent.scroll(scroller!);
    
    const pages = screen.getAllByTestId('page');
    const values = pages.map((el) => Number(el.textContent));
    expect(values).toEqual([0, 1, 2, 3, 4]);
  });
  
  it('calls external onOffset handler together with internal shift/push', () => {
    const { setScrollLeft } = patchScrollMetrics({ width: 300, scrollWidth: 1500 });
    const onOffset = vi.fn();
    
    render(
      <IndexedSnapScroller data-testid='scroller' style={{ width: 300 }} onOffset={onOffset}>
        <TestIndexedSnapScrollerContent />
      </IndexedSnapScroller>
    );
    
    const scroller = screen.getByTestId('scroller')
    
    setScrollLeft(1500 - 300);
    fireEvent.scroll(scroller!);
    
    expect(onOffset).toHaveBeenCalledTimes(1);
    expect(onOffset).toHaveBeenCalledWith(1);
  });
  
  it('calls external onSnap handler when snapped index changes', () => {
    const { setScrollLeft } = patchScrollMetrics({ width: 300, scrollWidth: 1500 });
    const onSnap = vi.fn();
    
    render(
      <IndexedSnapScroller data-testid='scroller' style={{ width: 300 }} onSnap={onSnap}>
        <TestIndexedSnapScrollerContent />
      </IndexedSnapScroller>
    );
    
    const scroller = screen.getByTestId('scroller')
    const pages = screen.getAllByTestId('page');
    const target = pages[3];
    
    (document.elementFromPoint as Mock).mockReturnValue(target);
    
    setScrollLeft(600);
    fireEvent.scroll(scroller!);
    
    const expectedIndex = Number(target.getAttribute('data-index'));
    expect(onSnap).toHaveBeenCalledTimes(1);
    expect(onSnap).toHaveBeenCalledWith(expectedIndex);
  });
});
