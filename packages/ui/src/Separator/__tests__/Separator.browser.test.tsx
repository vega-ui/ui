import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Separator } from '../Separator';

afterEach(cleanup);

const TESTID = 'separator';

const SeparatorTest: FC<ComponentProps<typeof Separator>> = (props) => {
  return <Separator data-testid={TESTID} {...props} />;
};

const getSeparator = (r: RenderResult) => r.getByTestId(TESTID);

describe('Separator', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<SeparatorTest />);
    });
    
    it('renders', async () => {
      await expect.element(getSeparator(r)).toBeInTheDocument();
    });
    
    it('has separator role', async () => {
      await expect.element(getSeparator(r)).toHaveRole('separator');
    });
    
    it('sets default orientation to horizontal', async () => {
      await expect
        .element(getSeparator(r))
        .toHaveAttribute('data-orientation', 'horizontal');
    });
    
    it('supports vertical orientation', async () => {
      r.rerender(<SeparatorTest orientation='vertical' />);
      await expect
        .element(getSeparator(r))
        .toHaveAttribute('data-orientation', 'vertical');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('exposes correct ARIA role', async () => {
        const r = render(<SeparatorTest />);
        await expect.element(getSeparator(r)).toHaveRole('separator');
      });
    });
    
    describe('aria', () => {
      it('does not require aria-orientation for horizontal', async () => {
        const r = render(<SeparatorTest />);
        await expect
          .element(getSeparator(r))
          .not.toHaveAttribute('aria-orientation');
      });
      
      it('can be extended with aria-orientation if provided', async () => {
        const r = render(
          <SeparatorTest aria-orientation='vertical' orientation='vertical' />
        );
        
        await expect
          .element(getSeparator(r))
          .toHaveAttribute('aria-orientation', 'vertical');
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('forwards arbitrary div attributes', async () => {
      const r = render(
        <SeparatorTest id='custom-id' title='divider' />
      );
      
      const separator = getSeparator(r);
      
      await expect.element(separator).toHaveAttribute('id', 'custom-id');
      await expect.element(separator).toHaveAttribute('title', 'divider');
    });
  });
});