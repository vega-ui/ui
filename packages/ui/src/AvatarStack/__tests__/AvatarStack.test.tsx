import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { AvatarStack } from '../AvatarStack';
import { AvatarStackItem } from '../components';
import { AvatarFallback, AvatarImage } from '../../Avatar';

afterEach(cleanup);

const INITIALS_1 = 'BC';
const INITIALS_2 = 'LA';
const INITIALS_3 = 'AK';

const AVATAR_ALT_1 = 'User avatar 1';
const AVATAR_ALT_2 = 'User avatar 2';

const AVATAR_SRC_1 = 'https://example.com/a1.png';
const AVATAR_SRC_2 = 'https://example.com/a2.png';

const DEFAULT_SIZE = 'md';
const DEFAULT_VARIANT = 'primary';

const AvatarStackTest = (props: ComponentProps<typeof AvatarStack>) => {
  const { children, ...rest } = props;
  
  return (
    <AvatarStack data-testid='stack' {...rest}>
      {children ?? (
        <>
          <AvatarStackItem data-testid='item-1'>
            <AvatarFallback data-testid='fallback-1'>{INITIALS_1}</AvatarFallback>
            <AvatarImage data-testid='image-1' alt={AVATAR_ALT_1} src={AVATAR_SRC_1} />
          </AvatarStackItem>
          
          <AvatarStackItem data-testid='item-2'>
            <AvatarFallback data-testid='fallback-2'>{INITIALS_2}</AvatarFallback>
            <AvatarImage data-testid='image-2' alt={AVATAR_ALT_2} src={AVATAR_SRC_2} />
          </AvatarStackItem>
          
          <AvatarStackItem data-testid='item-3'>
            <AvatarFallback data-testid='fallback-3'>{INITIALS_3}</AvatarFallback>
          </AvatarStackItem>
        </>
      )}
    </AvatarStack>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId('stack');
const getItem = (r: RenderResult, index: 1 | 2 | 3) => r.getByTestId(`item-${index}`) as HTMLDivElement;
const getItems = (r: RenderResult) => [
  getItem(r, 1),
  getItem(r, 2),
  getItem(r, 3)
];

const getFallback = (r: RenderResult, index: 1 | 2 | 3) => r.getByTestId(`fallback-${index}`);
const getImage = (r: RenderResult, index: 1 | 2) => r.getByTestId(`image-${index}`) as HTMLImageElement;

describe('AvatarStack', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<AvatarStackTest />);
    });
    
    it('renders root and items', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
      
      const items = getItems(r);
      expect(items.length).toBeGreaterThan(0);
      
      await expect.element(getFallback(r, 1)).toHaveTextContent(INITIALS_1);
      await expect.element(getFallback(r, 2)).toHaveTextContent(INITIALS_2);
      await expect.element(getFallback(r, 3)).toHaveTextContent(INITIALS_3);
    });
    
    it('applies default group size/variant to stack items', async () => {
      const items = getItems(r);
      expect(items.length).toBeGreaterThan(0);
      
      for (const el of items) {
        await expect.element(el).toHaveAttribute('data-size', DEFAULT_SIZE);
        await expect.element(el).toHaveAttribute('data-variant', DEFAULT_VARIANT);
      }
    });
    
    it('propagates size to all items', async () => {
      const SIZE = 'size';
      
      r.rerender(<AvatarStackTest size={SIZE} />);
      
      const items = getItems(r);
      expect(items.length).toBeGreaterThan(0);
      
      for (const el of items) {
        await expect.element(el).toHaveAttribute('data-size', SIZE);
      }
    });
    
    it('propagates variant to all items', async () => {
      const VARIANT = 'variant';
      
      r.rerender(<AvatarStackTest variant={VARIANT} />);
      
      const items = getItems(r);
      expect(items.length).toBeGreaterThan(0);
      
      for (const el of items) {
        await expect.element(el).toHaveAttribute('data-variant', VARIANT);
      }
    });
    
    it('forwards HTMLAttributes to root', async () => {
      const TITLE = 'stack';
      
      r.rerender(<AvatarStackTest title={TITLE} />);
      
      await expect.element(getRoot(r)).toHaveAttribute('title', TITLE);
    });
  });
  
  describe('Error Handling', () => {
    it('renders AvatarStack with no children (no crash)', async () => {
      const r = render(<AvatarStack data-testid='stack' />);
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('renders mixed content (fallback-only and fallback+image)', async () => {
      const ALT = 'User avatar';
      const SRC = 'https://example.com/a.png';
      
      const r = render(
        <AvatarStack data-testid='stack'>
          <AvatarStackItem data-testid='item-a'>
            <AvatarFallback data-testid='fallback-a'>{INITIALS_1}</AvatarFallback>
          </AvatarStackItem>
          
          <AvatarStackItem data-testid='item-b'>
            <AvatarFallback data-testid='fallback-b'>{INITIALS_2}</AvatarFallback>
            <AvatarImage data-testid='image-b' alt={ALT} src={SRC} />
          </AvatarStackItem>
        </AvatarStack>,
      );
      
      const getFallbackA = () => r.getByTestId('fallback-a');
      const getFallbackB = () => r.getByTestId('fallback-b');
      const getImageB = () => r.getByTestId('image-b') as HTMLImageElement;
      
      await expect.element(getFallbackA()).toHaveTextContent(INITIALS_1);
      await expect.element(getFallbackB()).toHaveTextContent(INITIALS_2);
      await expect.element(getImageB()).toHaveAttribute('alt', ALT);
    });
    
    it('supports many items', async () => {
      const COUNT = 25;
      
      const r = render(
        <AvatarStack data-testid='stack'>
          {Array.from({ length: COUNT }, (_, i) => (
            <AvatarStackItem key={i} data-testid={`item-${i}`}>
              <AvatarFallback data-testid={`fallback-${i}`}>
                {String(i).padStart(2, '0')}
              </AvatarFallback>
            </AvatarStackItem>
          ))}
        </AvatarStack>,
      );
      
      const getItemByIndex = (index: number) => r.getByTestId(`item-${index}`);
      
      for (let i = 0; i < COUNT; i++) {
        await expect.element(getItemByIndex(i)).toBeInTheDocument();
      }
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('does not add unexpected semantics: root is a div', async () => {
        const r = render(<AvatarStackTest />);
        expect(getRoot(r).tagName.toLowerCase()).toBe('div');
      });
    });
    
    describe('aria', () => {
      it('images keep provided alt attributes', async () => {
        const r = render(<AvatarStackTest />);
        await expect.element(getImage(r, 1)).toHaveAttribute('alt', AVATAR_ALT_1);
        await expect.element(getImage(r, 2)).toHaveAttribute('alt', AVATAR_ALT_2);
      });
    });
  });
});