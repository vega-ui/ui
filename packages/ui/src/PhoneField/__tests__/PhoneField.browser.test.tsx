import { ComponentProps, FC, useState } from 'react';
import { type PhoneCountry } from '@vega-ui/i18n';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { PhoneField } from '../PhoneField';
import {
  PhoneFieldInput,
  type PhoneFieldInputProps,
  PhoneFieldSelect,
} from '../components';
import {
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '../../Select';

afterEach(cleanup);

const TESTID_SELECT = 'select';
const TESTID_HIDDEN_SELECT = 'hidden-select';
const TESTID_COMBOBOX = 'combobox';
const TESTID_LISTBOX = 'listbox';
const TESTID_INPUT = 'input';
const TESTID_OPTION = (value: string) => `option-${value}`;

const DEFAULT_COUNTRY = 'RU' as const;
const NEXT_COUNTRY = 'US' as const;

const PhoneFieldTest: FC<ComponentProps<typeof PhoneField> & { inputProps?: PhoneFieldInputProps }> = ({ inputProps, ...props }) => {
  return (
    <PhoneField {...props}>
      <PhoneFieldSelect data-testid={TESTID_SELECT}>
        <SelectHiddenSelect data-testid={TESTID_HIDDEN_SELECT} />
        <SelectCombobox data-testid={TESTID_COMBOBOX}>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        
        <SelectListbox data-testid={TESTID_LISTBOX}>
          <SelectOption data-testid={TESTID_OPTION('RU')} value='RU'>
            RU
          </SelectOption>
          <SelectOption data-testid={TESTID_OPTION('US')} value='US'>
            US
          </SelectOption>
          <SelectOption data-testid={TESTID_OPTION('FR')} value='FR'>
            FR
          </SelectOption>
          <SelectOption data-testid={TESTID_OPTION('IT')} value='IT'>
            IT
          </SelectOption>
        </SelectListbox>
      </PhoneFieldSelect>
      
      <PhoneFieldInput data-testid={TESTID_INPUT} {...inputProps} />
    </PhoneField>
  );
};

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getCombobox = (r: RenderResult) => r.getByTestId(TESTID_COMBOBOX) as HTMLElement;
const getHiddenSelect = (r: RenderResult) => r.getByTestId(TESTID_HIDDEN_SELECT) as HTMLSelectElement;

const getListbox = (r: RenderResult) => r.getByTestId(TESTID_LISTBOX) as HTMLElement;
const getOption = (r: RenderResult, value: string) => r.getByTestId(TESTID_OPTION(value)) as HTMLElement;

const toBeOpened = async (r: RenderResult) => {
  await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(true);
};

const openByClick = async (r: RenderResult) => {
  await userEvent.click(getCombobox(r));
  await toBeOpened(r);
};

const selectCountry = async (r: RenderResult, country: string) => {
  await openByClick(r);
  await userEvent.click(getOption(r, country));
};

describe('PhoneField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledPhoneFieldTest: FC<ComponentProps<typeof PhoneFieldTest>> = (props) => {
        const [value, setValue] = useState('');

        return <PhoneFieldTest {...props} value={value} onChangeValue={setValue} />;
      };

      it('keeps the typed number when it changes the country, and reports the country', async () => {
        const onChangeCountry = vi.fn();
        const r = render(<ControlledPhoneFieldTest strictMask={false} onChangeCountry={onChangeCountry} />);

        await userEvent.type(getInput(r), '+1 234 567-8900');

        await expect.element(getHiddenSelect(r)).toHaveValue('US');
        await expect.poll(() => getInput(r).value.replace(/\D/g, '')).toBe('12345678900');
        expect(onChangeCountry.mock.calls).toEqual([['US']]);
      });

      it('keeps calling onChange of the input', async () => {
        const onChange = vi.fn();
        const r = render(<ControlledPhoneFieldTest strictMask={false} inputProps={{ onChange }} />);

        await userEvent.type(getInput(r), '+1');

        expect(onChange).toHaveBeenCalled();
      });

      it('calls onChange of the input with the calling code of a selected country', async () => {
        const onChange = vi.fn();
        const r = render(<ControlledPhoneFieldTest defaultCountry={DEFAULT_COUNTRY} inputProps={{ onChange }} />);

        await selectCountry(r, NEXT_COUNTRY);

        await expect.poll(() => onChange.mock.lastCall?.[0].target.value).toMatch(/^\+1/);
      });
    });

    describe('number in E.164', () => {
      it('shows a controlled number formatted and selects its country', async () => {
        const r = render(<PhoneFieldTest value='+79123456789' />);

        await expect.element(getInput(r)).toHaveValue('+7 912 345-67-89');
        await expect.element(getHiddenSelect(r)).toHaveValue('RU');
      });

      it('disables the input and the country select when disabled', async () => {
        const r = render(<PhoneFieldTest defaultValue='+79123456789' disabled />);

        await expect.element(getInput(r)).toBeDisabled();
        await expect.element(getHiddenSelect(r)).toBeDisabled();
      });
    });

    describe('uncontrolled', () => {
      describe('country selection', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PhoneFieldTest defaultCountry={DEFAULT_COUNTRY} />);
        });
        
        it('selecting option focuses the input', async () => {
          const input = getInput(r);
          
          await selectCountry(r, NEXT_COUNTRY);
          
          await expect.element(input).toHaveFocus();
        });
        
      });
      
      describe('auto-detect country from input (AsYouType)', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<PhoneFieldTest strictMask={false} />);
        });
        
        it('detects the country of the default value', async () => {
          r.rerender(<></>);
          const next = render(<PhoneFieldTest strictMask={false} defaultCountry={DEFAULT_COUNTRY} defaultValue='+1 234 567-8900' />);
          
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
          r = render(<PhoneFieldTest defaultCountry='US' strictMask />);
        });
        
        it('keeps the first digit typed into an empty field after the calling code', async () => {
          await userEvent.type(getInput(r), '2');

          await expect.element(getInput(r)).toHaveValue('+1 2');
        });

        it('formats the typed number by the template of the country', async () => {
          await selectCountry(r, 'RU');
          await userEvent.keyboard('9123456789');

          await expect.element(getInput(r)).toHaveValue('+7 912 345-67-89');
        });

        it('keeps a collapsed caret after the calling code', async () => {
          const input = getInput(r);
          await userEvent.type(input, '202');

          input.setSelectionRange(1, 1);

          await expect.poll(() => [input.selectionStart, input.selectionEnd]).toEqual([3, 3]);
        });
      });
    });
    
    describe('controlled', () => {
      describe('country selection', () => {
        const CONTROLLED_INITIAL = 'RU' as const;
        const CONTROLLED_NEXT = 'FR' as const;
        
        let r: RenderResult;
        let onChangeCountry: Mock;
        
        beforeEach(() => {
          onChangeCountry = vi.fn();
          r = render(<PhoneFieldTest country={CONTROLLED_INITIAL} onChangeCountry={onChangeCountry} />);
        });
        
        it('does not update hidden select until parent updates `country` (rerender)', async () => {
          const hiddenSelect = getHiddenSelect(r);
          
          await selectCountry(r, CONTROLLED_NEXT);
          
          await expect.element(hiddenSelect).toHaveValue(CONTROLLED_INITIAL);
          
          r.rerender(<PhoneFieldTest country={CONTROLLED_NEXT} onChangeCountry={onChangeCountry} />);
          await expect.element(hiddenSelect).toHaveValue(CONTROLLED_NEXT);
        });
        
      });
      
      describe('accepted country selection', () => {
        const ControlledTest = () => {
          const [country, setCountry] = useState<PhoneCountry>('RU');
          return <PhoneFieldTest country={country} onChangeCountry={setCountry} />;
        };
        
        it('writes the calling code of a country accepted by a controlled parent', async () => {
          const r = render(<ControlledTest />);
          
          await selectCountry(r, 'FR');
          
          await expect.poll(() => getInput(r).value).toMatch(/^\+33/);
        });
      });
      
      describe('auto-detect country from input (AsYouType)', () => {
        let r: RenderResult;
        let onChangeCountry: Mock;
        
        beforeEach(() => {
          onChangeCountry = vi.fn();
          r = render(<PhoneFieldTest strictMask={false} country='IT' onChangeCountry={onChangeCountry} />);
        });
        
        it('hidden select stays on current `country` until parent updates it (rerender)', async () => {
          const input = getInput(r);
          const hiddenSelect = getHiddenSelect(r);

          await userEvent.type(input, '+1 234 567-8900');

          await expect.element(hiddenSelect).toHaveValue('IT');

          r.rerender(<PhoneFieldTest country='US' strictMask={false} onChangeCountry={onChangeCountry} />);
          await expect.element(hiddenSelect).toHaveValue('US');
        });
      });
    });
  });

  describe('Error handling', () => {
    it('marks a required field that shows only the calling code as invalid', async () => {
      const r = render(<PhoneFieldTest defaultCountry={DEFAULT_COUNTRY} inputProps={{ required: true }} />);

      await selectCountry(r, NEXT_COUNTRY);
      await expect.element(getInput(r)).toHaveValue('+1 ');

      expect(getInput(r).validity.valid).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('changes only the country of a read-only input when the user picks one', async () => {
      const onChangeValue = vi.fn();
      const r = render(<PhoneFieldTest defaultValue='+79123456789' onChangeValue={onChangeValue} inputProps={{ readOnly: true }} />);

      await selectCountry(r, NEXT_COUNTRY);

      await expect.element(getHiddenSelect(r)).toHaveValue(NEXT_COUNTRY);
      expect(getInput(r)).toHaveValue('+7 912 345-67-89');
      expect(onChangeValue).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    const toBeActive = async (r: RenderResult, value: string) => {
      await expect.element(getCombobox(r)).toHaveFocus();
      await expect.poll(() => getCombobox(r).getAttribute('aria-activedescendant')).toBe(getOption(r, value).id);
    };

    it('opens on the current country and selects another one by keyboard', async () => {
      const onChangeCountry = vi.fn();
      const r = render(<PhoneFieldTest defaultCountry={DEFAULT_COUNTRY} onChangeCountry={onChangeCountry} />);

      getCombobox(r).focus();
      await userEvent.keyboard('{ArrowDown}');
      await toBeOpened(r);
      await toBeActive(r, 'RU');

      await userEvent.keyboard('{ArrowDown}');
      await toBeActive(r, 'US');
      await userEvent.keyboard('{Enter}');

      await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(false);
      expect(onChangeCountry).toHaveBeenCalledWith('US');
      await expect.element(getHiddenSelect(r)).toHaveValue('US');
    });

    it('closes on Escape keeping the country and the focus on the combobox', async () => {
      const onChangeCountry = vi.fn();
      const r = render(<PhoneFieldTest defaultCountry={DEFAULT_COUNTRY} onChangeCountry={onChangeCountry} />);

      getCombobox(r).focus();
      await userEvent.keyboard('{ArrowDown}');
      await toBeOpened(r);
      await userEvent.keyboard('{End}');
      await toBeActive(r, 'IT');
      await userEvent.keyboard('{Escape}');

      await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(false);
      await expect.element(getCombobox(r)).toHaveFocus();
      expect(onChangeCountry).not.toHaveBeenCalled();
      await expect.element(getHiddenSelect(r)).toHaveValue(DEFAULT_COUNTRY);
    });
  });
});