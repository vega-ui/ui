import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Spinner } from '../Spinner';

afterEach(cleanup);

const TESTID = 'spinner';

const DEFAULT_SIZE = 3;
const DEFAULT_VARIANT = 'primary';

const SpinnerTest: FC<ComponentProps<typeof Spinner>> = (props) => (
  <Spinner data-testid={TESTID} {...props} />
);

const getSpinner = (r: RenderResult) => r.getByTestId(TESTID);

describe('Spinner', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<SpinnerTest />);
    });
    
    it('renders spinner root', async () => {
      const spinner = getSpinner(r);
      await expect.element(spinner).toBeInTheDocument();
    });
    
    it('applies default size and variant', async () => {
      const spinner = getSpinner(r);
      
      await expect.element(spinner).toHaveAttribute('data-size', String(DEFAULT_SIZE));
      await expect.element(spinner).toHaveAttribute('data-variant', DEFAULT_VARIANT);
    });
    
    it('supports custom size', async () => {
      r.rerender(<SpinnerTest size={6} />);
      
      const spinner = getSpinner(r);
      await expect.element(spinner).toHaveAttribute('data-size', '6');
    });
    
    it('supports custom variant', async () => {
      r.rerender(<SpinnerTest variant='secondary' />);
      
      const spinner = getSpinner(r);
      await expect.element(spinner).toHaveAttribute('data-variant', 'secondary');
    });
    
    it('merges custom className', async () => {
      r.rerender(<SpinnerTest className='custom' />);
      
      const spinner = getSpinner(r);
      await expect.element(spinner).toHaveClass('custom');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders with minimal props', async () => {
      const r = render(<SpinnerTest />);
      
      const spinner = getSpinner(r);
      await expect.element(spinner).toBeInTheDocument();
    });
    
    it('renders with extreme size value', async () => {
      const r = render(<SpinnerTest size={11} />);
      
      const spinner = getSpinner(r);
      await expect.element(spinner).toHaveAttribute('data-size', '11');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SpinnerTest />);
      });
      
      it('does not expose interactive roles', async () => {
        const spinner = getSpinner(r);
        await expect.element(spinner).not.toHaveRole('button');
      });
    });
    
    describe('aria', () => {
      it('allows aria attributes to be passed through', async () => {
        const r = render(<SpinnerTest aria-hidden='true' />);
        
        const spinner = getSpinner(r);
        await expect.element(spinner).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});