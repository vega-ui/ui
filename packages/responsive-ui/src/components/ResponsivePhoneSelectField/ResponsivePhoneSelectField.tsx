'use client';

import { ChangeEvent, FC } from 'react';
import { PhoneSelectFieldProps, PhoneSelectField } from '@adara-cs/ui-kit-web';
import { useControlledState, useMediaQuery } from '@adara-cs/hooks';
import { SheetPhoneSelectField, SheetPhoneSelectFieldProps } from '../SheetPhoneSelectField';
import { CountryCode } from 'libphonenumber-js';

export interface ResponsivePhoneSelectFieldProps extends Omit<PhoneSelectFieldProps, 'className'>, Omit<SheetPhoneSelectFieldProps, 'className'> {
  responsiveBreakpoint?: number
  sheetPhoneSelectFieldClassName?: string
  phoneSelectFieldClassName?: string
  onCountryChanged?: (country: CountryCode | undefined) => void
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
  responsiveBreakpoint,
  country: controlledCountry,
  onCountryChanged,
  defaultCountry,
  onInput: onInputValue,
  value: controlledValue,
  countries,
}) => {
  const [value, setValue] = useControlledState<string | number | undefined>(controlledValue, defaultValue)
  const [country, setCountry] = useControlledState<CountryCode | undefined>(controlledCountry, defaultCountry, onCountryChanged)
  const isBreakpoint = useMediaQuery(`(max-width: ${responsiveBreakpoint}px)`, { defaultValue: false })

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    onInputValue?.(e)
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
        />
      )}
    </>
  )
}