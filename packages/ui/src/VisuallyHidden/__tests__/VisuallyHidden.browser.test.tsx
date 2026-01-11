import { FC, ComponentProps } from 'react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { VisuallyHidden } from '../VisuallyHidden';

afterEach(cleanup);

const TESTID = 'visually-hidden';
const CHILD_TESTID = 'child';

const VisuallyHiddenTest: FC<ComponentProps<typeof VisuallyHidden>> = ({ children, ...props }) => {
  return (
    <VisuallyHidden data-testid={TESTID} {...props}>
      {children}
    </VisuallyHidden>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID);

describe('VisuallyHidden', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<VisuallyHiddenTest>Hidden content</VisuallyHiddenTest>);
    });
    
    it('renders content in the DOM', async () => {
      const root = getRoot(r);
      
      await expect.element(root).toBeInTheDocument();
      await expect.element(root).toHaveTextContent('Hidden content');
    });
    
    it('renders as div by default', async () => {
      const root = getRoot(r);
      
      expect(root.tagName).toBe('DIV');
    });
    
    it('supports custom className', async () => {
      r.rerender(
        <VisuallyHiddenTest className='custom-class'>
          Hidden content
        </VisuallyHiddenTest>
      );
      
      const root = getRoot(r);
      await expect.element(root).toHaveClass('custom-class');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without children', async () => {
      const r = render(<VisuallyHiddenTest />);
      
      const root = getRoot(r);
      await expect.element(root).toBeInTheDocument();
      await expect.element(root).toBeEmptyDOMElement();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<VisuallyHiddenTest>Accessible text</VisuallyHiddenTest>);
      });
      
      it('does not enforce a semantic role by default', async () => {
        const root = getRoot(r);
        
        await expect.element(root).not.toHaveAttribute('role');
      });
    });
    
    describe('focus', () => {
      it('can receive focus when focusable element is rendered via asChild', async () => {
        const r = render(
          <VisuallyHidden asChild>
            <button data-testid={CHILD_TESTID}>Hidden button</button>
          </VisuallyHidden>
        );
        
        const button = r.getByTestId(CHILD_TESTID);
        
        button.focus();
        await expect.element(button).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('supports keyboard interaction when child is interactive', async () => {
        const onClick = vi.fn();
        
        const r = render(
          <VisuallyHidden asChild>
            <button data-testid={CHILD_TESTID} onClick={onClick}>
              Hidden button
            </button>
          </VisuallyHidden>
        );
        
        const button = r.getByTestId(CHILD_TESTID);
        button.focus();
        
        await userEvent.keyboard('{Enter}');
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});