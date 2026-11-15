import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';

import { PageControl } from '../PageControl';
import { PageControlItem, PageControlProgress } from '../components';

afterEach(cleanup);

const TESTID_LIST = 'pagecontrol';
const TESTID_TAB = (i: number) => `tab-${i}`;
const TESTID_PROGRESS = (i: number) => `progress-${i}`;

const PageControlTest: FC<Partial<ComponentProps<typeof PageControl>> > = ({
 children,
 ...props
}) => {
  return (
    <PageControl data-testid={TESTID_LIST} {...props}>
      {children ??
        <>
          <PageControlItem style={{ width: 6, height: 6 }} data-testid={TESTID_TAB(0)} index={0} />
          <PageControlItem style={{ width: 6, height: 6 }} data-testid={TESTID_TAB(1)} index={1} />
          <PageControlItem style={{ width: 6, height: 6 }} data-testid={TESTID_TAB(2)} index={2} />
          <PageControlProgress data-testid={TESTID_PROGRESS(0)} index={4} />
        </>
      }
    </PageControl>
  );
};

const getList = (r: RenderResult) => r.getByTestId(TESTID_LIST);
const getTab = (r: RenderResult, i: number) => r.getByTestId(TESTID_TAB(i));
const getProgress = (r: RenderResult, i: number) => r.getByTestId(TESTID_PROGRESS(i));
const getAllTabs = (r: RenderResult) => r.getAllByRole('tab') as HTMLButtonElement[];

const touchDown = (list: HTMLElement, pointerId = 1, clientX = 10, clientY = 10) => {
  fireEvent.pointerDown(list, { pointerId, pointerType: 'touch', clientX, clientY, buttons: 1 });
};

const touchMove = (list: HTMLElement, pointerId = 1, clientX = 10, clientY = 10) => {
  fireEvent.pointerMove(list, { pointerId, pointerType: 'touch', clientX, clientY, buttons: 1 });
};

const touchUp = (list: HTMLElement, pointerId = 1) => {
  fireEvent.pointerUp(list, { pointerId, pointerType: 'touch' });
};

