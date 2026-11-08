import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { TextField, TextFieldProps } from '../TextField';
import { useMaskito } from '@maskito/react'
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { PhoneFieldProvider } from './contexts';
import { getTypedCountry } from './helpers';
import { mergeRefs, writeInputValue } from '@vega-ui/utils';
import { useControlledState, useFormReset, useLatest } from '@vega-ui/hooks';

export interface PhoneFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled phone number, as the text of the input.
   */
  value?: string

  /**
   * Initial phone number for uncontrolled usage. Defaults to `''`.
   * Its country is selected unless `code` is set.
   */
  defaultValue?: string

  /**
   * Called with the phone number when it changes.
   */
  onChangeValue?(value: string): void

  /**
   * ISO 3166-1 alpha-2 country code used to determine the phone mask format.
   * Example: 'US', 'RU', 'FR'.
   */
  code?: CountryCode
  
  /**
   * ISO 3166-1 alpha-2 country code used to determine the phone mask format.
   * Example: 'US', 'RU', 'FR'.
   */
  defaultCode?: CountryCode
  
  /**
   * ISO 3166-1 alpha-2 country code used to determine the phone mask format.
   * Example: 'US', 'RU', 'FR'.
   */
  onChangeCode?(code: CountryCode): void

  /**
   * If true, enforces the phone number mask strictly — only valid characters in the correct positions are allowed.
   */
  strictMask?: boolean
}

/** The PhoneField component is a specialized text input for phone numbers, supporting country-specific formatting, optional input masking, and accessibility via native input semantics */
export const PhoneField: FC<PhoneFieldProps> = ({
  defaultCode = '' as CountryCode,
  code: _code,
  onChangeCode,
  value: controlledValue,
  defaultValue = '',
  onChangeValue,
  children,
  strictMask = true,
  ...props
}) => {
  const [code, setCode] = useControlledState(_code, getTypedCountry(defaultValue) ?? defaultCode, onChangeCode)
  const [phone, setPhone] = useControlledState(controlledValue, defaultValue, onChangeValue)
  const codeRef = useLatest(code)
  
  const innerRef = useRef<HTMLInputElement>(null)
  const shownCode = useRef(code)

  const options = useMemo<MaskitoOptions>(() => maskitoPhoneOptionsGenerator({
    metadata,
    strict: strictMask,
    countryIsoCode: code,
  }), [strictMask, code])

  const detectCode = (value: string) => {
    const typedCode = getTypedCountry(value)
    if (typedCode === undefined || typedCode === code) return

    shownCode.current = typedCode
    setCode(typedCode)
  }

  const changePhone = (value: string) => {
    setPhone(value)
    detectCode(value)
  }

  useFormReset(innerRef, () => {
    if (controlledValue !== undefined) return

    setPhone(defaultValue)
    if (_code !== undefined) return

    const resetCode = getTypedCountry(defaultValue) ?? defaultCode
    shownCode.current = resetCode
    setCode(resetCode)
  })

  const inputRef = useMaskito({ options })
  
  useEffect(() => {
    if (shownCode.current === code) return

    shownCode.current = code
    setPhone(maskitoTransform(`+${getCountryCallingCode(code)}`, options))
  }, [code, options, setPhone])

  const onSelect = useCallback((value: CountryCode) => {
    shownCode.current = value
    flushSync(() => setCode(value))
    innerRef.current?.focus()

    if (codeRef.current !== value) {
      shownCode.current = codeRef.current
      return
    }

    const input = innerRef.current
    if (input) writeInputValue(input, `+${getCountryCallingCode(value)}`)
  }, [setCode, codeRef])
  
  return (
    <PhoneFieldProvider
      inputRef={mergeRefs([inputRef, innerRef])}
      onSelectValue={onSelect}
      phone={phone}
      changePhone={changePhone}
      code={code}
    >
      <TextField {...props}>
        {children}
      </TextField>
    </PhoneFieldProvider>
  )
}