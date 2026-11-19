import { ComponentProps, CSSProperties, FC } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';
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
            <CheckboxCheckedIcon data-testid={TESTID_CHECKED_ICON}><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON}><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
        </>
      )}
    </Checkbox>
  );
};

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

describe('Checkbox', () => {
  describe('Edge Cases', () => {
    it('indeterminate sets the native input.indeterminate property', async () => {
      const r = render(<CheckboxTest indeterminate />);
      expect(getInput(r)).toBePartiallyChecked()
    });

    it('clears the native input.indeterminate property when indeterminate turns off', async () => {
      const r = render(<CheckboxTest indeterminate />);

      r.rerender(<CheckboxTest indeterminate={false} />);

      await expect.poll(() => getInput(r).indeterminate).toBe(false);
    });
    
  });
  
});
