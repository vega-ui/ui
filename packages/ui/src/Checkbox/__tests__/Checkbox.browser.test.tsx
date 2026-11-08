import { ComponentProps, CSSProperties, FC, FormEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import {
  CheckboxCheckedIcon,
  CheckboxInput,
  CheckboxIndicator,
  CheckboxIndeterminateIcon,
} from '../components';

afterEach(cleanup);

const TESTID_ROOT = 'checkbox';
const TESTID_INPUT = 'input';
const TESTID_INDICATOR = 'indicator';
const TESTID_CHECKED_ICON = 'checked-icon';
const TESTID_INDETERMINATE_ICON = 'indeterminate-icon';

const CHECKBOX_NAME = 'agree';
const CHECKBOX_VALUE = 'yes';

type CheckboxTestProps = Omit<ComponentProps<typeof Checkbox>, 'onChange'> &
  Pick<ComponentProps<typeof CheckboxInput>, 'name' | 'value' | 'checked' | 'defaultChecked' | 'indeterminate' | 'disabled' | 'onChange'>

const CheckboxTest: FC<CheckboxTestProps> = ({
 children,
 name = CHECKBOX_NAME,
 value = CHECKBOX_VALUE,
 checked,
 defaultChecked,
 indeterminate,
 disabled,
 onChange,
 ...props
}) => {
  return (
    <Checkbox data-testid={TESTID_ROOT} style={{ '--checkbox-size': '16px' } as CSSProperties} {...props}>
      {children ?? (
        <>
          <CheckboxInput
            data-testid={TESTID_INPUT}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            indeterminate={indeterminate}
            disabled={disabled}
            onChange={onChange}
          />
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
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getCheckedIcon = (r: RenderResult) => r.getByTestId(TESTID_CHECKED_ICON);
const getIndeterminateIcon = (r: RenderResult) => r.getByTestId(TESTID_INDETERMINATE_ICON);

describe('Checkbox', () => {
  describe('Critical User Paths', () => {
    it('toggles checked on click', async () => {
      const r = render(<CheckboxTest />);
      const input = getInput(r);
      
      expect(input).not.toBeChecked()
      
      await userEvent.click(getRoot(r));
      expect(input).toBeChecked()
      
      await userEvent.click(getRoot(r));
      expect(input).not.toBeChecked()
    });
  });
  
  describe('Edge Cases', () => {
    it('indeterminate sets the native input.indeterminate property', async () => {
      const r = render(<CheckboxTest indeterminate />);
      expect(getInput(r)).toBePartiallyChecked()
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
    describe('aria', () => {
      it('decorative icons are aria-hidden', async () => {
        const r = render(<CheckboxTest />);
        await expect.element(getCheckedIcon(r)).toHaveAttribute('aria-hidden');
        await expect.element(getIndeterminateIcon(r)).toHaveAttribute('aria-hidden');
      });
    });
  });
});
