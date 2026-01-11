import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Option } from '../Option';

afterEach(cleanup);

const TESTID_OPTION = 'option';

const VALUE = 'value';
const LABEL = 'Option label';

const SIZE_MD = 'md';
const SIZE_SM = 'sm';

const OptionTest: FC<Partial<ComponentProps<typeof Option<string>>>> = ({ children, value = VALUE, ...props }) => {
  return (
    <Option
      data-testid={TESTID_OPTION}
      value={value}
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
      await expect.element(getOption(r)).toBeDisabled();
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without children', async () => {
      const r = render(
        <Option data-testid={TESTID_OPTION} value={VALUE} />
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
      it('is not focusable by default', async () => {
        const r = render(<OptionTest />);
        await expect.element(getOption(r)).toHaveAttribute('tabindex', '-1');
      });
      
      it('can be focusable', async () => {
        const r = render(<OptionTest focusable />);
        await expect.element(getOption(r)).toHaveAttribute('tabindex', '0');
      });
    });
    
    describe('keyboard', () => {
      it('receives focus via keyboard when focusable', async () => {
        const r = render(<OptionTest focusable />);
        await userEvent.tab();
        await expect.element(getOption(r)).toHaveFocus();
      });
    });
  });
});