import { FC, Ref } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { mergeRefs } from '@vega-ui/utils';
import { useMaskito } from '@maskito/react'
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { CountryCode } from 'libphonenumber-js';

export interface PhoneFieldProps extends TextFieldProps {
  /**
   * ISO 3166-1 alpha-2 country code used to determine the phone mask format.
   * Example: 'US', 'RU', 'FR'.
   */
  country?: CountryCode

  /**
   * Default phone number value to display on initial render.
   * Useful for uncontrolled components or presets.
   */
  defaultValue?: string

  /**
   * If true, enforces the phone number mask strictly — only valid characters in the correct positions are allowed.
   */
  strictMask?: boolean

  /**
   * Ref forwarded to the native input element.
   * Useful for focusing or manipulating the input directly.
   */
  ref?: Ref<HTMLInputElement>
}

/** The PhoneField component is a specialized text input for phone numbers, supporting country-specific formatting, optional input masking, and accessibility via native input semantics */
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