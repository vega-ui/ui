import { FC } from 'react';
import { Select, SelectProps } from '../../../Select';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { usePhoneFieldContext } from '../../contexts';
import { CountryCode } from 'libphonenumber-js';
import { useTextFieldContext } from '../../../TextField/contexts';

export type PhoneFieldSelectProps = Omit<SelectProps, 'defaultValue' | 'value'>

/**
 * PhoneFieldSelect is a specialized Select component used inside PhoneField
 * to choose a country code.
 *
 * It is tightly integrated with PhoneField and TextField contexts:
 * - Reads the current country code from PhoneField context
 * - Updates the PhoneField country code when a new value is selected
 * - Inherits visual size from the surrounding TextField
 *
 * The component acts as a controlled Select:
 * - `value` is driven by PhoneField context
 * - `onSelectValue` is composed: both local and PhoneField handlers are called
 *
 * This component is not intended to be used standalone.
 * It should always be rendered within a PhoneField.
 */
export const PhoneFieldSelect: FC<PhoneFieldSelectProps> = ({ className, onSelectValue, ...props }) => {
  const { onSelectValue: _onSelectValue, code } = usePhoneFieldContext()
  const { size } = useTextFieldContext()
  
  const onSelect = (value: CountryCode) => {
    onSelectValue?.(value)
    _onSelectValue?.(value)
  }
  return (
    <Select
      size={size}
      className={csx(style.select, className)}
      value={code}
      onSelectValue={onSelect}
      {...props}
    />
  )
}