import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from 'storybook/test';

import { PhoneField, PhoneFieldProps } from '../PhoneField';
import {
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectPortal,
  PhoneFieldSelectValue,
} from '../components';

const renderPhoneFieldInputOnly = (props?: PhoneFieldProps) => {
  render(
    <PhoneField code='RU' {...props}>
      <PhoneFieldInput data-testid='input' placeholder='Phone' />
    </PhoneField>,
  );
};

const renderPhoneFieldWithSelect = (props?: PhoneFieldProps) => {
  render(
    <PhoneField code='RU' {...props}>
      <PhoneFieldSelect data-testid='select'>
        <PhoneFieldSelectHiddenSelect />
        <PhoneFieldSelectCombobox>
          <PhoneFieldSelectValue data-testid='value' />
          <PhoneFieldSelectIcon />
        </PhoneFieldSelectCombobox>
        <PhoneFieldSelectPortal>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='RU'>RU</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
        </PhoneFieldSelectPortal>
      </PhoneFieldSelect>
      
      <PhoneFieldInput data-testid='input' placeholder='Phone' />
    </PhoneField>,
  );
};

describe('PhoneField', () => {
  describe('Input only composition', () => {
    it('renders', () => {
      renderPhoneFieldInputOnly();
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
    
    it('uses tel input type and mode', () => {
      renderPhoneFieldInputOnly();
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      expect(input.type).toBe('tel');
      expect(input.getAttribute('inputmode')).toBe('tel');
    });
    
    it('allows typing when enabled and formats value', async () => {
      const user = userEvent.setup();
      renderPhoneFieldInputOnly();
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      await user.type(input, '79000000000');
      
      expect(input.value).toBe('+7 900 000-00-00');
    });
    
    it('does not accept typing when disabled (user interaction)', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <PhoneField code='RU'>
          <PhoneFieldInput disabled data-testid='input' onChange={onChange} />
        </PhoneField>,
      );
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      expect(input).toBeDisabled();
      
      await user.type(input, '79000000000');
      
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(input.value).toBe('');
    });
    
    it('calls onChange when enabled', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <PhoneField code='RU'>
          <PhoneFieldInput data-testid='input' onChange={onChange} />
        </PhoneField>,
      );
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      await user.type(input, '7');
      
      expect(onChange).toHaveBeenCalled();
    });
  });
  
  describe('Select + Input composition', () => {
    it('renders select and input', () => {
      renderPhoneFieldWithSelect();
      expect(screen.getByTestId('select')).toBeInTheDocument();
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
    
    it('keeps tel input type and mode', () => {
      renderPhoneFieldWithSelect();
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      expect(input.type).toBe('tel');
      expect(input.getAttribute('inputmode')).toBe('tel');
    });
    
    it('formats using initial code (RU) when typing', async () => {
      const user = userEvent.setup();
      renderPhoneFieldWithSelect();
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      await user.type(input, '9000000000');
      
      expect(input.value.startsWith('+7')).toBe(true);
    });
    
    it('opens country list and allows selecting a country', async () => {
      const user = userEvent.setup();
      renderPhoneFieldWithSelect();
      
      const select = screen.getByTestId('select');
      
      // open (click combobox/trigger)
      await user.click(within(select).getByRole('combobox'));
      
      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
      
      await user.click(within(listbox).getByRole('option', { name: 'US' }));
      
      expect(within(select).getByTestId('value')).toBeInTheDocument();
    });
    
    it('changes formatting after selecting a different country (US)', async () => {
      const user = userEvent.setup();
      renderPhoneFieldWithSelect();
      
      const select = screen.getByTestId('select');
      
      await user.click(within(select).getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'US' }));
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      await user.type(input, '2025550123');

      waitFor(() => {
        expect(input.value.startsWith('+1')).toBe(true);
      })
    });
    
    it('does not open select when PhoneField input is disabled via TextField/PhoneField disabling', async () => {
      const user = userEvent.setup();
      
      render(
        <PhoneField code='RU'>
          <PhoneFieldSelect data-testid='select' disabled>
            <PhoneFieldSelectHiddenSelect />
            <PhoneFieldSelectCombobox>
              <PhoneFieldSelectValue />
              <PhoneFieldSelectIcon />
            </PhoneFieldSelectCombobox>
            <PhoneFieldSelectPortal>
              <PhoneFieldSelectListbox>
                <PhoneFieldSelectOption value='RU'>RU</PhoneFieldSelectOption>
                <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
              </PhoneFieldSelectListbox>
            </PhoneFieldSelectPortal>
          </PhoneFieldSelect>
          
          <PhoneFieldInput data-testid='input' placeholder='Phone' />
        </PhoneField>,
      );
      
      const select = screen.getByTestId('select');
      
      await user.click(within(select).getByRole('combobox'));
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    
    it('calls input onChange when enabled (with select present)', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <PhoneField code='RU'>
          <PhoneFieldSelect data-testid='select'>
            <PhoneFieldSelectHiddenSelect />
            <PhoneFieldSelectCombobox>
              <PhoneFieldSelectValue />
              <PhoneFieldSelectIcon />
            </PhoneFieldSelectCombobox>
            <PhoneFieldSelectPortal>
              <PhoneFieldSelectListbox>
                <PhoneFieldSelectOption value='RU'>RU</PhoneFieldSelectOption>
                <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
              </PhoneFieldSelectListbox>
            </PhoneFieldSelectPortal>
          </PhoneFieldSelect>
          
          <PhoneFieldInput data-testid='input' onChange={onChange} />
        </PhoneField>,
      );
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      
      await user.type(input, '7');
      
      expect(onChange).toHaveBeenCalled();
    });
  });
});
