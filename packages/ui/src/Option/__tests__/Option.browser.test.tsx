import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Option } from '../Option';

afterEach(cleanup);

const TESTID_OPTION = 'option';

const LABEL = 'Option label';

const SIZE_MD = 'md';
const SIZE_SM = 'sm';

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
    
    it('renders', async () => {
      await expect.element(getOption(r)).toBeInTheDocument();
    });
    
    it('renders children', async () => {
      await expect.element(r.getByText(LABEL)).toBeInTheDocument();
    });
    
    it('applies default size', async () => {
      await expect.element(getOption(r)).toHaveAttribute('data-size', SIZE_MD);
    });
    
    it('supports size prop', async () => {
      r.rerender(<OptionTest size={SIZE_SM} />);
      await expect.element(getOption(r)).toHaveAttribute('data-size', SIZE_SM);
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

    it('does not submit the surrounding form on click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <OptionTest />
        </form>
      );

      await userEvent.click(getOption(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('renders without children', async () => {
      const r = render(
        <Option data-testid={TESTID_OPTION} />
      );
      
      await expect.element(getOption(r)).toBeInTheDocument();
    });
    
    it('sets aria-selected=false when not selected', async () => {
      const r = render(<OptionTest selected={false} />);
      await expect.element(getOption(r)).toHaveAttribute('aria-selected', 'false');
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

      it('marks the active option', async () => {
        const r = render(<OptionTest active />);
        await expect.element(getOption(r)).toHaveAttribute('data-active', 'true');
      });
    });
  });
});
