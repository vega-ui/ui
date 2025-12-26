import { FC } from 'react';
import { SelectCombobox, SelectComboboxProps } from '../../../Select';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type PhoneFieldSelectComboboxProps = SelectComboboxProps

/**
 * PhoneFieldSelectCombobox is a styled wrapper around SelectCombobox
 * used as the trigger element for country selection inside PhoneField.
 *
 * It applies PhoneField-specific styles while preserving all behavior
 * and accessibility features of the base SelectCombobox.
 *
 * This component is intended to be used only within PhoneFieldSelect
 * and should not be rendered independently.
 */
export const PhoneFieldSelectCombobox: FC<PhoneFieldSelectComboboxProps> = ({ className, ...props }) => {
  return <SelectCombobox className={csx(style.combobox, className)} {...props} />
}