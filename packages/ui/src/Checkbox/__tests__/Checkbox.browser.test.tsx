import { ComponentProps, CSSProperties, FC, FormEvent } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import {
  CheckboxCheckedIcon,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxIndeterminateIcon,
} from '../components';

afterEach(cleanup);

const TESTID_ROOT = 'checkbox';
const TESTID_INPUT = 'hidden-input';
const TESTID_INDICATOR = 'indicator';
const TESTID_CHECKED_ICON = 'checked-icon';
const TESTID_INDETERMINATE_ICON = 'indeterminate-icon';

const CHECKBOX_NAME = 'agree';
const CHECKBOX_VALUE = 'yes';

const SIZE = 'size';
const VARIANT = 'variant';
const TITLE = 'checkbox-title';
const ARIA_LABEL = 'Agree';

const CheckboxTest: FC<ComponentProps<typeof Checkbox> & { name?: string; value?: string }> = ({
 children,
 name = CHECKBOX_NAME,
 value = CHECKBOX_VALUE,
 ...props
}) => {
  return (
    <Checkbox data-testid={TESTID_ROOT} style={{ '--checkbox-size': '16px' } as CSSProperties} {...props}>
      {children ?? (
        <>
          <CheckboxHiddenInput data-testid={TESTID_INPUT} name={name} value={value} />
          <CheckboxIndicator data-testid={TESTID_INDICATOR}>
            <CheckboxCheckedIcon data-testid={TESTID_CHECKED_ICON} />
            <CheckboxIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON} />
          </CheckboxIndicator>
        </>
      )}
    </Checkbox>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);
const getIndicator = (r: RenderResult) => r.getByTestId(TESTID_INDICATOR);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getCheckedIcon = (r: RenderResult) => r.getByTestId(TESTID_CHECKED_ICON);
const getIndeterminateIcon = (r: RenderResult) => r.getByTestId(TESTID_INDETERMINATE_ICON);

