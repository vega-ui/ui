import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { HelperText } from '../HelperText';

afterEach(cleanup);

const TESTID = 'helper-text';
const TEXT = 'Helper text';

const HelperTextTest: FC<ComponentProps<typeof HelperText>> = ({ children, ...props }) => {
  return (
    <HelperText data-testid={TESTID} {...props}>
      {children ?? TEXT}
    </HelperText>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID);
const getParagraph = (r: RenderResult) => r.getByText(TEXT);

describe('HelperText', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<HelperTextTest />);
    });
    
    it('renders root', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
    
    it('renders children inside paragraph', async () => {
      await expect.element(getParagraph(r)).toBeInTheDocument();
    });
    
    it('sets default size=md mapping via data attribute on root', async () => {
      await expect.element(getRoot(r)).toHaveAttribute('data-size', '2');
    });
    
    it('supports custom size', async () => {
      r.rerender(<HelperTextTest size='lg' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-size', '3');
    });
    
    it('sets data-error=true when error is enabled', async () => {
      r.rerender(<HelperTextTest error />);
      await expect.element(getRoot(r)).toHaveAttribute('data-error', 'true');
    });
    
    it('merges className with base class', async () => {
      const CLASSNAME = 'custom-class';
      r.rerender(<HelperTextTest className={CLASSNAME} />);
      await expect.element(getRoot(r)).toHaveClass(CLASSNAME);
    });
    
    it('forwards native text props to paragraph (asChild)', async () => {
      const ID = 'helper-paragraph';
      r.rerender(<HelperTextTest id={ID} />);
      await expect.element(getRoot(r)).toHaveAttribute('id', ID);
    });
  });
  
  describe('Edge Cases', () => {
    it('renders empty children', async () => {
      const r = render(<HelperTextTest>{''}</HelperTextTest>);
      const root = getRoot(r);
      
      await expect.element(root).toBeInTheDocument();
      await expect.element(root).toHaveTextContent('');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('does not introduce an interactive role by default', async () => {
        const r = render(<HelperTextTest />);
        const root = getRoot(r);
        
        await expect.element(root).not.toHaveRole('button');
        await expect.element(root).not.toHaveRole('textbox');
        await expect.element(root).not.toHaveRole('alert');
      });
    });
  });
});