'use client';

import { FC, Ref } from 'react';
import { PhoneSelectFieldProps, PhoneSelectField } from '@adara-cs/ui-kit-web';
import { useControlledState } from '@adara-cs/hooks';
import { SheetPhoneSelectField, SheetPhoneSelectFieldProps } from '../SheetPhoneSelectField';
import { CountryCode } from 'libphonenumber-js';
import { callingCodes } from '../SheetPhoneSelectField/constants';

export interface ResponsivePhoneSelectFieldProps extends Omit<PhoneSelectFieldProps, 'className'>, Omit<SheetPhoneSelectFieldProps, 'className'> {
  isBreakpoint?: boolean
  sheetPhoneSelectFieldClassName?: string
  phoneSelectFieldClassName?: string
  onCountryChanged?: (country: CountryCode | undefined) => void
  ref?: Ref<HTMLInputElement>
  onPhoneInput?: (value: string) => void
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
  onPhoneInput,
  countries,
  ref,
  ...props
}) => {
  const [value, setValue] = useControlledState<string>(controlledValue, defaultValue ?? `+${callingCodes['RU']} `, onPhoneInput)
  const [country, setCountry] = useControlledState<CountryCode | undefined>(controlledCountry, defaultCountry, onCountryChanged)

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
          onPhoneInput={setValue}
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
          onPhoneInput={setValue}
          ref={ref}
          {...props}
        />
      )}
    </>
  )
}