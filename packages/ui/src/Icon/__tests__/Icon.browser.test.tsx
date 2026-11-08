import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Icon } from '../Icon';

afterEach(cleanup);

const TESTID_ICON = 'icon';
const DEFAULT_SIZE = 'md';

const IconTest: FC<ComponentProps<typeof Icon>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <Icon {...rest}>
      {children ?? (
        <svg data-testid={TESTID_ICON} viewBox='0 0 24 24'>
          <path d='M0 0h24v24H0z' />
        </svg>
      )}
    </Icon>
  );
};

const getIcon = (r: RenderResult) => r.getByTestId(TESTID_ICON);

describe('Icon', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<IconTest size={DEFAULT_SIZE} />);
    });
    
    it('applies data-size when width and height are not provided', async () => {
      await expect.element(getIcon(r)).toHaveAttribute('data-size', DEFAULT_SIZE);
    });
    
    it('does not apply data-size when width is provided', async () => {
      r.rerender(<IconTest size={DEFAULT_SIZE} width={32} />);
      await expect.element(getIcon(r)).not.toHaveAttribute('data-size');
    });
    
    it('does not apply data-size when height is provided', async () => {
      r.rerender(<IconTest size={DEFAULT_SIZE} height={32} />);
      await expect.element(getIcon(r)).not.toHaveAttribute('data-size');
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      it('is hidden from screen readers', async () => {
        const r = render(<IconTest />);
        await expect.element(getIcon(r)).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});