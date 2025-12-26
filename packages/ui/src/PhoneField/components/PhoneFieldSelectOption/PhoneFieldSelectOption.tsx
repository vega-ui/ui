import { FC } from 'react';
import { SelectOption, SelectOptionProps } from '../../../Select';
import { CountryCode } from 'libphonenumber-js';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type PhoneFieldSelectOptionProps = SelectOptionProps<CountryCode>

/**
 * PhoneFieldSelectOption represents a single selectable country option
 * inside PhoneFieldSelectListbox.
 *
 * It is a typed wrapper around SelectOption, where the option value
 * is a `CountryCode` from `libphonenumber-js`.
 *
 * The component applies PhoneField-specific styles while preserving
 * all selection logic, keyboard interaction, and accessibility
 * behavior of the base SelectOption.
 *
 * This component is intended to be used only within PhoneFieldSelect.
 * It should not be used as a standalone option outside the PhoneField context.
 */
export const PhoneFieldSelectOption: FC<PhoneFieldSelectOptionProps> = ({ className, ...props }) => {
  return <SelectOption className={csx(style.option, className)} {...props} />
}