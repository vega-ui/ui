import { forwardRef } from 'react';
import { PhoneSelectField, PhoneSelectFieldProps } from '@adara-cs/ui-kit-web';
import { CountryCode } from 'libphonenumber-js';
import { SheetPhoneSelect } from './components';

export interface PhoneFieldCountry {
  iso: CountryCode
  label: string
}

export type SheetPhoneSelectFieldProps = Omit<PhoneSelectFieldProps, 'selectSlot'>

export const SheetPhoneSelectField = forwardRef<HTMLInputElement, SheetPhoneSelectFieldProps>(({
  countries,
  ...props
}, ref) => {
  return (
    <PhoneSelectField
      countries={countries}
      ref={ref}
      selectSlot={<SheetPhoneSelect countries={countries} />}
      {...props}
    />
  )
})