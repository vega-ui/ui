import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Option } from '../Option';

afterEach(cleanup);

const TESTID_OPTION = 'option';

const LABEL = 'Option label';

const OptionTest: FC<ComponentProps<typeof Option>> = ({ children, ...props }) => {
  return (
    <Option
      data-testid={TESTID_OPTION}
      {...props}
    >
      {children ?? LABEL}
    </Option>
  );
};

const getOption = (r: RenderResult) => r.getByTestId(TESTID_OPTION);

describe('Option', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;

    beforeEach(() => {
      r = render(<OptionTest />);
    });

    it('handles click', async () => {
      const onClick = vi.fn();
      r.rerender(<OptionTest onClick={onClick} />);

      await userEvent.click(getOption(r));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', async () => {
      r.rerender(<OptionTest disabled />);
      await expect.element(getOption(r)).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const disabled = render(<Option disabled onClick={onClick}>{LABEL}</Option>);

      disabled.getByRole('option', { name: LABEL, hidden: true }).click();

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    describe('aria', () => {
      it('sets aria-selected when selected', async () => {
        const r = render(<OptionTest selected />);
        await expect.element(getOption(r)).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('roles', () => {
      it('has correct role', async () => {
        const r = render(<OptionTest />);
        await expect.element(getOption(r)).toHaveRole('option');
      });
    });

    describe('focus', () => {
      it('never takes focus itself', async () => {
        const r = render(<OptionTest />);
        expect(getOption(r).hasAttribute('tabindex')).toBe(false);
      });
    });
  });
});
