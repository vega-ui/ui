import {
  FormEvent,
  forwardRef, useRef,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import style from './style.module.css'
import { FlagIcon, FlagIconProps } from '../FlagIcon'
import { mergeRefs } from '@adara-cs/utils';
import { Select } from '../Select';
import { Option } from '../Option';
import { callingCodes } from './constants';
import { useControlledState } from '@adara-cs/hooks';
import { useMaskito } from '@maskito/react'
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { AsYouType, CountryCode } from 'libphonenumber-js';

export interface PhoneFieldCountry {
  iso: CountryCode
  label: string
}

export interface PhoneFieldProps extends TextFieldProps {
  defaultCountry?: CountryCode
  defaultValue?: string
  countries: PhoneFieldCountry[]
  fullWidthListbox?: boolean
}

export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(({
  className,
  disabled,
  size = 'medium',
  onInput: handleInput,
  defaultCountry = 'RU',
  defaultValue,
  countries,
  fullWidthListbox = true,
  ...props
}, ref) => {
  const [value, setValue] = useControlledState<CountryCode>(undefined, defaultCountry)
  const [inputValue, setInputValue] = useControlledState(undefined, defaultValue ?? `+${callingCodes['RU']} `)
  const innerRef = useRef<HTMLInputElement>()

  const inputRef = useMaskito({
    options: maskitoPhoneOptionsGenerator({
      metadata,
      strict: false,
      countryIsoCode: value,
    })
  })

  const onSelect = (value: CountryCode) => {
    setValue(value)
    setInputValue(`+${callingCodes[value]} `)
    innerRef.current?.focus()
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)

    const asYouType = new AsYouType()
    asYouType.input(value)

    const countryCode = asYouType.getCountry()
    if (countryCode) setValue(countryCode)

    handleInput?.(e)
  }

  return (
    <TextField
      type='tel'
      inputMode='tel'
      onInput={onInput}
      value={inputValue}
      startSlot={
        <Select wrapperClassName={style.selectWrapper} fullWidthListbox valueSlot={<FlagIcon size={size} name={value as FlagIconProps['name']} />} value={value} onSelect={onSelect} className={style.countrySelect} listboxClassName={style.countryList}>
          {countries?.map(({ label, iso }) => (
            <Option className={style.option} value={iso} key={value}>
              <FlagIcon className={style.icon} size={size} name={iso as FlagIconProps['name']} />
              {label}
            </Option>
          ))}
        </Select>
      }
      startSlotClassName={style.startSlot}
      wrapperClassName={style.inputWrapper}
      ref={mergeRefs([inputRef, ref, innerRef])}
      size={size}
      className={className}
      disabled={disabled}
      {...props}
    />
  )
})