import { FC, useCallback, useMemo, useRef } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { useMaskito } from '@maskito/react'
import { MaskitoOptions } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { AsYouType, CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { PhoneFieldProvider } from './contexts';
import { dispatchEvents, mergeRefs, setValue, subscribeInputValue } from '@vega-ui/utils';
import { useControlledState, useLatest } from '@vega-ui/hooks';

export interface PhoneFieldProps extends TextFieldProps {
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
  children,
  strictMask = true,
  ...props
}) => {
  const [code, setCode] = useControlledState(_code, defaultCode, onChangeCode)
  const codeRef = useLatest(code)
  
  const innerRef = useRef<HTMLInputElement>(null)
  const selectingRef = useRef(false)

  const options = useMemo<MaskitoOptions>(() => {
    const { plugins, ...phoneOptions } = maskitoPhoneOptionsGenerator({
      metadata,
      strict: strictMask,
      countryIsoCode: code,
    })

    const onSync = (value: string) => {
      if (selectingRef.current) return

      const asYouType = new AsYouType()
      asYouType.input(value)

      const typedCode = asYouType.getCountry()
      if (typedCode !== undefined && typedCode !== code) setCode(typedCode)
    }

    return { ...phoneOptions, plugins: [...plugins, (element) => subscribeInputValue(element, onSync)] }
  }, [strictMask, code, setCode])

  const inputRef = useMaskito({ options })
  
  const writeCallingCode = useCallback((value: CountryCode) => {
    const input = innerRef.current
    if (!input || codeRef.current !== value) return
    
    setValue(input, `+${getCountryCallingCode(value)}`)
    dispatchEvents(input)
  }, [codeRef])
  
  const onSelect = useCallback((value: CountryCode) => {
    selectingRef.current = true
    setCode(value)
    
    requestAnimationFrame(() => {
      writeCallingCode(value)
      selectingRef.current = false
    })
    
    innerRef.current?.focus()
  }, [setCode, writeCallingCode])
  
  return (
    <PhoneFieldProvider
      inputRef={mergeRefs([inputRef, innerRef])}
      onSelectValue={onSelect}
      code={code}
    >
      <TextField {...props}>
        {children}
      </TextField>
    </PhoneFieldProvider>
  )
}