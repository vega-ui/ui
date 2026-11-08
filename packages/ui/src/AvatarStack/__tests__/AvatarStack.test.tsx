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

const getItem = (r: RenderResult, index: 1 | 2 | 3) => r.getByTestId(`item-${index}`) as HTMLDivElement;
const getItems = (r: RenderResult) => [
  getItem(r, 1),
  getItem(r, 2),
  getItem(r, 3)
];

describe('AvatarStack', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<AvatarStackTest />);
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
  });
});
