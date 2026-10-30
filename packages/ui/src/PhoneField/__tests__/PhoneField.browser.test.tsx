import { ComponentProps, FC, useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { PhoneField } from '../PhoneField';
import {
  PhoneFieldInput,
  type PhoneFieldInputProps,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
} from '../components';

afterEach(cleanup);

const TESTID_SELECT = 'select';
const TESTID_HIDDEN_SELECT = 'hidden-select';
const TESTID_COMBOBOX = 'combobox';
const TESTID_LISTBOX = 'listbox';
const TESTID_INPUT = 'input';
const TESTID_OPTION = (value: string) => `option-${value}`;

const AUTOCOMPLETE = 'tel';
const PLACEHOLDER = '+7';

const DEFAULT_CODE = 'RU' as const;
const NEXT_CODE = 'US' as const;

const PhoneFieldTest: FC<ComponentProps<typeof PhoneField> & { inputProps?: PhoneFieldInputProps }> = ({ inputProps, ...props }) => {
  return (
    <PhoneField {...props}>
      <PhoneFieldSelect data-testid={TESTID_SELECT}>
        <PhoneFieldSelectHiddenSelect data-testid={TESTID_HIDDEN_SELECT} />
        <PhoneFieldSelectCombobox data-testid={TESTID_COMBOBOX}>
          <PhoneFieldSelectValue />
          <PhoneFieldSelectIcon />
        </PhoneFieldSelectCombobox>
        
        <PhoneFieldSelectListbox data-testid={TESTID_LISTBOX}>
          <PhoneFieldSelectOption data-testid={TESTID_OPTION('RU')} value='RU'>
            RU
          </PhoneFieldSelectOption>
          <PhoneFieldSelectOption data-testid={TESTID_OPTION('US')} value='US'>
            US
          </PhoneFieldSelectOption>
          <PhoneFieldSelectOption data-testid={TESTID_OPTION('FR')} value='FR'>
            FR
          </PhoneFieldSelectOption>
          <PhoneFieldSelectOption data-testid={TESTID_OPTION('IT')} value='IT'>
            IT
          </PhoneFieldSelectOption>
        </PhoneFieldSelectListbox>
      </PhoneFieldSelect>
      
      <PhoneFieldInput
        data-testid={TESTID_INPUT}
        autoComplete={AUTOCOMPLETE}
        placeholder={PLACEHOLDER}
        {...inputProps}
      />
    </PhoneField>
  );
};

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getCombobox = (r: RenderResult) => r.getByTestId(TESTID_COMBOBOX) as HTMLElement;
const getHiddenSelect = (r: RenderResult) => r.getByTestId(TESTID_HIDDEN_SELECT) as HTMLSelectElement;

const getListbox = (r: RenderResult) => r.getByTestId(TESTID_LISTBOX) as HTMLElement;
const getOption = (r: RenderResult, value: string) => r.getByTestId(TESTID_OPTION(value)) as HTMLElement;

const toBeOpened = async (r: RenderResult) => {
  await expect.element(getListbox(r)).toHaveAttribute('data-status', 'open');
};

const openByClick = async (r: RenderResult) => {
  await userEvent.click(getCombobox(r));
  await toBeOpened(r);
};

const selectCountry = async (r: RenderResult, code: string) => {
  await openByClick(r);
  await userEvent.click(getOption(r, code));
};

describe('PhoneField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledPhoneFieldTest: FC<ComponentProps<typeof PhoneFieldTest>> = (props) => {
        const [value, setValue] = useState('');

        return <PhoneFieldTest {...props} value={value} onChangeValue={setValue} />;
      };

      it('keeps the typed number when it changes the country', async () => {
        const r = render(<ControlledPhoneFieldTest strictMask={false} />);

        await userEvent.type(getInput(r), '+1 234 567-8900');

        await expect.element(getHiddenSelect(r)).toHaveValue('US');
        await expect.poll(() => getInput(r).value.replace(/\D/g, '')).toBe('12345678900');
      });

      it('keeps calling onChange of the input', async () => {
        const onChange = vi.fn();
        const r = render(<ControlledPhoneFieldTest strictMask={false} inputProps={{ onChange }} />);

        await userEvent.type(getInput(r), '+1');

        expect(onChange).toHaveBeenCalled();
      });

      it('writes the calling code of a selected country', async () => {
        const r = render(<ControlledPhoneFieldTest defaultCode={DEFAULT_CODE} />);

        await selectCountry(r, NEXT_CODE);

        await expect.element(getInput(r)).toHaveValue('+1 ');
      });
    });

    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PhoneFieldTest defaultCode={DEFAULT_CODE} />);
      });
      
      it('renders a native tel input with correct configuration', async () => {
        const input = getInput(r);
        
        await expect.element(input).toBeInTheDocument();
        await expect.element(input).toHaveAttribute('type', 'tel');
        await expect.element(input).toHaveAttribute('inputmode', 'tel');
      });
      
      it('forwards input props (placeholder, autoComplete)', async () => {
        const input = getInput(r);
        
        await expect.element(input).toHaveAttribute('placeholder', PLACEHOLDER);
        await expect.element(input).toHaveAttribute('autocomplete', AUTOCOMPLETE);
      });
      
      it('renders hidden native select for form compatibility', async () => {
        const hiddenSelect = getHiddenSelect(r);
        
        await expect.element(hiddenSelect).toBeInTheDocument();
        await expect.element(hiddenSelect).toHaveValue(DEFAULT_CODE);
      });
    });
    
    describe('uncontrolled', () => {
      describe('country selection', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PhoneFieldTest defaultCode={DEFAULT_CODE} />);
        });
        
        it('selecting option updates hidden select value', async () => {
          const hiddenSelect = getHiddenSelect(r);
          
          await selectCountry(r, NEXT_CODE);
          await expect.element(hiddenSelect).toHaveValue(NEXT_CODE);
        });
        
        it('selecting option focuses the input', async () => {
          const input = getInput(r);
          
          await selectCountry(r, NEXT_CODE);
          
          await expect.element(input).toHaveFocus();
        });
        
        it('selecting option sets input value to country calling code (async)', async () => {
          const input = getInput(r);
          
          await selectCountry(r, NEXT_CODE);
          await expect.element(input).toHaveValue('+1 ');
        });
        
        it('calls onChangeCode when selection changes', async () => {
          const onChangeCode = vi.fn();
          r.rerender(<PhoneFieldTest defaultCode={DEFAULT_CODE} onChangeCode={onChangeCode} />);
          
          await selectCountry(r, 'FR');
          
          expect(onChangeCode).toHaveBeenCalledTimes(1);
          expect(onChangeCode).toHaveBeenCalledWith('FR');
        });
      });
      
      describe('auto-detect country from input (AsYouType)', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PhoneFieldTest strictMask={false} />);
        });
        
        it('typing a US number updates selected country (hidden select)', async () => {
          const input = getInput(r);
          const hiddenSelect = getHiddenSelect(r);
          
          await userEvent.type(input, '+1 234 567-8900');
          await expect.element(hiddenSelect).toHaveValue('US');
        });
        
        it('calls onChangeCode when auto-detect changes country', async () => {
          const onChangeCode = vi.fn();
          r.rerender(<PhoneFieldTest strictMask={false} defaultCode={DEFAULT_CODE} onChangeCode={onChangeCode} />);
          
          const input = getInput(r);
          await userEvent.type(input, '+1 234 567-8900');
          
          expect(onChangeCode.mock.calls.length).toBe(1);
          expect(onChangeCode).toHaveBeenCalledWith('US');
        });
        
        it('detects the country of the default value', async () => {
          r.rerender(<></>);
          const next = render(<PhoneFieldTest strictMask={false} defaultCode={DEFAULT_CODE} defaultValue='+1 234 567-8900' />);
          
          await expect.element(getHiddenSelect(next)).toHaveValue('US');
        });
        
        it('detects the country again after the form is reset', async () => {
          r.rerender(<></>);
          const next = render(
            <form data-testid='form'>
              <PhoneFieldTest strictMask={false} defaultValue='+7 912 345-67-89' />
            </form>,
          );
          await expect.element(getHiddenSelect(next)).toHaveValue('RU');
          
          const input = getInput(next);
          await userEvent.clear(input);
          await userEvent.type(input, '+1 234 567-8900');
          await expect.element(getHiddenSelect(next)).toHaveValue('US');
          
          (next.getByTestId('form') as HTMLFormElement).reset();
          
          await expect.element(getHiddenSelect(next)).toHaveValue('RU');
        });
      });
      
      describe('strictMask', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PhoneFieldTest defaultCode='US' strictMask />);
        });
        
        it('strictMask=true: prevents extra digits beyond mask capacity (more restrictive)', async () => {
          const input = getInput(r);
          
          input.focus();
          await userEvent.clear(input);
          await userEvent.type(input, '+1 12345678901234567890');
          
          const strictLen = input.value.replace(/\D/g, '').length;
          expect(strictLen).toBeLessThanOrEqual(12);
        });
        
        it('strictMask=false: allows more free-form entry (less restrictive than strict)', async () => {
          r.rerender(<PhoneFieldTest defaultCode='US' strictMask={false} />)
          const input = getInput(r);
          
          input.focus();
          await userEvent.clear(input);
          await userEvent.type(input, '+1 12345678901234567890');
          
          const looseLen = input.value.replace(/\D/g, '').length;
          expect(looseLen).toBeGreaterThan(11);
        });
      });
    });
    
    describe('controlled', () => {
      describe('country selection', () => {
        const CONTROLLED_INITIAL = 'RU' as const;
        const CONTROLLED_NEXT = 'FR' as const;
        
        let r: RenderResult;
        let onChangeCode: Mock;
        
        beforeEach(() => {
          onChangeCode = vi.fn();
          r = render(<PhoneFieldTest code={CONTROLLED_INITIAL} onChangeCode={onChangeCode} />);
        });
        
        it('syncs hidden select with `code` on mount', async () => {
          await expect.element(getHiddenSelect(r)).toHaveValue(CONTROLLED_INITIAL);
        });
        
        it('selecting option calls onChangeCode with next value', async () => {
          await selectCountry(r, CONTROLLED_NEXT);
          
          expect(onChangeCode).toHaveBeenCalledTimes(1);
          expect(onChangeCode).toHaveBeenCalledWith(CONTROLLED_NEXT);
        });
        
        it('does not update hidden select until parent updates `code` (rerender)', async () => {
          const hiddenSelect = getHiddenSelect(r);
          
          await selectCountry(r, CONTROLLED_NEXT);
          
          await expect.element(hiddenSelect).toHaveValue(CONTROLLED_INITIAL);
          
          r.rerender(<PhoneFieldTest code={CONTROLLED_NEXT} onChangeCode={onChangeCode} />);
          await expect.element(hiddenSelect).toHaveValue(CONTROLLED_NEXT);
        });
        
        it('does not write the calling code of a country rejected by a controlled parent', async () => {
          const before = getInput(r).value;
          
          await selectCountry(r, CONTROLLED_NEXT);
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          
          expect(getInput(r).value).toBe(before);
        });
      });
      
      describe('accepted country selection', () => {
        const ControlledTest = () => {
          const [code, setCode] = useState<CountryCode>('RU');
          return <PhoneFieldTest code={code} onChangeCode={setCode} />;
        };
        
        it('writes the calling code of a country accepted by a controlled parent', async () => {
          const r = render(<ControlledTest />);
          
          await selectCountry(r, 'FR');
          
          await expect.poll(() => getInput(r).value).toMatch(/^\+33/);
        });
      });
      
      describe('auto-detect country from input (AsYouType)', () => {
        let r: RenderResult;
        let onChangeCode: Mock;
        
        beforeEach(() => {
          onChangeCode = vi.fn();
          r = render(<PhoneFieldTest strictMask={false} code='IT' onChangeCode={onChangeCode} />);
        });
        
        it('typing a US number calls onChangeCode with detected country', async () => {
          const input = getInput(r);
          
          await userEvent.type(input, '+1 234 567-8900');
          
          expect(onChangeCode).toHaveBeenCalledTimes(1);
          expect(onChangeCode).toHaveBeenCalledWith('US');
        });
        
        it('hidden select stays on current `code` until parent updates it (rerender)', async () => {
          const input = getInput(r);
          const hiddenSelect = getHiddenSelect(r);
          
          await userEvent.type(input, '+1 234 567-8900');
          
          await expect.element(hiddenSelect).toHaveValue('IT');
          
          r.rerender(<PhoneFieldTest code='US' strictMask={false} onChangeCode={onChangeCode} />);
          await expect.element(hiddenSelect).toHaveValue('US');
        });
      });
    });
  });
});