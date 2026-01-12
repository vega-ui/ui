import { ComponentProps, FC, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Text } from '../Text';

afterEach(cleanup);

const TESTID = 'text';

const DEFAULT_CONTENT = 'Content';
const CUSTOM_CONTENT = 'Hello';

const SIZE_DEFAULT = 3;
const SIZE_NEXT = 7;

const WEIGHT_500 = 500;

const CLASS_A = 'class-a';
const CLASS_B = 'class-b';

const ID_VALUE = 'text-id';
const TITLE_VALUE = 'Text title';

const ARIA_LABEL = 'label';

const TextTest: FC<PropsWithChildren<ComponentProps<typeof Text>>> = ({ children, ...props }) => {
  return (
    <Text data-testid={TESTID} {...props}>
      {children ?? DEFAULT_CONTENT}
    </Text>
  );
};

const getText = (r: RenderResult) => r.getByTestId(TESTID);

describe('Text', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<TextTest />);
    });
    
    describe('rendering', () => {
      it('is in the document', async () => {
        const el = getText(r);
        await expect.element(el).toBeInTheDocument();
      });
      
      it('renders <span> by default', async () => {
        const el = getText(r);
        expect(el.tagName.toLowerCase()).toBe('span');
      });
      
      it('renders default children', async () => {
        const el = getText(r);
        await expect.element(el).toHaveTextContent(DEFAULT_CONTENT);
      });
      
      it('renders custom children', async () => {
        r.rerender(<TextTest>{CUSTOM_CONTENT}</TextTest>);
        const el = getText(r);
        await expect.element(el).toHaveTextContent(CUSTOM_CONTENT);
      });
    });
    
    describe('data attributes', () => {
      it('applies default data-size', async () => {
        const el = getText(r);
        await expect.element(el).toHaveAttribute('data-size', String(SIZE_DEFAULT));
      });
      
      it('supports custom size', async () => {
        r.rerender(<TextTest size={SIZE_NEXT} />);
        const el = getText(r);
        await expect.element(el).toHaveAttribute('data-size', String(SIZE_NEXT));
      });
      
      it('does not set data-font-weight by default', async () => {
        const el = getText(r);
        await expect.element(el).not.toHaveAttribute('data-font-weight');
      });
      
      it('sets data-font-weight when provided', async () => {
        r.rerender(<TextTest fontWeight={WEIGHT_500} />);
        const el = getText(r);
        await expect.element(el).toHaveAttribute('data-font-weight', String(WEIGHT_500));
      });
    });
    
    describe('className', () => {
      it('applies className', async () => {
        r.rerender(<TextTest className={CLASS_A} />);
        const el = getText(r);
        await expect.element(el).toHaveClass(CLASS_A);
      });
      
      it('updates className on rerender', async () => {
        r.rerender(<TextTest className={CLASS_A} />);
        r.rerender(<TextTest className={CLASS_B} />);
        const el = getText(r);
        await expect.element(el).toHaveClass(CLASS_B);
      });
    });
    
    describe('asChild', () => {
      it('renders child element type (button)', async () => {
        r.rerender(
          <TextTest asChild>
            <button data-testid={TESTID} type='button'>
              Button
            </button>
          </TextTest>
        );
        
        const el = getText(r);
        expect(el.tagName.toLowerCase()).toBe('button');
      });
      
      it('passes data-size to slotted element', async () => {
        r.rerender(
          <TextTest asChild>
            <button data-testid={TESTID} type='button'>
              Button
            </button>
          </TextTest>
        );
        
        const el = getText(r);
        await expect.element(el).toHaveAttribute('data-size', String(SIZE_DEFAULT));
      });
      
      it('passes className to slotted element', async () => {
        r.rerender(
          <TextTest asChild className={CLASS_A}>
            <button data-testid={TESTID} type='button'>
              Button
            </button>
          </TextTest>
        );
        
        const el = getText(r);
        await expect.element(el).toHaveClass(CLASS_A);
      });
      
      it('passes id to slotted element', async () => {
        r.rerender(
          <TextTest asChild id={ID_VALUE}>
            <button data-testid={TESTID} type='button'>
              Button
            </button>
          </TextTest>
        );
        
        const el = getText(r);
        await expect.element(el).toHaveAttribute('id', ID_VALUE);
      });
      
      it('passes title to slotted element', async () => {
        r.rerender(
          <TextTest asChild title={TITLE_VALUE}>
            <button data-testid={TESTID} type='button'>
              Button
            </button>
          </TextTest>
        );
        
        const el = getText(r);
        await expect.element(el).toHaveAttribute('title', TITLE_VALUE);
      });
      
      it('merges className with child className', async () => {
        r.rerender(
          <TextTest asChild className={CLASS_A}>
            <a data-testid={TESTID} className={CLASS_B}>
              Link
            </a>
          </TextTest>
        );
        
        const el = getText(r);
        await expect.element(el).toHaveClass(CLASS_A);
        await expect.element(el).toHaveClass(CLASS_B);
      });
      
      it('child props override parent props where applicable (title)', async () => {
        r.rerender(
          <TextTest asChild title='from-text'>
            <a data-testid={TESTID} title='from-child'>
              Link
            </a>
          </TextTest>
        );
        
        const el = getText(r);
        await expect.element(el).toHaveAttribute('title', 'from-child');
      });
    });
  });
  
  describe('Error Handling', () => {
    it('throws when asChild and child is a string', async () => {
      expect(() => {
        render(<TextTest asChild>{'invalid child'}</TextTest>);
      }).toThrow();
    });
    
    it('throws when asChild and child is null', async () => {
      expect(() => {
        render(<TextTest asChild>{null}</TextTest>);
      }).toThrow();
    });
    
    it('throws when asChild and child is undefined', async () => {
      expect(() => {
        render(<TextTest asChild>{undefined}</TextTest>);
      }).toThrow();
    });
    
    it('throws when asChild and children are multiple', async () => {
      expect(() => {
        render(
          <TextTest asChild>
            <span>One</span>
            <span>Two</span>
          </TextTest>
        );
      }).toThrow();
    });
  });
  
  describe('Edge Cases', () => {
    it('renders with empty string children', async () => {
      const r = render(<TextTest>{''}</TextTest>);
      const el = getText(r);
      await expect.element(el).toBeInTheDocument();
      await expect.element(el).toHaveTextContent('');
    });
    
    it('keeps default data-size when rerendered without size', async () => {
      const r = render(<TextTest />);
      const el = getText(r);
      
      await expect.element(el).toHaveAttribute('data-size', String(SIZE_DEFAULT));
      
      r.rerender(<TextTest className={CLASS_A} />);
      await expect.element(el).toHaveAttribute('data-size', String(SIZE_DEFAULT));
    });
    
    it('supports tabIndex', async () => {
      const r = render(<TextTest tabIndex={-1} />);
      const el = getText(r);
      await expect.element(el).toHaveAttribute('tabindex', '-1');
    });
    
    it('supports aria-label', async () => {
      const r = render(<TextTest aria-label={ARIA_LABEL} />);
      const el = getText(r);
      await expect.element(el).toHaveAttribute('aria-label', ARIA_LABEL);
    });
  });
});