'use client';

import { FC, Ref } from 'react';
import { PhoneSelectFieldProps, PhoneSelectField, PhoneSelectFieldChangeEvent } from '@adara-cs/ui-kit-web';
import { useControlledState } from '@adara-cs/hooks';
import { SheetPhoneSelectField, SheetPhoneSelectFieldProps } from '../SheetPhoneSelectField';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';

export interface ResponsivePhoneSelectFieldProps extends Omit<PhoneSelectFieldProps, 'className'>, Omit<SheetPhoneSelectFieldProps, 'className'> {
  isBreakpoint?: boolean
  sheetPhoneSelectFieldClassName?: string
  phoneSelectFieldClassName?: string
  onCountryChanged?: (country: CountryCode | undefined) => void
  ref?: Ref<HTMLInputElement>
  onChange?: (event: PhoneSelectFieldChangeEvent, value: string) => void
}

export const ResponsivePhoneSelectField: FC<ResponsivePhoneSelectFieldProps> = ({
  size = 'medium',
  sheetPhoneSelectFieldClassName,
  phoneSelectFieldClassName,
  disabled,
  readOnly,
  placeholder,
  endSlot,
  startSlot,
  defaultValue,
  isBreakpoint = false,
  country: controlledCountry,
  onCountryChanged,
  defaultCountry,
  onInput,
  value: controlledValue,
  onChange: _onChange,
  countries,
  ref,
  ...props
}) => {
  const [value, setValue] = useControlledState<string>(controlledValue, defaultValue ?? `+${getCountryCallingCode('RU')} `)
  const [country, setCountry] = useControlledState<CountryCode | undefined>(controlledCountry, defaultCountry, onCountryChanged)

  const onChange = (e: PhoneSelectFieldChangeEvent, value: string) => {
    _onChange?.(e, value)
    setValue(value)
  }

  return (
    <>
      {isBreakpoint ? (
        <SheetPhoneSelectField
          countries={countries}
          value={value}
          onInput={onInput}
          country={country}
          onCountryChanged={setCountry}
          className={sheetPhoneSelectFieldClassName}
          disabled={disabled}
          readOnly={readOnly}
          endSlot={endSlot}
          startSlot={startSlot}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      ) : (
        <PhoneSelectField
          countries={countries}
          size={size}
          country={country}
          onCountryChanged={setCountry}
          onInput={onInput}
          className={phoneSelectFieldClassName}
          disabled={disabled}
          readOnly={readOnly}
          endSlot={endSlot}
          startSlot={startSlot}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      )}
    </>
  )
}