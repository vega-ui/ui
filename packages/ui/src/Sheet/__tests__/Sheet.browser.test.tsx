/// <reference types="@vitest/browser-playwright" />
import { ComponentProps, CSSProperties, FC } from 'react';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import { cdp, commands, page, server, userEvent } from 'vitest/browser';

import { Sheet } from '../Sheet';
import { SheetClose, SheetContent, SheetHandle, SheetTrigger } from '../components';
import '../../../../tokens/src/index.css';

beforeEach(() => page.viewport(414, 400));
afterAll(() => page.viewport(414, 896));
afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';
const TESTID_HANDLE = 'handle';
const TESTID_MAIN = 'main';
const TESTID_CLOSE = 'close';

const LOREM = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry';

type SheetTestProps = ComponentProps<typeof Sheet> & Pick<ComponentProps<typeof SheetContent>, 'closedBy' | 'overlay' | 'style'>

const SheetTest: FC<SheetTestProps> = ({ closedBy, overlay, style, children, ...props }) => (
  <Sheet {...props}>
    <SheetTrigger data-testid={TESTID_TRIGGER}>Open</SheetTrigger>
    <SheetContent data-testid={TESTID_CONTENT} closedBy={closedBy} overlay={overlay} style={style} aria-label='Details'>
      <SheetHandle aria-label='Resize sheet' data-testid={TESTID_HANDLE} />
      <div data-testid={TESTID_MAIN}>
        {LOREM}
        <button data-testid={TESTID_CLOSE}>Close</button>
        {children}
      </div>
    </SheetContent>
  </Sheet>
);

const ScrollableSheetTest: FC<ComponentProps<typeof Sheet>> = (props) => (
  <Sheet defaultOpen snapPoints={[0.5, 1]} {...props}>
    <SheetContent data-testid={TESTID_CONTENT}>
      <div data-testid={TESTID_MAIN} style={{ overflow: 'auto' }}>
        <p style={{ height: 2000 }}>{LOREM}</p>
      </div>
    </SheetContent>
  </Sheet>
);

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLDialogElement | null;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLDialogElement;
const getMain = (r: RenderResult) => r.getByTestId(TESTID_MAIN);
const getHandle = (r: RenderResult) => r.getByTestId(TESTID_HANDLE);
const getOffset = (r: RenderResult) => parseFloat(getContent(r).style.getPropertyValue('--sheet-offset'));

const waitOpened = async (r: RenderResult) => {
  await expect.element(queryContent(r)).toBeInTheDocument();
  await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
  await expect.poll(() => getContent(r).matches(':modal')).toBe(true);
  await Promise.all(document.getAnimations().map((animation) => animation.finished));
};

const waitClosed = async (r: RenderResult) => {
  await expect.element(queryContent(r)).not.toBeInTheDocument();
};

const clickBackdrop = async (r: RenderResult) => {
  await userEvent.click(getContent(r), { position: { x: 10, y: -10 } });
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pointer = { pointerId: 1, isPrimary: true, button: 0, clientX: 100 };

const drag = async (target: HTMLElement, distance: number, { flick = false } = {}) => {
  const y = 300;
  fireEvent.pointerDown(target, { ...pointer, clientY: y });

  for (let step = 1; step <= 6; step++) {
    await wait(16);
    fireEvent.pointerMove(target, { ...pointer, clientY: y + (distance * step) / 6 });
  }

  if (!flick) await wait(150);
  fireEvent.pointerUp(target, { ...pointer, clientY: y + distance });
};

const touchDrag = async (target: HTMLElement, distance: number) => {
  const frame = window.frameElement?.getBoundingClientRect() ?? new DOMRect(0, 0, innerWidth, innerHeight);
  const scale = frame.width / innerWidth;
  const rect = target.getBoundingClientRect();
  const x = frame.left + (rect.left + rect.width / 2) * scale;
  const y = frame.top + (Math.max(rect.top, 0) + 100) * scale;
  const session = cdp();

  await session.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });

  for (let step = 1; step <= 10; step++) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y + (distance * scale * step) / 10 }] });
    await new Promise(requestAnimationFrame);
  }

  await wait(150);
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await session.send('Emulation.setTouchEmulationEnabled', { enabled: false });
};

