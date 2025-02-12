import {
  FC,
  FormEvent,
  ReactNode, Ref, useRef,
} from 'react';
import { TextFieldProps } from '../TextField';
import style from './style.module.css'
import { mergeRefs } from '@adara-cs/utils';
import { callingCodes } from './constants';
import { useControlledState } from '@adara-cs/hooks';
import { AsYouType, CountryCode } from 'libphonenumber-js';
import { PhoneField } from '../PhoneField';
import { PhoneSelect } from './components';
import { PhoneSelectProvider } from './providers';

export interface PhoneFieldCountry {
  iso: CountryCode
  label: string
}

export interface PhoneSelectFieldProps extends Omit<TextFieldProps, 'value'> {
  defaultCountry?: CountryCode
  country?: CountryCode
  defaultValue?: string
  countries: PhoneFieldCountry[]
  fullWidthListbox?: boolean
  onCountryChanged?: (country: CountryCode) => void
  onPhoneInput?: (value: string) => void
  selectSlot?: ReactNode | ReactNode[]
  value?: string
  ref?: Ref<HTMLInputElement>
}

export const PhoneSelectField: FC<PhoneSelectFieldProps> = ({
  className,
  disabled,
  size = 'medium',
  onInput: handleInput,
  defaultCountry = 'RU',
  defaultValue,
  countries,
  country,
  value,
  onCountryChanged,
  selectSlot,
  fullWidthListbox = true,
  onPhoneInput,
  ref,
  ...props
}) => {
  const [countryCode, setCountryCode] = useControlledState<CountryCode>(country, defaultCountry, onCountryChanged)
  const [inputValue, setInputValue] = useControlledState(value, defaultValue ?? `+${callingCodes['RU']} `, onPhoneInput)
  const innerRef = useRef<HTMLInputElement>(null)

  const onSelect = (value: CountryCode) => {
    setCountryCode(value)
    setInputValue(`+${callingCodes[value]} `)
    innerRef.current?.focus()
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)

    const asYouType = new AsYouType()
    asYouType.input(value)

    const countryCode = asYouType.getCountry()
    if (countryCode) setCountryCode(countryCode)

    handleInput?.(e)
  }

  return (
    <PhoneField
      {...props}
      strictMask={countries.length === 1}
      country={countryCode}
      type='tel'
      inputMode='tel'
      onInput={onInput}
      value={inputValue}
      startSlot={
        selectSlot
          ? (<PhoneSelectProvider onSelect={onSelect} value={countryCode} size={size}>
            {selectSlot}
          </PhoneSelectProvider>)
          : <PhoneSelect size={size} fullWidthListbox={fullWidthListbox} onSelect={onSelect} value={countryCode} countries={countries} />
      }
      startSlotClassName={style.startSlot}
      wrapperClassName={style.inputWrapper}
      ref={mergeRefs([ref, innerRef])}
      size={size}
      className={className}
      disabled={disabled}
    />
  )
}