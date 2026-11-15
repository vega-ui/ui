import { FC } from 'react';
import { PhoneCountry, PhoneNumbering, phoneNumbering } from '@vega-ui/i18n';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { PhoneFieldProvider } from './contexts';
import { phoneFieldWidget } from '@vega-ui/widgets/phone-field';

export interface PhoneFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled phone number in E.164, like `"+79123456789"`: the digits typed
   * so far after `+` and the calling code, `''` while the field has no digit
   * after the calling code. The input shows it formatted.
   */
  value?: string

  /**
   * Initial phone number for uncontrolled usage, like `value`. Defaults to
   * `''`. Its country is selected unless `country` is set.
   */
  defaultValue?: string

  /**
   * Called with the phone number in E.164 when the user changes it.
   */
  onChangeValue?(value: string): void

  /**
   * Controlled ISO 3166-1 alpha-2 country, like `"US"`: the country selected
   * in `PhoneFieldSelect` and the calling code a strict mask starts an empty
   * field with. A change of it never changes the number.
   */
  country?: PhoneCountry

  /**
   * Initial country for uncontrolled usage, like `country`.
   */
  defaultCountry?: PhoneCountry

  /**
   * Called with the country when the user picks one in `PhoneFieldSelect` or
   * types a number of another country.
   */
  onChangeCountry?(country: PhoneCountry): void

  /**
   * If true, enforces the phone number mask strictly — only valid characters
   * in the correct positions are allowed, and the calling code stays in
   * front of the number.
   */
  strictMask?: boolean

  /**
   * Phone numbering plan the field reads, checks and formats numbers with.
   * Defaults to `phoneNumbering` of `@vega-ui/i18n` on libphonenumber;
   * another engine can be passed as an object of the same interface.
   */
  numbering?: PhoneNumbering

  /**
   * Disables the field like a native `disabled` input: the input and the
   * country select are disabled, and the number is not submitted.
   */
  disabled?: boolean
}

/** The PhoneField component is a specialized text input for phone numbers, supporting country-specific formatting, optional input masking, and accessibility via native input semantics */
export const PhoneField: FC<PhoneFieldProps> = ({
  defaultCountry = '' as PhoneCountry,
  country,
  onChangeCountry,
  value,
  defaultValue = '',
  onChangeValue,
  strictMask = true,
  numbering = phoneNumbering,
  disabled,
  children,
  ...props
}) => {
  const handle = useWidget(phoneFieldWidget, {
    strict: strictMask,
    numbering,
    value,
    defaultValue,
    onChangeValue,
    country,
    defaultCountry,
    onChangeCountry,
  }, widgetEnvironment)

  return (
    <PhoneFieldProvider handle={handle} disabled={disabled}>
      <TextField {...props}>
        {children}
      </TextField>
    </PhoneFieldProvider>
  )
}
