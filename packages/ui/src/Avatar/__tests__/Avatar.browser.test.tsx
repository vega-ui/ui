import { ComponentProps } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';

import { Avatar } from '../Avatar';
import { AvatarFallback, AvatarImage } from '../components';
import { ImageStatus } from '@vega-ui/widgets/avatar';

afterEach(cleanup);

const AVATAR_INITIALS = 'BC';
const AVATAR_ALT = 'User avatar';
const LOADING_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const BROKEN_SRC = 'data:image/png;base64,broken';
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

const getImage = (r: RenderResult) => r.getByTestId('image') as HTMLImageElement;

describe('Avatar', () => {
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

    it('keeps showing fallbackSrc once it loads', async () => {
      r.rerender(
        <AvatarTest>
          <AvatarFallback data-testid='fallback'>{AVATAR_INITIALS}</AvatarFallback>
          <AvatarImage data-testid='image' alt={AVATAR_ALT} src={BROKEN_SRC} fallbackSrc={LOADING_SRC} />
        </AvatarTest>,
      );

      await expect.element(getImage(r)).toHaveAttribute('data-status', ImageStatus.LOADED);
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(getImage(r).getAttribute('src')).toBe(LOADING_SRC);
      expect(getImage(r).dataset.status).toBe(ImageStatus.LOADED);
    });

    it('tries a new src again after a failed one', async () => {
      fireEvent.error(getImage(r));
      await expect.element(getImage(r)).toHaveAttribute('src', AVATAR_FALLBACK_SRC);

      r.rerender(
        <AvatarTest>
          <AvatarFallback data-testid='fallback'>{AVATAR_INITIALS}</AvatarFallback>
          <AvatarImage data-testid='image' alt={AVATAR_ALT} src={LOADING_SRC} fallbackSrc={AVATAR_FALLBACK_SRC} />
        </AvatarTest>,
      );

      await expect.element(getImage(r)).toHaveAttribute('src', LOADING_SRC);
    });

    it('keeps calling onLoad and onError of the image', async () => {
      const onLoad = vi.fn();
      const onError = vi.fn();
      r.rerender(
        <AvatarTest>
          <AvatarImage data-testid='image' src={AVATAR_SRC} onLoad={onLoad} onError={onError} />
        </AvatarTest>,
      );

      fireEvent.error(getImage(r));
      fireEvent.load(getImage(r));

      expect(onError).toHaveBeenCalledOnce();
      expect(onLoad).toHaveBeenCalledOnce();
      await expect.element(getImage(r)).toHaveAttribute('data-status', ImageStatus.LOADED);
    });
  });
  
  describe('Edge Cases', () => {
    it('shows a server-rendered image that loaded before hydration, or its fallback when it failed', async () => {
      const tree = (
        <>
          <AvatarImage data-testid='loaded' alt={AVATAR_ALT} src={LOADING_SRC} />
          <AvatarImage data-testid='broken' alt={AVATAR_ALT} src={BROKEN_SRC} fallbackSrc={LOADING_SRC} />
        </>
      );
      const container = document.body.appendChild(document.createElement('div'));
      container.innerHTML = renderToString(tree);
      const images = [...container.querySelectorAll('img')];
      await expect.poll(() => images.every((image) => image.complete)).toBe(true);

      const r = render(tree, { container, hydrate: true });

      await expect.element(r.getByTestId('loaded')).toHaveAttribute('data-status', ImageStatus.LOADED);
      await expect.element(r.getByTestId('broken')).toHaveAttribute('src', LOADING_SRC);
    });
  });
});
