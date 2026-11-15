import { FC } from 'react';
import { createInput } from '@vega-ui/core';
import { useSnapshot } from '../../../internals/widget';
import { csx } from '@vega-ui/utils';
import { Select, SelectProps } from '../../../Select';
import style from './style.module.css'
import { usePhoneFieldContext } from '../../contexts';
import { PhoneCountry } from '@vega-ui/i18n';
import { useTextFieldContext } from '../../../TextField/contexts';
import { SELECT_COUNTRY } from '@vega-ui/widgets/phone-field';

export type PhoneFieldSelectProps = Omit<SelectProps, 'defaultValue' | 'value'>

/**
 * PhoneFieldSelect is a specialized Select component used inside PhoneField
 * to choose a country.
 *
 * It is tightly integrated with PhoneField and TextField contexts:
 * - Reads the current country from PhoneField context
 * - Picking a country writes its calling code to the input, like an edit of
 *   the user, and reports the country to PhoneField
 * - Inherits visual size and `disabled` from the surrounding fields
 *
 * The component acts as a controlled Select:
 * - `value` is driven by PhoneField context
 * - `onChangeValue` is composed: both local and PhoneField handlers are called
 *
 * This component is not intended to be used standalone.
 * It should always be rendered within a PhoneField.
 */
export const PhoneFieldSelect: FC<PhoneFieldSelectProps> = ({ className, onChangeValue: _onChangeValue, ...props }) => {
  const { handle, disabled } = usePhoneFieldContext()
  const country = useSnapshot(handle, (state) => state.country)
  const { size } = useTextFieldContext()

  const onSelect = (value: PhoneCountry) => {
    handle.send(createInput(SELECT_COUNTRY, { to: value }))
    _onChangeValue?.(value)
  }
  
  return (
    <Select
      size={size}
      className={csx(style.select, className)}
      value={country}
      disabled={disabled}
      onChangeValue={onSelect}
      {...props}
    />
  )
}
