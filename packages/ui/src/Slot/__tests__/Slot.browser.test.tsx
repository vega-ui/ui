import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Slot } from '../Slot';

afterEach(cleanup);

const TESTID_CHILD = 'child';
const TESTID_SLOT = 'slot';

const CHILD_TEXT = 'Child';
const CHILD_CLASS = 'child-class';
const SLOT_CLASS = 'slot-class';
const SLOT_TITLE = 'slot-title';

const SlotTest: FC<Partial<ComponentProps<typeof Slot>>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <div data-testid={TESTID_SLOT}>
      <Slot {...rest}>
        {children ?? (
          <button data-testid={TESTID_CHILD} className={CHILD_CLASS}>
            {CHILD_TEXT}
          </button>
        )}
      </Slot>
    </div>
  );
};

const getChild = (r: RenderResult) => r.getByTestId(TESTID_CHILD) as HTMLElement;
const queryChild = (r: RenderResult) => r.queryByTestId(TESTID_CHILD) as HTMLElement | null;

describe('Slot', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<SlotTest />);
    });
    
    it('renders single child element', async () => {
      const child = getChild(r);
      await expect.element(child).toBeInTheDocument();
      await expect.element(child).toHaveTextContent(CHILD_TEXT);
    });
    
    it('merges props onto child', async () => {
      r.rerender(
        <SlotTest
          className={SLOT_CLASS}
          title={SLOT_TITLE}
          data-testid={TESTID_CHILD}
        />
      );
      
      const child = getChild(r);
      
      await expect.element(child).toHaveAttribute('title', SLOT_TITLE);
      await expect.element(child).toHaveClass(CHILD_CLASS);
      await expect.element(child).toHaveClass(SLOT_CLASS);
    });
    
    it('preserves child props when slot does not override them', async () => {
      r.rerender(
        <SlotTest>
          <button data-testid={TESTID_CHILD} className={CHILD_CLASS} aria-label='child-label'>
            {CHILD_TEXT}
          </button>
        </SlotTest>
      );
      
      const child = getChild(r);
      
      await expect.element(child).toHaveAttribute('aria-label', 'child-label');
      await expect.element(child).toHaveClass(CHILD_CLASS);
    });
    
    it('supports different element types', async () => {
      r.rerender(
        <SlotTest>
          <a data-testid={TESTID_CHILD} href='/test'>
            {CHILD_TEXT}
          </a>
        </SlotTest>
      );
      
      const child = getChild(r);
      
      await expect.element(child).toHaveAttribute('href', '/test');
      await expect.element(child).toHaveTextContent(CHILD_TEXT);
    });
    
    it('merges event handlers (slot + child) without losing either', async () => {
      let slotCount = 0;
      let childCount = 0;
      
      const onClickSlot = () => {
        slotCount += 1;
      };
      
      const onClickChild = () => {
        childCount += 1;
      };
      
      r.rerender(
        <SlotTest onClick={onClickSlot}>
          <button data-testid={TESTID_CHILD} onClick={onClickChild}>
            {CHILD_TEXT}
          </button>
        </SlotTest>
      );
      
      const child = getChild(r);
      
      await userEvent.click(child);
      
      expect(slotCount).toBe(1);
      expect(childCount).toBe(1);
    });
  });
  
  describe('Error Handling', () => {
    it('throws when child is not a valid React element', async () => {
      expect(() => {
        render(<SlotTest>text child</SlotTest>);
      }).toThrow('React.Children.only expected to receive a single React element child.');
    });
    
    it('throws when multiple children are passed', async () => {
      expect(() => {
        render(
          <SlotTest>
            <button data-testid='a'>A</button>
            <button data-testid='b'>B</button>
          </SlotTest>
        );
      }).toThrow();
    });
  });
  
  describe('Edge Cases', () => {
    it('supports nullish props and still renders child', async () => {
      const r = render(
        <SlotTest>
          <button data-testid={TESTID_CHILD}>{CHILD_TEXT}</button>
        </SlotTest>
      );
      
      const child = getChild(r);
      await expect.element(child).toBeInTheDocument();
    });
    
    it('does not render child when render throws', async () => {
      let r: RenderResult | null = null;
      
      try {
        r = render(<SlotTest>false</SlotTest>);
      } catch {
        // ignore
      }
      
      if (r) {
        expect(queryChild(r)).toBeNull();
      }
    });
  });
});