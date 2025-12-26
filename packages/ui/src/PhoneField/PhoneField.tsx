import { FC, FormEvent, useCallback, useRef } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { useMaskito } from '@maskito/react'
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { AsYouType, CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { PhoneFieldProvider } from './contexts';
import { dispatchEvents, mergeRefs, setValue } from '@vega-ui/utils';
import { useControlledState } from '@vega-ui/hooks';

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
  
  const innerRef = useRef<HTMLInputElement>(null)
  const inputRef = useMaskito({
    options: maskitoPhoneOptionsGenerator({
      metadata,
      strict: strictMask,
      countryIsoCode: code,
    }),
  })
  
  const onSelect = useCallback((value: CountryCode) => {
    setCode(value)
    
    requestAnimationFrame(() => {
      if (!innerRef.current) return
      setValue(innerRef.current, `+${getCountryCallingCode(value)}`)
      dispatchEvents(innerRef.current)
    })
    
    innerRef.current?.focus()
  }, [])
  
  const onInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    
    const asYouType = new AsYouType()
    asYouType.input(value)
    
    const code = asYouType.getCountry()
    if (code) setCode(code)
  }, [])
  
  return (
    <PhoneFieldProvider
      inputRef={mergeRefs([inputRef, innerRef])}
      onInput={onInput}
      onSelectValue={onSelect}
      code={code}
    >
      <TextField {...props}>
        {children}
      </TextField>
    </PhoneFieldProvider>
  )
}