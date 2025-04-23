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
  /**
   * The default country code (ISO 3166-1 alpha-2) used for initial formatting and selection.
   * Example: 'US', 'DE', 'RU'.
   */
  defaultCountry?: CountryCode

  /**
   * Controlled country code for external state management.
   * Overrides `defaultCountry` when provided.
   */
  country?: CountryCode

  /**
   * The initial value of the phone input when uncontrolled.
   */
  defaultValue?: string

  /**
   * List of supported countries for selection in the dropdown.
   * Each entry includes metadata (e.g., flag, name, dial code).
   */
  countries: PhoneFieldCountry[]

  /**
   * Expands the dropdown listbox to match the full width of the input.
   * Useful for responsive or alignment-sensitive layouts.
   */
  fullWidthListbox?: boolean

  /**
   * Callback triggered when the selected country changes.
   *
   * @param country - The new selected country code
   */
  onCountryChanged?: (country: CountryCode) => void

  /**
   * Callback fired when the phone number input changes.
   *
   * @param event - The original input change event
   * @param value - The parsed phone number string
   */
  onChange?: (event: PhoneSelectFieldChangeEvent, value: string) => void

  /**
   * Custom node(s) rendered inside the country select trigger.
   * Useful for injecting flags, icons, or text labels.
   */
  selectSlot?: ReactNode | ReactNode[]

  /**
   * Controlled value of the phone input field.
   * Used for full external state control.
   */
  value?: string

  /**
   * Ref forwarded to the underlying phone input element.
   * Enables focus, scroll, or measurement logic.
   */
  ref?: Ref<HTMLInputElement>
}

/** A PhoneSelectField is a UI component that allows users to select or input a phone number, typically featuring a dropdown to choose a country code and an input field for the number itself. It is commonly used in forms where phone number validation and international formats are required */
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