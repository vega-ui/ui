import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { Link } from '../Link';

afterEach(cleanup);

const HREF = 'https://example.com';
const LABEL = 'Go';

describe('Link', () => {
  describe('Critical User Paths', () => {
    describe('asChild', () => {
      it('does not render an anchor wrapper', async () => {
        const r = render(
          <Link asChild href={HREF}>
            <button type='button'>{LABEL}</button>
          </Link>,
        );

        expect(r.queryByRole('link')).toBeNull();
      });
    });
  });
});
