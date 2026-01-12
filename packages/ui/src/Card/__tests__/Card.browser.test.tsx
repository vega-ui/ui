import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Card } from '../Card';

afterEach(cleanup);

const CARD_TEXT = 'Card';

const CardTest = (props: ComponentProps<typeof Card>) => {
  const { children, ...rest } = props;
  
  return (
    <Card data-testid='card' {...rest}>
      {children ?? CARD_TEXT}
    </Card>
  );
};

const getCard = (r: RenderResult) => r.getByTestId('card');
const getLink = (r: RenderResult) => r.getByTestId('link');

describe('Card', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<CardTest />);
    });
    
    it('renders root', async () => {
      await expect.element(getCard(r)).toBeInTheDocument();
    });
    
    it('renders children', async () => {
      await expect.element(r.getByText(CARD_TEXT)).toBeInTheDocument();
    });
    
    it('sets default data attributes', async () => {
      const card = getCard(r);
      await expect.element(card).toHaveAttribute('data-size', 'md');
      await expect.element(card).toHaveAttribute('data-appearance', 'outline');
    });
    
    it('applies size prop', async () => {
      r.rerender(<CardTest size='size' />);
      await expect.element(getCard(r)).toHaveAttribute('data-size', 'size');
    });
    
    it('applies appearance prop', async () => {
      r.rerender(<CardTest appearance='appearance' />);
      await expect.element(getCard(r)).toHaveAttribute('data-appearance', 'appearance');
    });
    
    it('forwards HTMLAttributes to root', async () => {
      r.rerender(<CardTest title='card-title' />);
      await expect.element(getCard(r)).toHaveAttribute('title', 'card-title');
    });
    
    it('merges className', async () => {
      r.rerender(<CardTest className='my-card' />);
      await expect.element(getCard(r)).toHaveClass('my-card');
    });
    
    it('renders as child element via Slot when asChild', async () => {
      r.rerender(
        <CardTest asChild>
          <a data-testid='link'>{CARD_TEXT}</a>
        </CardTest>,
      );
      
      const el = getLink(r);
      await expect.element(el).toBeInTheDocument();
      await expect.element(el).toHaveAttribute('data-size', 'md');
      await expect.element(el).toHaveAttribute('data-appearance', 'outline');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders with no children (empty)', async () => {
      const r = render(
        <Card data-testid='card' />
      );
      
      await expect.element(getCard(r)).toBeInTheDocument();
    });
    
    it('renders complex children', async () => {
      const r = render(
        <CardTest>
          <span>Inner</span>
        </CardTest>,
      );
      
      await expect.element(r.getByText('Inner')).toBeInTheDocument();
    });
    
    it('supports rendering multiple cards with same text', async () => {
      const r = render(
        <>
          <CardTest />
          <CardTest />
        </>,
      );
      
      expect(r.getAllByText(CARD_TEXT)).toHaveLength(2);
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CardTest />);
      });
      
      it('renders as article by default', async () => {
        expect(getCard(r).tagName.toLowerCase()).toBe('article');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CardTest aria-label='card' />);
      });
      
      it('passes aria props to root', async () => {
        await expect.element(getCard(r)).toHaveAttribute('aria-label', 'card');
      });
    });
  });
});