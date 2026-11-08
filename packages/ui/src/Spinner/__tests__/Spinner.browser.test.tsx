import { ComponentProps, FC } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Spinner } from '../Spinner';

afterEach(cleanup);

const TESTID = 'spinner';

const SpinnerTest: FC<ComponentProps<typeof Spinner>> = (props) => (
  <Spinner data-testid={TESTID} {...props} />
);

const getSpinner = (r: RenderResult) => r.getByTestId(TESTID);

describe('Spinner', () => {
  describe('Accessibility', () => {
    describe('roles', () => {
      it('is an indeterminate progressbar like <progress> without a value', async () => {
        const r = render(<SpinnerTest />);
        const spinner = getSpinner(r);

        await expect.element(spinner).toHaveRole('progressbar');
        await expect.element(spinner).not.toHaveAttribute('aria-valuenow');
      });
    });
  });
});
