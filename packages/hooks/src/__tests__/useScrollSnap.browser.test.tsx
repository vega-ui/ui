import React, { FC, useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useScrollSnap } from '../useScrollSnap';

const ScrollSnapTest: FC<{ onSnapChange: (element: HTMLElement, key: number) => void }> = ({ onSnapChange }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { itemRef, onScroll } = useScrollSnap({ scrollerRef, onSnapChange });

  return (
    <div ref={scrollerRef} data-testid='scroller' onScroll={onScroll} style={{ display: 'flex', width: 100, overflowX: 'auto' }}>
      {[0, 1, 2].map((key) => <div key={key} ref={itemRef(key)} style={{ flex: '0 0 100px', height: 20 }} />)}
    </div>
  );
};

describe('useScrollSnap', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Edge Cases', () => {
    it.runIf('onscrollend' in HTMLElement.prototype)('reports a snap change when the scroll ends before the next frame', async () => {
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0);
      const onSnapChange = vi.fn();
      const screen = await render(<ScrollSnapTest onSnapChange={onSnapChange} />);
      const scroller = screen.getByTestId('scroller').element() as HTMLElement;

      scroller.scrollLeft = 100;
      scroller.dispatchEvent(new Event('scrollend'));

      expect(onSnapChange).toHaveBeenCalledWith(expect.any(HTMLElement), 1);
    });
  });
});
