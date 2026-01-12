import { ComponentProps, FC, MouseEvent } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Link } from '../Link';

afterEach(cleanup);

const TESTID_ROOT = 'link';
const TESTID_CHILD = 'child';

const HREF = 'https://example.com';
const LABEL = 'Go';

const LinkTest: FC<ComponentProps<typeof Link>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <Link data-testid={TESTID_ROOT} {...rest}>
      {children ?? LABEL}
    </Link>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);
const getChild = (r: RenderResult) => r.getByTestId(TESTID_CHILD);

describe('Link', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<LinkTest href={HREF} />);
      });
      
      it('renders', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('renders children', async () => {
        await expect.element(r.getByText(LABEL)).toBeInTheDocument();
      });
      
      it('is a link by role', async () => {
        await expect.element(getRoot(r)).toHaveRole('link');
      });
      
      it('passes href', async () => {
        await expect.element(getRoot(r)).toHaveAttribute('href', HREF);
      });
      
      it('merges className', async () => {
        const CLASSNAME = 'my-link';
        r.rerender(<LinkTest href={HREF} className={CLASSNAME} />);
        await expect.element(getRoot(r)).toHaveClass(CLASSNAME);
      });
      
      it('calls onClick and prevents navigation', async () => {
        const onClick = vi.fn((e: MouseEvent) => e.preventDefault());
        
        r.rerender(<LinkTest href={HREF} onClick={onClick} />);
        
        await userEvent.click(getRoot(r));
        
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
    
    describe('asChild', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(
          <LinkTest asChild href={HREF}>
            <button data-testid={TESTID_CHILD} type='button'>
              {LABEL}
            </button>
          </LinkTest>,
        );
      });
      
      it('renders only one interactive element (button)', async () => {
        await expect.element(getChild(r)).toHaveRole('button');
        await expect.element(getChild(r)).toBeInTheDocument();
      });
      
      it('does not render an anchor wrapper', async () => {
        expect(r.queryByRole('link')).toBeNull();
      });
      
      it('supports click on child', async () => {
        const onClick = vi.fn();
        
        r.rerender(
          <LinkTest asChild href={HREF} onClick={onClick}>
            <button data-testid={TESTID_CHILD} type='button'>
              {LABEL}
            </button>
          </LinkTest>,
        );
        
        await userEvent.click(getChild(r));
        
        expect(onClick).toHaveBeenCalledTimes(1);
      });
      
      it('merges className into child', async () => {
        const CLASSNAME = 'child-class';
        
        r.rerender(
          <LinkTest asChild href={HREF} className={CLASSNAME}>
            <button data-testid={TESTID_CHILD} type='button'>
              {LABEL}
            </button>
          </LinkTest>,
        );
        
        await expect.element(getChild(r)).toHaveClass(CLASSNAME);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without visible text and supports aria-label', async () => {
      const ARIA_LABEL = 'Open page';
      const r = render(
        <LinkTest href={HREF} aria-label={ARIA_LABEL}>
          {''}
        </LinkTest>,
      );
      
      await expect.element(getRoot(r)).toHaveRole('link');
      await expect.element(getRoot(r)).toHaveAttribute('aria-label', ARIA_LABEL);
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<LinkTest href={HREF} />);
      });
      
      it('has link role', async () => {
        await expect.element(getRoot(r)).toHaveRole('link');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<LinkTest href={HREF} aria-current='page' />);
      });
      
      it('supports aria-current', async () => {
        await expect.element(getRoot(r)).toHaveAttribute('aria-current', 'page');
      });
    });
    
    describe('keyboard', () => {
      it('can be activated with Enter without navigation', async () => {
        const onClick = vi.fn((e: MouseEvent) => e.preventDefault());
        const r = render(<LinkTest href={HREF} onClick={onClick} />);
        
        getRoot(r).focus()
        await expect.element(getRoot(r)).toHaveFocus();
        
        await userEvent.keyboard('{Enter}');
        
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});