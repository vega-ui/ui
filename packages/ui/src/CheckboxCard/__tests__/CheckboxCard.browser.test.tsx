import { ComponentProps, CSSProperties, FC, FormEvent, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { CheckboxCard } from '../CheckboxCard';
import {
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlInput,
  CheckboxCardControlIndicator,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardDescription,
  CheckboxCardTitle,
} from '../components';

afterEach(cleanup);

const TESTID_CARD = 'card';
const TESTID_CONTENT = 'content';
const TESTID_TITLE = 'title';
const TESTID_DESCRIPTION = 'description';
const TESTID_CHECKBOX = 'checkbox';
const TESTID_INPUT = 'input';
const TESTID_INDICATOR = 'indicator';
const TESTID_CHECKED_ICON = 'checked-icon';
const TESTID_INDETERMINATE_ICON = 'indeterminate-icon';

const CHECKBOX_NAME = 'agree';
const CHECKBOX_VALUE = 'yes';

type CheckboxCardTestProps = PropsWithChildren<Omit<ComponentProps<typeof CheckboxCard>, 'onChange'>> &
  Pick<ComponentProps<typeof CheckboxCardControlInput>, 'checked' | 'disabled' | 'onChange'>

const CheckboxCardTest: FC<CheckboxCardTestProps> = (props) => {
  const { children, checked, disabled, onChange, ...rest } = props;
  
  return (
    <CheckboxCard data-testid={TESTID_CARD} {...rest}>
      {children ?? (
        <>
          <CheckboxCardContent data-testid={TESTID_CONTENT}>
            <CheckboxCardTitle data-testid={TESTID_TITLE}>Title</CheckboxCardTitle>
            <CheckboxCardDescription data-testid={TESTID_DESCRIPTION}>
              Description
            </CheckboxCardDescription>
          </CheckboxCardContent>
          
          <CheckboxCardControl
            style={{ '--checkbox-size': '16px' } as CSSProperties}
            data-testid={TESTID_CHECKBOX}
          >
            <CheckboxCardControlInput
              data-testid={TESTID_INPUT}
              name={CHECKBOX_NAME}
              value={CHECKBOX_VALUE}
              checked={checked}
              disabled={disabled}
              onChange={onChange}
            />
            <CheckboxCardControlIndicator data-testid={TESTID_INDICATOR}>
              <CheckboxCardControlCheckedIcon data-testid={TESTID_CHECKED_ICON} />
              <CheckboxCardControlIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON} />
            </CheckboxCardControlIndicator>
          </CheckboxCardControl>
        </>
      )}
    </CheckboxCard>
  );
};

const getCheckbox = (r: RenderResult) => r.getByTestId(TESTID_CHECKBOX);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

describe('CheckboxCard', () => {
  describe('Critical User Paths', () => {
    it('checks when clicking control', async () => {
      const r = render(<CheckboxCardTest />);
      await userEvent.click(getCheckbox(r));
      await expect.element(getInput(r)).toBeChecked();
    });

    it('checks when clicking the card text', async () => {
      const r = render(<CheckboxCardTest />);
      await userEvent.click(r.getByTestId(TESTID_DESCRIPTION));
      await expect.element(getInput(r)).toBeChecked();
    });
  });
  
  describe('Edge Cases', () => {
    it('form: submits hidden input value when checked', async () => {
      const onSubmit = vi.fn((e: FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        expect(fd.get(CHECKBOX_NAME)).toBe(CHECKBOX_VALUE);
      });
      
      const r = render(
        <form onSubmit={onSubmit}>
          <CheckboxCardTest />
          <button type='submit'>Submit</button>
        </form>,
      );
      
      await userEvent.click(getCheckbox(r));
      await userEvent.click(r.getByRole('button', { name: 'Submit' }));
      
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
