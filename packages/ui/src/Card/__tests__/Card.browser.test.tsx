import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { Card } from '../Card';

afterEach(cleanup);

const CARD_TEXT = 'Card';

describe('Card', () => {
  describe('Critical User Paths', () => {
    it('renders as child element via Slot when asChild', async () => {
      const r = render(
        <Card asChild>
          <a data-testid='link'>{CARD_TEXT}</a>
        </Card>,
      );

      const el = r.getByTestId('link');
      await expect.element(el).toBeInTheDocument();
      await expect.element(el).toHaveAttribute('data-size', 'md');
      await expect.element(el).toHaveAttribute('data-appearance', 'outline');
    });
  });
});
