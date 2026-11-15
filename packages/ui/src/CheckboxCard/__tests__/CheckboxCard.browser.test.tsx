import { ComponentProps, CSSProperties, FC, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
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

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

describe('CheckboxCard', () => {
  describe('Critical User Paths', () => {
    it('checks when clicking the card text', async () => {
      const r = render(<CheckboxCardTest />);
      await userEvent.click(r.getByTestId(TESTID_DESCRIPTION));
      await expect.element(getInput(r)).toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('labels the input with the card alone, without a label nested in it', async () => {
      const r = render(<CheckboxCardTest />);
      const card = r.getByTestId(TESTID_CARD);

      expect(card.tagName).toBe('LABEL');
      expect(card.querySelectorAll('label')).toHaveLength(0);
    });
  });
});
