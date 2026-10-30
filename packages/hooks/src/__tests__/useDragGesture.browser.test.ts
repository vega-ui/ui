import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useDragGesture, UseDragGestureOptions } from '../useDragGesture';

const setup = async (options: Partial<UseDragGestureOptions> = {}) => {
  const element = document.createElement('div');
  element.style.cssText = 'position: fixed; inset: 0;';
  document.body.append(element);

  const callbacks = { onStart: vi.fn(), onMove: vi.fn(), onEnd: vi.fn() };
  await renderHook(() => useDragGesture(element, { axis: 'y', ...callbacks, ...options }));

  return { element, ...callbacks };
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 16));

const pointer = (element: HTMLElement, type: string, clientX: number, clientY: number) => {
  element.dispatchEvent(new PointerEvent(type, { pointerId: 1, isPrimary: true, button: 0, clientX, clientY, bubbles: true, cancelable: true }));
};

const drag = async (element: HTMLElement, dx: number, dy: number, end = 'pointerup') => {
  pointer(element, 'pointerdown', 100, 100);

  for (let step = 1; step <= 5; step++) {
    await wait();
    pointer(element, 'pointermove', 100 + (dx * step) / 5, 100 + (dy * step) / 5);
  }

  pointer(element, end, 100 + dx, 100 + dy);
};

describe('useDragGesture', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Critical User Paths', () => {
    it('reports the drag along the axis', async () => {
      const { element, onStart, onMove, onEnd } = await setup();

      await drag(element, 0, 100);

      expect(onStart).toHaveBeenCalledOnce();
      expect(onMove).toHaveBeenLastCalledWith(expect.objectContaining({ delta: 100 }));
      expect(onEnd).toHaveBeenCalledWith(expect.objectContaining({ delta: 100 }));
    });

    it('reports the velocity in the direction of the drag', async () => {
      const { element, onEnd } = await setup();

      await drag(element, 0, -100);

      expect(onEnd.mock.calls[0][0].velocity).toBeLessThan(-100);
    });

    it('ends the drag when the browser cancels the pointer', async () => {
      const { element, onEnd } = await setup();

      await drag(element, 0, 100, 'pointercancel');

      expect(onEnd).toHaveBeenCalledOnce();
    });
  });

  describe('Edge Cases', () => {
    it('ignores a drag along the other axis', async () => {
      const { element, onStart, onEnd } = await setup();

      await drag(element, 100, 10);

      expect(onStart).not.toHaveBeenCalled();
      expect(onEnd).not.toHaveBeenCalled();
    });

    it('does not start when shouldStart declines the direction', async () => {
      const shouldStart = vi.fn(() => false);
      const { element, onStart } = await setup({ shouldStart });

      await drag(element, 0, -100);

      expect(shouldStart).toHaveBeenCalledWith(expect.any(PointerEvent), -1);
      expect(onStart).not.toHaveBeenCalled();
    });

    it('blocks native scrolling only while dragging', async () => {
      const { element } = await setup();
      const touchMove = () => {
        const event = new TouchEvent('touchmove', { cancelable: true, bubbles: true });
        element.dispatchEvent(event);
        return event.defaultPrevented;
      };

      expect(touchMove()).toBe(false);

      pointer(element, 'pointerdown', 100, 100);
      pointer(element, 'pointermove', 100, 120);

      expect(touchMove()).toBe(true);

      pointer(element, 'pointerup', 100, 120);

      expect(touchMove()).toBe(false);
    });

    it('swallows the click that ends a drag', async () => {
      const { element } = await setup();
      const onClick = vi.fn();
      element.addEventListener('click', onClick);

      await drag(element, 0, 100);
      element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
