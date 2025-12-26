import { FC } from 'react';
import { SelectListbox, SelectListboxProps } from '../../../Select';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type PhoneFieldSelectListboxProps = SelectListboxProps;

/**
 * PhoneFieldSelectListbox is a styled wrapper around SelectListbox
 * used to render the list of available countries in PhoneFieldSelect.
 *
 * It applies PhoneField-specific layout and visual styles while
 * preserving the keyboard navigation, accessibility, and interaction
 * behavior of the base SelectListbox.
 *
 * This component is intended to be used only within PhoneFieldSelect
 * and should not be rendered independently.
 */
export const PhoneFieldSelectListbox: FC<PhoneFieldSelectListboxProps> = ({ className, ...props }) => {
  return <SelectListbox className={csx(style.listbox, className)} {...props} />
}