describe('Checkbox', () => {
  describe('Critical User Paths', () => {
    describe('default (uncontrolled)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxTest />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('renders hidden input', async () => {
        await expect.element(getInput(r)).toBeInTheDocument();
      });
      
      it('renders indicator', async () => {
        await expect.element(getIndicator(r)).toBeInTheDocument();
      });
      
      it('renders state icons', async () => {
        await expect.element(getCheckedIcon(r)).toBeInTheDocument();
        await expect.element(getIndeterminateIcon(r)).toBeInTheDocument();
      });
      
      it('sets default data attributes on root', async () => {
        await expect.element(getRoot(r)).toHaveAttribute('data-size', 'md');
        await expect.element(getRoot(r)).toHaveAttribute('data-variant', 'primary');
      });
      
      it('toggles checked on click', async () => {
        const input = getInput(r);
        
        expect(input).not.toBeChecked()
        
        await userEvent.click(getRoot(r));
        expect(input).toBeChecked()
        
        await userEvent.click(getRoot(r));
        expect(input).not.toBeChecked()
      });
    });
    
    describe('props are applied', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxTest />);
      });
      
      it('applies size prop', async () => {
        r.rerender(<CheckboxTest size={SIZE} />);
        await expect.element(getRoot(r)).toHaveAttribute('data-size', SIZE);
      });
      
      it('applies variant prop', async () => {
        r.rerender(<CheckboxTest variant={VARIANT} />);
        await expect.element(getRoot(r)).toHaveAttribute('data-variant', VARIANT);
      });
      
      it('forwards HTMLAttributes to root', async () => {
        r.rerender(<CheckboxTest title={TITLE} aria-label={ARIA_LABEL} />);
        await expect.element(getRoot(r)).toHaveAttribute('title', TITLE);
        await expect.element(getRoot(r)).toHaveAttribute('aria-label', ARIA_LABEL);
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      let onChangeChecked: Mock;
      
      beforeEach(() => {
        onChangeChecked = vi.fn();
        r = render(<CheckboxTest checked onChangeChecked={onChangeChecked} />);
      });
      
      it('renders checked from prop', async () => {
        expect(getInput(r)).toBeChecked()
      });
      
      it('click calls onChangeChecked with next value', async () => {
        await userEvent.click(getRoot(r));
        expect(onChangeChecked).toHaveBeenLastCalledWith(false);
      });
      
      it('does not change UI without prop update', async () => {
        await userEvent.click(getRoot(r));
        expect(getInput(r)).toBeChecked()
      });
      
      it('updates UI when prop changes', async () => {
        r.rerender(<CheckboxTest checked={false} onChangeChecked={onChangeChecked} />);
        expect(getInput(r)).not.toBeChecked()
      });
    });
    
    describe('custom icons', () => {
      it('renders custom checked svg via CheckboxCheckedIcon children', async () => {
        const CUSTOM_CHECKED = 'custom-checked';
        
        const r = render(
          <CheckboxTest>
            <CheckboxHiddenInput data-testid={TESTID_INPUT} name={CHECKBOX_NAME} value={CHECKBOX_VALUE} />
            <CheckboxIndicator data-testid={TESTID_INDICATOR}>
              <CheckboxCheckedIcon data-testid={TESTID_CHECKED_ICON}>
                <svg data-testid={CUSTOM_CHECKED} />
              </CheckboxCheckedIcon>
              <CheckboxIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON} />
            </CheckboxIndicator>
          </CheckboxTest>,
        );
        
        await expect.element(r.getByTestId(CUSTOM_CHECKED)).toBeInTheDocument();
      });
      
      it('renders custom indeterminate svg via CheckboxIndeterminateIcon children', async () => {
        const CUSTOM_INDETERMINATE = 'custom-indeterminate';
        
        const r = render(
          <CheckboxTest>
            <CheckboxHiddenInput data-testid={TESTID_INPUT} name={CHECKBOX_NAME} value={CHECKBOX_VALUE} />
            <CheckboxIndicator data-testid={TESTID_INDICATOR}>
              <CheckboxCheckedIcon data-testid={TESTID_CHECKED_ICON} />
              <CheckboxIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON}>
                <svg data-testid={CUSTOM_INDETERMINATE} />
              </CheckboxIndeterminateIcon>
            </CheckboxIndicator>
          </CheckboxTest>,
        );
        
        await expect.element(r.getByTestId(CUSTOM_INDETERMINATE)).toBeInTheDocument();
      });
    });
  });
  
  describe('Error Handling', () => {
    it('renders with arbitrary children structure (does not crash)', async () => {
      const ANYTHING = 'anything';
      
      const r = render(
        <Checkbox data-testid={TESTID_ROOT}>
          <span data-testid={ANYTHING}>Anything</span>
        </Checkbox>,
      );
      
      await expect.element(r.getByTestId(TESTID_ROOT)).toBeInTheDocument();
      await expect.element(r.getByTestId(ANYTHING)).toBeInTheDocument();
    });
    
    it('disabled: disables input', async () => {
      const r = render(<CheckboxTest disabled />);
      expect(getInput(r)).toBeDisabled()
    });
  });
  
  describe('Edge Cases', () => {
    it('indeterminate sets the native input.indeterminate property', async () => {
      const r = render(<CheckboxTest indeterminate />);
      expect(getInput(r)).toBePartiallyChecked()
    });
    
    it('supports rendering multiple checkboxes without query collisions (scoped by testid)', async () => {
      const r = render(
        <>
          <CheckboxTest />
          <CheckboxTest />
        </>,
      );
      
      const all = r.getAllByTestId(TESTID_ROOT);
      expect(all).toHaveLength(2);
    });
    
    it('form integration: submits value when checked', async () => {
      const onSubmit = vi.fn((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        expect(formData.get(CHECKBOX_NAME)).toBe(CHECKBOX_VALUE);
      });
      
      const r = render(
        <form onSubmit={onSubmit}>
          <CheckboxTest name={CHECKBOX_NAME} value={CHECKBOX_VALUE} />
          <button type='submit'>Submit</button>
        </form>,
      );
      
      await userEvent.click(getRoot(r));
      await userEvent.click(r.getByRole('button', { name: 'Submit' }));
      
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    
    it('form integration: does not submit value when unchecked', async () => {
      const onSubmit = vi.fn((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        expect(formData.get(CHECKBOX_NAME)).toBeNull();
      });
      
      const r = render(
        <form onSubmit={onSubmit}>
          <CheckboxTest name={CHECKBOX_NAME} value={CHECKBOX_VALUE} />
          <button type='submit'>Submit</button>
        </form>,
      );
      
      await userEvent.click(r.getByRole('button', { name: 'Submit' }));
      
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxTest />);
      });
      
      it('hidden input has checkbox role', async () => {
        await expect.element(getInput(r)).toHaveRole('checkbox');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxTest />);
      });
      
      it('decorative icons are aria-hidden', async () => {
        await expect.element(getCheckedIcon(r)).toHaveAttribute('aria-hidden');
        await expect.element(getIndeterminateIcon(r)).toHaveAttribute('aria-hidden');
      });
    });
    
    describe('focus', () => {
      it('hidden input can be focused programmatically', async () => {
        const r = render(<CheckboxTest />);
        const input = getInput(r);
        
        input.focus();
        await expect.element(input).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('Space toggles when input is focused', async () => {
        const r = render(<CheckboxTest />);
        const input = getInput(r);
        
        input.focus();
        await expect.element(input).toHaveFocus();
        
        expect(input.checked).toBe(false);
        await userEvent.keyboard(' ');
        expect(input).toBeChecked();
      });
    });
  });
});