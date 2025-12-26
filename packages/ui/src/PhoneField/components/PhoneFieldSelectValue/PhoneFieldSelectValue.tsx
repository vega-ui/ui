import { FC } from 'react';
import { SelectValue, SelectValueProps } from '../../../Select';

export type PhoneFieldSelectValueProps = SelectValueProps

/**
 * PhoneFieldSelectValue is a re-export of SelectValue
 * responsible for rendering the currently selected country value
 * inside PhoneFieldSelectCombobox.
 *
 * By default, it renders the selected option value as-is.
 * For custom rendering (e.g. flag-only, emoji, or formatted content),
 * this component can be replaced with custom children that read
 * the current value from `useSelectContext()`.
 *
 * All behavior and accessibility features are inherited
 * directly from SelectValue.
 *
 * This component is intended to be used within PhoneFieldSelectCombobox
 * as part of the PhoneField composition.
 */
export const PhoneFieldSelectValue: FC<PhoneFieldSelectValueProps> = (props) => <SelectValue {...props} />