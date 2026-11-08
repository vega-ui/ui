import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';

import { Avatar } from '../Avatar';
import { AvatarFallback, AvatarImage } from '../components';
import { ImageStatus } from '../components';

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
  
  describe('Edge Cases', () => {
    it('AvatarImage: load sets data-status=loaded', async () => {
      const r = render(<AvatarTest />)

      const img = getImage(r);
      await expect.element(img).toHaveAttribute('data-status', ImageStatus.INITIAL);

      fireEvent.load(img);

      await expect.element(img).toHaveAttribute('data-status', ImageStatus.LOADED);
    });
  });
});
