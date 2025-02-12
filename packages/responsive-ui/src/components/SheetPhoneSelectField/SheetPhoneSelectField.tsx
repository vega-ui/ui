import { FC, Ref } from 'react';
import { PhoneSelectField, PhoneSelectFieldProps } from '@adara-cs/ui-kit-web';
import { CountryCode } from 'libphonenumber-js';
import { SheetPhoneSelect } from './components';

export interface PhoneFieldCountry {
  iso: CountryCode
  label: string
}

export interface SheetPhoneSelectFieldProps extends Omit<PhoneSelectFieldProps, 'selectSlot'> {
  ref?: Ref<HTMLInputElement>
}

export const SheetPhoneSelectField: FC<SheetPhoneSelectFieldProps> = ({
  countries,
  ref,
  ...props
}) => {
  return (
    <PhoneSelectField
      countries={countries}
      ref={ref}
      selectSlot={<SheetPhoneSelect countries={countries} />}
      {...props}
    />
  )
}