describe('Sheet', () => {
  describe('Critical User Paths', () => {
    describe('SheetClose', () => {
      it('closes the sheet with the close transition', async () => {
        const r = render(
          <Sheet defaultOpen>
            <SheetContent data-testid='close-content' aria-label='Panel'>
              <SheetClose>Done</SheetClose>
            </SheetContent>
          </Sheet>
        );
        await expect.poll(() => (r.getByTestId('close-content') as HTMLDialogElement).matches(':modal')).toBe(true);

        await userEvent.click(r.getByRole('button', { name: 'Done' }));

        expect((r.getByTestId('close-content') as HTMLDialogElement).open).toBe(true);
        expect(r.getByTestId('close-content')).toHaveAttribute('data-status', 'close');
        await expect.element(r.queryByTestId('close-content')).not.toBeInTheDocument();
      });

      it('renders a button that does not submit a form', async () => {
        const r = render(
          <Sheet defaultOpen>
            <SheetContent aria-label='Panel'>
              <SheetClose>Done</SheetClose>
            </SheetContent>
          </Sheet>
        );

        await expect.element(r.getByRole('button', { name: 'Done' })).toHaveAttribute('type', 'button');
      });

      it('closes through its child with asChild and keeps the child onClick', async () => {
        const onClick = vi.fn();
        const onChangeOpen = vi.fn();
        const r = render(
          <Sheet open onChangeOpen={onChangeOpen}>
            <SheetContent aria-label='Panel'>
              <SheetClose asChild>
                <button aria-label='Close' onClick={onClick}>×</button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        );

        await userEvent.click(r.getByRole('button', { name: 'Close' }));

        expect(onClick).toHaveBeenCalledOnce();
        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      });
    });

    describe('open and close', () => {
      it('is closed by default', async () => {
        const r = render(<SheetTest />);

        await expect.element(queryContent(r)).not.toBeInTheDocument();
      });

      it('opens a modal native dialog on trigger click', async () => {
        const r = render(<SheetTest />);

        await userEvent.click(getTrigger(r));

        await waitOpened(r);
        expect(getContent(r).tagName).toBe('DIALOG');
      });

      it('closes on backdrop click', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await clickBackdrop(r);

        await waitClosed(r);
      });

      it('closes on Escape', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await userEvent.keyboard('{Escape}');

        await waitClosed(r);
      });

      it('requests open and close through onChangeOpen when controlled', async () => {
        const onChangeOpen = vi.fn();
        const r = render(<SheetTest open={false} onChangeOpen={onChangeOpen} />);

        await userEvent.click(getTrigger(r));
        expect(onChangeOpen).toHaveBeenLastCalledWith(true);
        await expect.element(queryContent(r)).not.toBeInTheDocument();

        r.rerender(<SheetTest open onChangeOpen={onChangeOpen} />);
        await waitOpened(r);

        await clickBackdrop(r);
        expect(onChangeOpen).toHaveBeenLastCalledWith(false);
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');

        r.rerender(<SheetTest open={false} onChangeOpen={onChangeOpen} />);
        await waitClosed(r);
      });
    });

    describe('snap points', () => {
      it('fits the content without snap points', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        expect(getContent(r).offsetHeight).toBeLessThan(400);
        expect(getOffset(r)).toBe(0);
      });

      it('does not shrink its main area below its content', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        expect(getMain(r).offsetHeight).toBe(getMain(r).scrollHeight);
      });

      it('fits the content by default, with snap points too', async () => {
        const r = render(<SheetTest defaultOpen snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        expect(getContent(r).offsetHeight).toBeLessThan(400);
        expect(getOffset(r)).toBe(0);
      });

      it('takes its height from CSS', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '50%' }} />);
        await waitOpened(r);

        expect(getContent(r).offsetHeight).toBe(200);
      });

      it('is never taller than the viewport', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: 1000 }} />);
        await waitOpened(r);

        expect(getContent(r).offsetHeight).toBe(400);
      });

      it('measures snap points from the viewport', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        expect(getOffset(r)).toBe(200);
      });

      it('rests snap points above its height at its top', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: 200 }} snapPoints={[0.25, 1]} defaultSnapPoint={1} />);
        await waitOpened(r);

        expect(getOffset(r)).toBe(0);
      });

      it('opens at the lowest snap point by default', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        expect(getOffset(r)).toBe(200);
      });

      it('opens at the lowest snap point whatever their order', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[1, 0.5]} />);
        await waitOpened(r);

        expect(getOffset(r)).toBe(200);
      });

      it('opens at defaultSnapPoint', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} defaultSnapPoint={1} />);
        await waitOpened(r);

        expect(getOffset(r)).toBe(0);
      });

      it('accepts pixel snap points', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={['100px', 1]} />);
        await waitOpened(r);

        expect(getOffset(r)).toBe(300);
      });

      it('follows the controlled activeSnapPoint', async () => {
        const r = render(<SheetTest open style={{ height: '100%' }} snapPoints={[0.5, 1]} activeSnapPoint={0} />);
        await waitOpened(r);
        expect(getOffset(r)).toBe(200);

        r.rerender(<SheetTest open style={{ height: '100%' }} snapPoints={[0.5, 1]} activeSnapPoint={1} />);

        await expect.poll(() => getOffset(r)).toBe(0);
      });

      it('settles at the snap point closest to where a slow drag ends', async () => {
        const onChangeActiveSnapPoint = vi.fn();
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} onChangeActiveSnapPoint={onChangeActiveSnapPoint} />);
        await waitOpened(r);

        await drag(getMain(r), -150);

        expect(onChangeActiveSnapPoint).toHaveBeenLastCalledWith(1);
        await expect.poll(() => getOffset(r)).toBe(0);
      });

      it('returns to the current snap point after a short slow drag', async () => {
        const onChangeActiveSnapPoint = vi.fn();
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} onChangeActiveSnapPoint={onChangeActiveSnapPoint} />);
        await waitOpened(r);

        await drag(getMain(r), -40);

        expect(onChangeActiveSnapPoint).not.toHaveBeenCalled();
        await expect.poll(() => getOffset(r)).toBe(200);
      });

      it('carries a flick past the closest snap point', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.25, 0.5, 1]} />);
        await waitOpened(r);

        await drag(getMain(r), -60, { flick: true });

        await expect.poll(() => getOffset(r)).toBe(0);
      });

      it('moves one snap point per drag when steppedSnapPoints is set', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.25, 0.5, 1]} steppedSnapPoints />);
        await waitOpened(r);

        await drag(getMain(r), -60, { flick: true });

        await expect.poll(() => getOffset(r)).toBe(200);
      });

      it('reopens at the default snap point', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);
        await drag(getMain(r), -150);
        await expect.poll(() => getOffset(r)).toBe(0);

        await userEvent.keyboard('{Escape}');
        await waitClosed(r);
        await userEvent.click(getTrigger(r));
        await waitOpened(r);

        expect(getOffset(r)).toBe(200);
      });
    });

    describe('dragging', () => {
      it('follows the pointer while dragging', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        fireEvent.pointerDown(getMain(r), { ...pointer, clientY: 300 });
        fireEvent.pointerMove(getMain(r), { ...pointer, clientY: 250 });

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'true');
        expect(getOffset(r)).toBe(150);

        fireEvent.pointerUp(getMain(r), { ...pointer, clientY: 250 });
        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'false');
      });

      it('resists a drag above the top snap point', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        fireEvent.pointerDown(getMain(r), { ...pointer, clientY: 300 });
        fireEvent.pointerMove(getMain(r), { ...pointer, clientY: 100 });

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'true');
        expect(getOffset(r)).toBeLessThan(0);
        expect(getOffset(r)).toBeGreaterThan(-200);

        fireEvent.pointerUp(getMain(r), { ...pointer, clientY: 100 });
        await expect.poll(() => getOffset(r)).toBe(0);
      });

      it('closes on a drag down past the middle', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await drag(getMain(r), 250);

        await waitClosed(r);
      });

      it('closes on a flick down', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await drag(getMain(r), 60, { flick: true });

        await waitClosed(r);
      });

      it('springs back instead of closing when closedBy is not any', async () => {
        const r = render(<SheetTest defaultOpen closedBy='closerequest' />);
        await waitOpened(r);

        await drag(getMain(r), 250);

        await expect.poll(() => getOffset(r)).toBe(0);
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('does not start a drag from the backdrop', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        fireEvent.pointerDown(getContent(r), { ...pointer, clientY: 10 });
        fireEvent.pointerMove(getContent(r), { ...pointer, clientY: 200 });

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'false');
        fireEvent.pointerUp(getContent(r), { ...pointer, clientY: 200 });
      });

      it('does not start a drag from a text field', async () => {
        const r = render(<SheetTest defaultOpen><input data-testid='input' /></SheetTest>);
        await waitOpened(r);

        fireEvent.pointerDown(r.getByTestId('input'), { ...pointer, clientY: 300 });
        fireEvent.pointerMove(r.getByTestId('input'), { ...pointer, clientY: 400 });

        await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'false');
        fireEvent.pointerUp(r.getByTestId('input'), { ...pointer, clientY: 400 });
      });

      describe.runIf(server.browser === 'chromium')('touch', () => {
        it('drags the sheet up by its scrollable content below the top snap point', async () => {
          const r = render(<ScrollableSheetTest />);
          await waitOpened(r);

          await touchDrag(getMain(r), -300);

          await expect.poll(() => getOffset(r)).toBe(0);
          expect(getMain(r).scrollTop).toBe(0);
        });

        it('scrolls the content on a drag up at the top snap point', async () => {
          const r = render(<ScrollableSheetTest defaultSnapPoint={1} />);
          await waitOpened(r);

          await touchDrag(getMain(r), -300);

          await expect.poll(() => getMain(r).scrollTop).toBeGreaterThan(0);
          expect(getOffset(r)).toBe(0);
        });

        it('drags the sheet down by its content scrolled to the top', async () => {
          const onChangeActiveSnapPoint = vi.fn();
          const r = render(<ScrollableSheetTest defaultSnapPoint={1} onChangeActiveSnapPoint={onChangeActiveSnapPoint} />);
          await waitOpened(r);

          await touchDrag(getMain(r), 300);

          await expect.poll(() => onChangeActiveSnapPoint).toHaveBeenCalledWith(0);
        });
      });
    });

    describe('closedBy', () => {
      it('stays open on backdrop click when closedBy=closerequest', async () => {
        const r = render(<SheetTest defaultOpen closedBy='closerequest' />);
        await waitOpened(r);

        await clickBackdrop(r);

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('ignores Escape when closedBy=none', async () => {
        const r = render(<SheetTest defaultOpen closedBy='none' />);
        await waitOpened(r);

        await userEvent.keyboard('{Escape}');

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });
    });

    describe('overlay', () => {
      it('dims the page behind the sheet by default', async () => {
        document.documentElement.style.setProperty('--overlay', 'rgb(0, 0, 0)');
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        expect(getComputedStyle(getContent(r), '::backdrop').backgroundColor).toBe('rgb(0, 0, 0)');
        document.documentElement.style.removeProperty('--overlay');
      });

      it('leaves the page behind the sheet visible without an overlay', async () => {
        document.documentElement.style.setProperty('--overlay', 'rgb(0, 0, 0)');
        const r = render(<SheetTest defaultOpen overlay={false} />);
        await waitOpened(r);

        const backdrop = getComputedStyle(getContent(r), '::backdrop');

        expect(backdrop.backgroundColor).toBe('rgba(0, 0, 0, 0)');
        expect(backdrop.backdropFilter).toBe('none');
        document.documentElement.style.removeProperty('--overlay');
      });

      it('reports how far the sheet is raised from its lowest to its top snap point', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);
        const getExpansion = () => parseFloat(getContent(r).style.getPropertyValue('--sheet-expansion'));

        expect(getExpansion()).toBe(0);

        fireEvent.pointerDown(getMain(r), { ...pointer, clientY: 300 });
        fireEvent.pointerMove(getMain(r), { ...pointer, clientY: 200 });

        await expect.poll(getExpansion).toBe(0.5);
        fireEvent.pointerUp(getMain(r), { ...pointer, clientY: 200 });
      });

      it('keeps clear of the sides at its lowest snap point and widens to them at the top', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        await expect.poll(() => getContent(r).offsetWidth).toBe(innerWidth - 32);

        fireEvent.pointerDown(getMain(r), { ...pointer, clientY: 300 });
        fireEvent.pointerMove(getMain(r), { ...pointer, clientY: 100 });

        await expect.poll(() => getContent(r).offsetWidth).toBe(innerWidth);
        fireEvent.pointerUp(getMain(r), { ...pointer, clientY: 100 });
      });

      it('keeps clear of the sides when it fits short content', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await expect.poll(() => getContent(r).offsetWidth).toBe(innerWidth - 32);
      });

      it('floats above the bottom edge with rounded corners when it fits short content', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await expect.poll(() => getContent(r).getBoundingClientRect().bottom).toBeCloseTo(innerHeight - 16, 1);
        expect(parseFloat(getComputedStyle(getContent(r)).borderBottomLeftRadius)).toBeGreaterThan(0);
      });

      it('floats above the bottom edge at a lower snap point', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        await expect.poll(() => document.elementFromPoint(innerWidth / 2, innerHeight - 8)).toBe(getContent(r));
        expect(getContent(r).contains(document.elementFromPoint(innerWidth / 2, innerHeight - 24))).toBe(true);
      });

      it('sits on the bottom edge when it reaches the top of the viewport', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} />);
        await waitOpened(r);

        await expect.poll(() => getContent(r).getBoundingClientRect().bottom).toBeCloseTo(innerHeight, 1);
        expect(parseFloat(getComputedStyle(getContent(r)).borderBottomLeftRadius)).toBe(0);
      });

      it('takes the full width when it reaches the top of the viewport', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} />);
        await waitOpened(r);

        await expect.poll(() => getContent(r).offsetWidth).toBe(innerWidth);
      });

      it('takes the full width with --sheet-inset: 0', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%', '--sheet-inset': '0px' } as CSSProperties} snapPoints={[0.5, 1]} />);
        await waitOpened(r);

        expect(getContent(r).offsetWidth).toBe(innerWidth);
      });

      it('reports a fully raised sheet at its top snap point', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} defaultSnapPoint={1} />);
        await waitOpened(r);

        expect(getContent(r).style.getPropertyValue('--sheet-expansion')).toBe('1');
      });

      it('fades the backdrop as the sheet is dragged down', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[1]} />);
        await waitOpened(r);

        fireEvent.pointerDown(getMain(r), { ...pointer, clientY: 300 });
        fireEvent.pointerMove(getMain(r), { ...pointer, clientY: 500 });

        await expect.poll(() => parseFloat(getComputedStyle(getContent(r), '::backdrop').opacity)).toBeCloseTo(0.5);
        fireEvent.pointerUp(getMain(r), { ...pointer, clientY: 500 });
      });
    });
  });

  describe('Edge Cases', () => {
    it('locks page scroll while open', async () => {
      const r = render(<SheetTest defaultOpen />);
      await waitOpened(r);

      expect(getComputedStyle(document.documentElement).overflow).toBe('hidden');

      await clickBackdrop(r);
      await waitClosed(r);

      expect(getComputedStyle(document.documentElement).overflow).not.toBe('hidden');
    });

    it('keeps its content close to the top with the handle over it, like an iOS sheet', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        expect(getMain(r).getBoundingClientRect().top - getContent(r).getBoundingClientRect().top).toBe(20);
      });

    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <SheetTest />
        </form>
      );

      await userEvent.click(getTrigger(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('keeps the offset when a press starts a drag', async () => {
      const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
      await waitOpened(r);
      const offset = getOffset(r);

      fireEvent.pointerDown(getMain(r), { ...pointer, clientY: 300 });
      fireEvent.pointerMove(getMain(r), { ...pointer, clientY: 296 });

      await expect.element(getContent(r)).toHaveAttribute('data-dragging', 'true');
      expect(getOffset(r)).toBe(offset - 4);
      fireEvent.pointerUp(getMain(r), { ...pointer, clientY: 296 });
    });

    it('swallows the click that ends a drag', async () => {
      const onClick = vi.fn();
      const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.5, 1]} />);
      await waitOpened(r);
      r.getByTestId(TESTID_CLOSE).addEventListener('click', onClick);

      await drag(r.getByTestId(TESTID_CLOSE), -150);
      fireEvent.click(r.getByTestId(TESTID_CLOSE));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('is exposed as a dialog named by aria-label', async () => {
      const r = render(<SheetTest defaultOpen />);
      await waitOpened(r);

      await expect.element(r.getByRole('dialog', { name: 'Details' })).toBeInTheDocument();
    });

    it('trigger describes the sheet it opens', async () => {
      const r = render(<SheetTest defaultOpen />);
      await waitOpened(r);

      await expect.element(getTrigger(r)).toHaveAttribute('aria-haspopup', 'dialog');
      await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'true');
      await expect.element(getTrigger(r)).not.toHaveAttribute('aria-controls');
    });

    it('focuses the sheet itself on open and the trigger on close', async () => {
      const r = render(<SheetTest />);
      getTrigger(r).focus();

      await userEvent.keyboard('{Enter}');
      await waitOpened(r);
      await expect.element(getContent(r)).toHaveFocus();

      await userEvent.keyboard('{Escape}');
      await waitClosed(r);
      await expect.element(getTrigger(r)).toHaveFocus();
    });

    it('focuses the autoFocus element on open', async () => {
      const r = render(<SheetTest defaultOpen><input data-testid='input' autoFocus /></SheetTest>);
      await waitOpened(r);

      await expect.element(r.getByTestId('input')).toHaveFocus();
    });

    it('keeps Tab out of the page behind the sheet', async () => {
      const r = render(<SheetTest defaultOpen />);
      await waitOpened(r);
      r.getByTestId(TESTID_CLOSE).focus();

      for (let i = 0; i < 4; i++) {
        await userEvent.tab();
        await expect.element(getTrigger(r)).not.toHaveFocus();
      }
    });

    describe('handle', () => {
      it('is a button that expands to the next snap point and then collapses', async () => {
        const r = render(<SheetTest defaultOpen style={{ height: '100%' }} snapPoints={[0.25, 0.5, 1]} />);
        await waitOpened(r);

        await expect.element(getHandle(r)).toHaveRole('button');
        await expect.element(getHandle(r)).toHaveAccessibleName('Resize sheet');

        await userEvent.click(getHandle(r));
        await expect.poll(() => getOffset(r)).toBe(200);

        await userEvent.click(getHandle(r));
        await expect.poll(() => getOffset(r)).toBe(0);

        await userEvent.click(getHandle(r));
        await expect.poll(() => getOffset(r)).toBe(300);
      });

      it('starts a drag without snap points', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await commands.mouseDrag(`[data-testid="${TESTID_HANDLE}"]`, 300);

        await waitClosed(r);
      });

      it('is hidden from assistive technology without snap points', async () => {
        const r = render(<SheetTest defaultOpen />);
        await waitOpened(r);

        await expect.element(getHandle(r)).toBeDisabled();
        await expect.element(getHandle(r)).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
