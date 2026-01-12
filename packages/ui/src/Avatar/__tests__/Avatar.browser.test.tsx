import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';

import { Avatar } from '../Avatar';
import { AvatarFallback, AvatarIcon, AvatarImage } from '../components';
import { ImageStatus } from '../components';
import { X } from '@vega-ui/icons';

afterEach(cleanup);

const AVATAR_INITIALS = 'BC';
const AVATAR_ALT = 'User avatar';
const AVATAR_SRC = 'https://example.com/avatar.png';
const AVATAR_FALLBACK_SRC = 'https://example.com/fallback.png';

const AvatarTest = (props: ComponentProps<typeof Avatar>) => {
  const { children, ...rest } = props;
  
  return (
    <Avatar data-testid='avatar' {...rest}>
      {children ?? (
        <>
          <AvatarFallback data-testid='fallback'>{AVATAR_INITIALS}</AvatarFallback>
          <AvatarImage data-testid='image' alt={AVATAR_ALT} src={AVATAR_SRC} />
        </>
      )}
    </Avatar>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId('avatar');
const getFallback = (r: RenderResult) => r.getByTestId('fallback');
const queryFallback = (r: RenderResult) => r.queryByTestId('fallback');

const getImage = (r: RenderResult) => r.getByTestId('image') as HTMLImageElement;
const queryImage = (r: RenderResult) => r.queryByTestId('image') as HTMLImageElement | null;

const getIcon = (r: RenderResult) => r.getByTestId('icon');

describe('Avatar', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<AvatarTest />);
    });
    
    it('renders root and default children (fallback + image)', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getFallback(r)).toBeInTheDocument();
      await expect.element(getImage(r)).toBeInTheDocument();
    });
    
    it('applies default size and variant', async () => {
      await expect.element(getRoot(r)).toHaveAttribute('data-size', 'md');
      await expect.element(getRoot(r)).toHaveAttribute('data-variant', 'primary');
    });
    
    it('supports size', async () => {
      const size = 'size';
      r.rerender(<AvatarTest size={size} />);
      
      await expect.element(getRoot(r)).toHaveAttribute('data-size', size);
    });
    
    it('supports variant', async () => {
      const variant = 'variant';
      r.rerender(<AvatarTest variant={variant} />);
      
      await expect.element(getRoot(r)).toHaveAttribute('data-variant', variant);
    });
    
    it('renders icon-only usage', async () => {
      r.rerender(
        <AvatarTest>
          <AvatarIcon data-testid='icon'>
            <X />
          </AvatarIcon>
        </AvatarTest>,
      );
      
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getIcon(r)).toBeInTheDocument();
      
      await expect.element(queryFallback(r)).not.toBeInTheDocument();
      await expect.element(queryImage(r)).not.toBeInTheDocument();
    });
    
    it('forwards HTMLAttributes to root', async () => {
      const title = 'avatar';
      r.rerender(<AvatarTest title={title} />);
      
      await expect.element(getRoot(r)).toHaveAttribute('title', title);
    });
  });
  
  describe('Error handling', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(
        <AvatarTest>
          <AvatarFallback data-testid='fallback'>{AVATAR_INITIALS}</AvatarFallback>
          <AvatarImage
            data-testid='image'
            alt={AVATAR_ALT}
            src={AVATAR_SRC}
            fallbackSrc={AVATAR_FALLBACK_SRC}
          />
        </AvatarTest>,
      );
    })
    
    it('AvatarImage: switches to fallbackSrc on error', async () => {
      const img = getImage(r);
      
      await expect.element(img).toHaveAttribute('data-status', ImageStatus.INITIAL);
      await expect.element(img).toHaveAttribute('src', AVATAR_SRC);
      
      fireEvent.error(img);
      
      await expect.element(img).toHaveAttribute('data-status', ImageStatus.ERROR);
      await expect.element(img).toHaveAttribute('src', AVATAR_FALLBACK_SRC);
    });
    
    it('AvatarImage: error without fallbackSrc keeps src unchanged', async () => {
      r.rerender(
        <AvatarTest>
          <AvatarImage
            data-testid='image'
            src={AVATAR_SRC}
          />
        </AvatarTest>
      )
      const img = getImage(r);
      
      fireEvent.error(img);
      
      await expect.element(img).toHaveAttribute('data-status', ImageStatus.ERROR);
      await expect.element(img).toHaveAttribute('src', AVATAR_SRC);
    });
  });
  
  describe('Edge cases', () => {
    it('renders with empty children', async () => {
      const r = render(<AvatarTest>{null}</AvatarTest>);
      
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
    
    it('fallback text is rendered as-is', async () => {
      const text = 'JD';
      const r = render(
        <AvatarTest>
          <AvatarFallback data-testid='fallback'>{text}</AvatarFallback>
        </AvatarTest>
      );
      
      await expect.element(getFallback(r)).toHaveTextContent(text);
    });
    
    it('same text in multiple fallbacks: uses *AllBy* queries', async () => {
      const text = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
      const r = render(
        <AvatarTest>
          <AvatarFallback>{text}</AvatarFallback>
          <AvatarFallback>{text}</AvatarFallback>
        </AvatarTest>
      )
      
      const all = r.getAllByText(text);
      await expect.element(all[0]).toBeInTheDocument();
      await expect.element(all[1]).toBeInTheDocument();
    });
    
    it('AvatarImage: load sets data-status=loaded', async () => {
      const r = render(<AvatarTest />)
      
      const img = getImage(r);
      await expect.element(img).toHaveAttribute('data-status', ImageStatus.INITIAL);
      
      fireEvent.load(img);
      
      await expect.element(img).toHaveAttribute('data-status', ImageStatus.LOADED);
    });
  });
  
  describe('Accessibility', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<AvatarTest />);
    });
    
    describe('aria', () => {
      it('AvatarImage: passes alt through to img', async () => {
        const alt = 'Accessible avatar';
        
        r.rerender(
          <AvatarTest>
            <AvatarFallback data-testid='fallback'>{AVATAR_INITIALS}</AvatarFallback>
            <AvatarImage data-testid='image' alt={alt} src={AVATAR_SRC} />
          </AvatarTest>,
        );
        
        await expect.element(getImage(r)).toHaveAttribute('alt', alt);
      });
    });
    
    describe('roles', () => {
      it('AvatarImage: has role img', async () => {
        const img = getImage(r);
        await expect.element(img).toHaveRole('img');
      });
    });
  });
});