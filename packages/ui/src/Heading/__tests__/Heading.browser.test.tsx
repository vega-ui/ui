import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Heading } from '../Heading';

afterEach(cleanup);

const TESTID = 'heading';
const TEXT = 'Heading title';

const HeadingTest = (props?: Partial<ComponentProps<typeof Heading>>) => {
  return (
    <Heading data-testid={TESTID} {...props}>
      {TEXT}
    </Heading>
  );
};

const getHeading = (r: RenderResult) => r.getByTestId(TESTID);

describe('Heading', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;

    beforeEach(() => {
      r = render(<HeadingTest />);
    });

    it('renders with default tag', async () => {
      expect(getHeading(r).tagName.toLowerCase()).toBe('h1');
    });

    it('supports as prop (semantic tag)', async () => {
      r.rerender(<HeadingTest as='h2' />);
      expect(getHeading(r).tagName.toLowerCase()).toBe('h2');

      r.rerender(<HeadingTest as='h6' />);
      expect(getHeading(r).tagName.toLowerCase()).toBe('h6');
    });
  });
});
