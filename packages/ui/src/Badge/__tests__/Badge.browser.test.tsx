import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Badge } from '../Badge';

afterEach(cleanup);

const BADGE_TEXT = 'Badge';
const BADGE_TITLE = 'badge';

const BadgeTest = (props: ComponentProps<typeof Badge>) => {
  const { children, ...rest } = props;
  
  return (
    <Badge data-testid='badge' {...rest}>
      {children ?? BADGE_TEXT}
    </Badge>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId('badge');
const getText = (r: RenderResult) => r.getByText(BADGE_TEXT);

describe('Badge', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<BadgeTest />);
    });
    
    it('renders root and children', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getText(r)).toBeInTheDocument();
    });
    
    it('applies default data attributes', async () => {
      const root = getRoot(r);
      await expect.element(root).toHaveAttribute('data-size', 'md');
      await expect.element(root).toHaveAttribute('data-variant', 'success');
      await expect.element(root).toHaveAttribute('data-appearance', 'ghost');
    });
    
    it('applies size prop', async () => {
      r.rerender(<BadgeTest size='size' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-size', 'size');
    });
    
    it('applies variant prop', async () => {
      r.rerender(<BadgeTest variant='variant' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-variant', 'variant');
    });
    
    it('applies appearance prop', async () => {
      r.rerender(<BadgeTest appearance='appearance' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-appearance', 'appearance');
    });
    
    it('forwards HTMLAttributes to root', async () => {
      r.rerender(<BadgeTest title={BADGE_TITLE} />);
      await expect.element(getRoot(r)).toHaveAttribute('title', BADGE_TITLE);
    });
  });
  
  describe('Error Handling', () => {
    it('renders without children (no crash)', async () => {
      const r = render(<Badge data-testid='badge' />);
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('renders complex children', async () => {
      const r = render(
        <BadgeTest>
          <span>Inner</span>
        </BadgeTest>,
      );
      
      await expect.element(r.getByText('Inner')).toBeInTheDocument();
    });
  });
});