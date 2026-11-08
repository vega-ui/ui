import { ComponentProps, FC } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
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
    it('exposes its vertical orientation', async () => {
      const r = render(<SeparatorTest orientation='vertical' />);
      await expect.element(getSeparator(r)).toHaveAttribute('aria-orientation', 'vertical');
    });
  });
});
