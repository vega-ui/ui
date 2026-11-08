import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { VisuallyHidden } from '../VisuallyHidden';

afterEach(cleanup);

const CHILD_TESTID = 'child';

describe('VisuallyHidden', () => {
  describe('Accessibility', () => {
    describe('focus', () => {
      it('can receive focus when focusable element is rendered via asChild', async () => {
        const r = render(
          <VisuallyHidden asChild>
            <button data-testid={CHILD_TESTID}>Hidden button</button>
          </VisuallyHidden>
        );

        const button = r.getByTestId(CHILD_TESTID);

        button.focus();
        await expect.element(button).toHaveFocus();
      });
    });
  });
});