describe('PageControl', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      describe('defaultActive', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PageControlTest defaultActive={0} />);
        });
        
        it('renders tablist and tabs', async () => {
          await expect.element(getList(r)).toHaveRole('tablist');
          expect(getAllTabs(r)).toHaveLength(4);
          for (const tab of getAllTabs(r)) {
            await expect.element(tab).toHaveRole('tab');
          }
        });
        
        it('marks defaultActive tab as selected and focusable', async () => {
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'true');
          await expect.element(getTab(r, 0)).toHaveAttribute('tabindex', '0');
          
          await expect.element(getTab(r, 1)).toHaveAttribute('aria-selected', 'false');
          await expect.element(getTab(r, 1)).toHaveAttribute('tabindex', '-1');
        });
      });
      
      describe('mouse', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PageControlTest defaultActive={0} />);
        });
        
        it('changes active on click and moves focus to clicked tab', async () => {
          const t2 = getTab(r, 2);
          
          await userEvent.click(t2);
          
          await expect.element(getTab(r, 2)).toHaveAttribute('aria-selected', 'true');
          await expect.element(getTab(r, 2)).toHaveAttribute('tabindex', '0');
          await expect.element(t2).toHaveFocus();
          
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'false');
          await expect.element(getTab(r, 0)).toHaveAttribute('tabindex', '-1');
        });
        
        it('does nothing when clicking element without data-index', async () => {
          r.rerender(
            <PageControlTest defaultActive={0}>
              <li>
                <span data-testid='no-index'>x</span>
              </li>
              <li>
                <PageControlItem data-testid={TESTID_TAB(0)} index={0} />
              </li>
              <li>
                <PageControlItem data-testid={TESTID_TAB(1)} index={1} />
              </li>
            </PageControlTest>
          );
          
          await userEvent.click(r.getByTestId('no-index'));
          
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'true');
          await expect.element(getTab(r, 1)).toHaveAttribute('aria-selected', 'false');
        });
      });
      
      describe('touch', () => {
        it('changes active on pointer move when finger slides across items', async () => {
          const r = render(<PageControlTest defaultActive={0} />);
          const list = getList(r);
          
          const from = getTab(r, 0);
          const to = getTab(r, 2);
          
          from.focus();
          await expect.element(from).toHaveAttribute('aria-selected', 'true');
          
          touchDown(list, 1, 10, 10);
          
          const toRect = to.getBoundingClientRect();
          const midX = Math.round((toRect.left + toRect.right) / 2);
          
          touchMove(list, 1, midX, 10);
          touchUp(list, 1);
          
          await expect.element(getTab(r, 2)).toHaveAttribute('aria-selected', 'true');
          await expect.element(getTab(r, 2)).toHaveAttribute('tabindex', '0');
          await expect.element(getTab(r, 2)).toHaveFocus();
          
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'false');
          await expect.element(getTab(r, 0)).toHaveAttribute('tabindex', '-1');
        });
        
      });
    });
    
    describe('controlled', () => {
      describe('active + onChangeActive', () => {
        let r: RenderResult;
        let calls: number[];
        let onChangeActive: (value: number) => void;
        
        beforeEach(() => {
          calls = [];
          onChangeActive = (value) => calls.push(value);
          r = render(<PageControlTest active={1} onChangeActive={onChangeActive} />);
        });
        
        it('reflects controlled active', async () => {
          await expect.element(getTab(r, 1)).toHaveAttribute('aria-selected', 'true');
          await expect.element(getTab(r, 1)).toHaveAttribute('tabindex', '0');
          
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'false');
          await expect.element(getTab(r, 0)).toHaveAttribute('tabindex', '-1');
        });
        
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('keeps the size an item sets on itself over the size of the root', async () => {
      const r = render(
        <PageControlTest size='sm'>
          <PageControlItem data-testid={TESTID_TAB(0)} index={0} size='lg' />
          <PageControlItem data-testid={TESTID_TAB(1)} index={1} />
        </PageControlTest>,
      );

      await expect.element(getTab(r, 0)).toHaveAttribute('data-size', 'lg');
      await expect.element(getTab(r, 1)).toHaveAttribute('data-size', 'sm');
    });

    it('still ends the progress when the user prefers reduced motion', async () => {
      await commands.emulateReducedMotion('reduce');
      onTestFinished(() => commands.emulateReducedMotion('no-preference'));
      const onAnimationEnd = vi.fn();
      render(
        <PageControlTest defaultActive={0}>
          <PageControlProgress data-testid={TESTID_PROGRESS(0)} index={0} duration={50} onAnimationEnd={onAnimationEnd} />
        </PageControlTest>
      );

      await expect.poll(() => onAnimationEnd.mock.calls.length).toBe(1);
    });

    it('cancels the progress animation frame on unmount', () => {
      const cancel = vi.spyOn(window, 'cancelAnimationFrame');
      const r = render(
        <PageControl defaultActive={0}>
          <PageControlProgress index={0} />
        </PageControl>
      );

      r.unmount();

      expect(cancel).toHaveBeenCalled();
      cancel.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('hides the focus ring of a keyboard focus once the user clicks another tab, like a native button', async () => {
      const r = render(<PageControlTest defaultActive={0} />);
      getTab(r, 0).focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect.poll(() => getTab(r, 1).matches(':focus-visible')).toBe(true);

      await userEvent.click(getTab(r, 2));

      await expect.element(getTab(r, 2)).toHaveAttribute('aria-selected', 'true');
      expect(getTab(r, 2).matches(':focus-visible')).toBe(false);
    });

    describe('keyboard', () => {
      it('ArrowLeft moves selection and focus to previous tab', async () => {
        const r = render(<PageControlTest defaultActive={2} />);
        
        getTab(r, 0).focus();
        await userEvent.keyboard('{ArrowLeft}');
        
        await expect.element(getTab(r, 1)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getTab(r, 1)).toHaveFocus();
      });
      
      it('ArrowLeft on the first tab moves to the last one', async () => {
        const r = render(<PageControlTest defaultActive={0} />);

        getTab(r, 0).focus();
        await userEvent.keyboard('{ArrowLeft}');

        await expect.element(getProgress(r, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getProgress(r, 0)).toHaveFocus();
      });
    });
    
    describe('aria', () => {
      it('item current sets aria-current=page and disables item', async () => {
        const r = render(
          <PageControlTest defaultActive={0}>
            <li>
              <PageControlItem data-testid={TESTID_TAB(0)} index={0} />
            </li>
            <li>
              <PageControlItem data-testid={TESTID_TAB(1)} index={1} current />
            </li>
          </PageControlTest>
        );
        
        await expect.element(getTab(r, 1)).toHaveAttribute('aria-current', 'page');
        await expect.element(getTab(r, 1)).toBeDisabled();
      });
      
      it('item exposes meter role and valuemax/valuenow only when current', async () => {
        const r = render(<PageControlTest defaultActive={4} />);
        const progress = getProgress(r, 0);
        
        await expect.element(progress).toHaveRole('meter');
        await expect.element(progress).toHaveAttribute('aria-valuemax', '100');
        await expect.element(progress).toHaveAttribute('aria-valuenow', '0');
      });
      
      it('item is a tab and has no valuemax/valuenow when not current', async () => {
        const r = render(<PageControlTest defaultActive={0} />);
        const progress = getProgress(r, 0);
        
        await expect.element(progress).not.toHaveRole('meter')
        await expect.element(progress).not.toHaveAttribute('aria-valuemax');
        await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      });
    });
  });
});