import {
  FC,
  FormEvent,
  ReactNode, Ref, useRef,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { TextFieldProps } from '../TextField';
import style from './style.module.css'
import { mergeRefs } from '@adara-cs/utils';
import { useControlledState } from '@adara-cs/hooks';
import { AsYouType, CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { PhoneField } from '../PhoneField';
import { PhoneSelect } from './components';
import { PhoneSelectProvider } from './providers';

export interface PhoneFieldCountry {
  iso: CountryCode
  label: string
}

export type PhoneSelectFieldChangeEvent = MouseEvent | KeyboardEvent | FormEvent | null

export interface PhoneSelectFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  defaultCountry?: CountryCode
  country?: CountryCode
  defaultValue?: string
  countries: PhoneFieldCountry[]
  fullWidthListbox?: boolean
  onCountryChanged?: (country: CountryCode) => void
  onChange?: (event: PhoneSelectFieldChangeEvent, value: string) => void
  selectSlot?: ReactNode | ReactNode[]
  value?: string
  ref?: Ref<HTMLInputElement>
}

export const PhoneSelectField: FC<PhoneSelectFieldProps> = ({
  className,
  disabled,
  size = 'medium',
  onInput: _onInput,
  defaultCountry = 'RU',
  defaultValue,
  countries,
  country,
  value,
  onCountryChanged,
  selectSlot,
  fullWidthListbox = true,
  onChange,
  ref,
  ...props
}) => {
  const [countryCode, setCountryCode] = useControlledState<CountryCode>(country, defaultCountry, onCountryChanged)
  const [inputValue, setInputValue] = useControlledState(value, defaultValue ?? `+${getCountryCallingCode(countryCode)} `)
  const innerRef = useRef<HTMLInputElement>(null)

  const onSelect = (e: MouseEvent | KeyboardEvent | null, value: CountryCode) => {
    setCountryCode(value)
    const inputValue = `+${getCountryCallingCode(value)} `
    setInputValue(inputValue)
    onChange?.(e, inputValue)
    innerRef.current?.focus()
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
    onChange?.(e, value)

    const asYouType = new AsYouType()
    asYouType.input(value)

    const countryCode = asYouType.getCountry()
    if (countryCode) setCountryCode(countryCode)

    _onInput?.(e)
  }

  return (
    <PhoneField
      {...props}
      strictMask={countries.length === 1}
      country={countryCode}
      onInput={onInput}
      value={inputValue}
      startSlot={
        selectSlot
          ? (<PhoneSelectProvider onSelect={onSelect} value={countryCode} size={size}>
            {selectSlot}
          </PhoneSelectProvider>)
          : <PhoneSelect disabled={disabled} size={size} fullWidthListbox={fullWidthListbox} onSelect={onSelect} value={countryCode} countries={countries} />
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