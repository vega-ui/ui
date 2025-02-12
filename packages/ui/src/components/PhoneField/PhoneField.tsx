import { FC, Ref } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { mergeRefs } from '@adara-cs/utils';
import { useMaskito } from '@maskito/react'
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { CountryCode } from 'libphonenumber-js';

export interface PhoneFieldProps extends TextFieldProps {
  country?: CountryCode
  defaultValue?: string
  strictMask?: boolean
  ref?: Ref<HTMLInputElement>
}

export const PhoneField: FC<PhoneFieldProps> = ({
  className,
  disabled,
  size = 'medium',
  country,
  strictMask = true,
  ref,
  ...props
}) => {
  const inputRef = useMaskito({
    options: maskitoPhoneOptionsGenerator({
      metadata,
      strict: strictMask,
      countryIsoCode: country,
    }),
  })

  return (
    <TextField
      type='tel'
      inputMode='tel'
      ref={mergeRefs([inputRef, ref])}
      size={size}
      className={className}
      disabled={disabled}
      {...props}
    />
  )
}