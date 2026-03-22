import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

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
  fireEvent.pointerDown(list, { pointerId, pointerType: 'touch', clientX, clientY });
};

const touchMove = (list: HTMLElement, pointerId = 1, clientX = 10, clientY = 10) => {
  fireEvent.pointerMove(list, { pointerId, pointerType: 'touch', clientX, clientY });
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
        
        it('does not change active when clicking active tab', async () => {
          await userEvent.click(getTab(r, 0));
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'true');
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
        
        it('updates active multiple times while sliding (first to 1 then to 3)', async () => {
          const r = render(<PageControlTest defaultActive={0} />);
          const list = getList(r);
          
          touchDown(list, 1, 10, 10);
          
          const t1 = getTab(r, 0);
          const t3 = getTab(r, 2);
          
          const r1 = t1.getBoundingClientRect();
          const r3 = t3.getBoundingClientRect();
          
          touchMove(list, 1, Math.round((r1.left + r1.right) / 2), 10);
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'true');
          
          touchMove(list, 1, Math.round((r3.left + r3.right) / 2), 10);
          await expect.element(getTab(r, 2)).toHaveAttribute('aria-selected', 'true');
          
          touchUp(list, 1);
          
          await expect.element(getTab(r, 2)).toHaveAttribute('aria-selected', 'true');
          await expect.element(getTab(r, 2)).toHaveFocus();
        });
        
        it('does not change active when only pointerDown happens (no move)', async () => {
          const r = render(<PageControlTest defaultActive={0} />);
          const list = getList(r);
          
          touchDown(list, 1, 10, 10);
          touchUp(list, 1);
          
          await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'true');
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
        
        it('calls onChangeActive when clicking another tab', async () => {
          await userEvent.click(getTab(r, 2));
          expect(calls).toHaveLength(1);
          expect(calls[0]).toBe(2);
        });
        
        it('does not call onChangeActive when clicking active tab', async () => {
          await userEvent.click(getTab(r, 1));
          expect(calls).toHaveLength(0);
        });
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('keyboard', () => {
      it('ArrowRight moves selection and focus to next tab', async () => {
        const r = render(<PageControlTest defaultActive={0} />);
        
        getTab(r, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await expect.element(getTab(r, 1)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getTab(r, 1)).toHaveFocus();
      });
      
      it('ArrowLeft moves selection and focus to previous tab', async () => {
        const r = render(<PageControlTest defaultActive={2} />);
        
        getTab(r, 0).focus();
        await userEvent.keyboard('{ArrowLeft}');
        
        await expect.element(getTab(r, 1)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getTab(r, 1)).toHaveFocus();
      });
      
      it('does not move past last tab', async () => {
        const r = render(<PageControlTest defaultActive={4} />);
        const list = getList(r);
        
        list.focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await expect.element(getProgress(r, 0)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('does not move past first tab', async () => {
        const r = render(<PageControlTest defaultActive={0} />);
        const list = getList(r);
        
        list.focus();
        await userEvent.keyboard('{ArrowLeft}');
        
        await expect.element(getTab(r, 0)).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PageControlTest defaultActive={0} />);
      });
      
      it('tablist has role=tablist', async () => {
        await expect.element(getList(r)).toHaveRole('tablist');
      });
      
      it('each item is a tab', async () => {
        for (const tab of getAllTabs(r)) {
          await expect.element(tab).toHaveRole('tab');
        }
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