import { ComponentProps, FC, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Text } from '../Text';

afterEach(cleanup);

const TESTID = 'text';

const DEFAULT_CONTENT = 'Content';

const CLASS_A = 'class-a';
const CLASS_B = 'class-b';

const TextTest: FC<PropsWithChildren<ComponentProps<typeof Text>>> = ({ children, ...props }) => {
  return (
    <Text data-testid={TESTID} {...props}>
      {children ?? DEFAULT_CONTENT}
    </Text>
  );
};

const getText = (r: RenderResult) => r.getByTestId(TESTID);

describe('Text', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;

    beforeEach(() => {
      r = render(<TextTest />);
    });

    describe('asChild', () => {
      it('renders child element type (button)', async () => {
        r.rerender(
          <TextTest asChild>
            <button data-testid={TESTID} type='button'>
              Button
            </button>
          </TextTest>
        );

        const el = getText(r);
        expect(el.tagName.toLowerCase()).toBe('button');
      });

      it('merges className with child className', async () => {
        r.rerender(
          <TextTest asChild className={CLASS_A}>
            <a data-testid={TESTID} className={CLASS_B}>
              Link
            </a>
          </TextTest>
        );

        const el = getText(r);
        await expect.element(el).toHaveClass(CLASS_A);
        await expect.element(el).toHaveClass(CLASS_B);
      });

      it('child props override parent props where applicable (title)', async () => {
        r.rerender(
          <TextTest asChild title='from-text'>
            <a data-testid={TESTID} title='from-child'>
              Link
            </a>
          </TextTest>
        );

        const el = getText(r);
        await expect.element(el).toHaveAttribute('title', 'from-child');
      });
    });
  });
});
