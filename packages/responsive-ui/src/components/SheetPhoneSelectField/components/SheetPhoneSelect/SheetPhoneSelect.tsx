import { FC, useMemo, useState } from 'react';
import { FlagIcon, FlagIconProps, TextField, usePhoneSelectContext, VisuallyHidden } from '@adara-cs/ui-kit-web';
import { SheetSelect, SheetSelectOption } from '../../../SheetSelect';
import { CountryCode } from 'libphonenumber-js';
import style from './style.module.css';

export interface SheetPhoneSelectProps {
  searchable?: boolean
  searchFieldClassName?: string
  searchFieldPlaceholder?: string
  countries: Array<{
    iso: CountryCode
    label: string
  }>
}

export const SheetPhoneSelect: FC<SheetPhoneSelectProps> = ({
  searchable = true,
  searchFieldClassName,
  searchFieldPlaceholder,
  countries
}) => {
  const [searchValue, setSearchValue] = useState('')
  const { size, value, onSelect } = usePhoneSelectContext()

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => country.label.toLowerCase().includes(searchValue.toLowerCase()))
  }, [countries, searchValue])

  return (
    <SheetSelect
      headerSlot={searchable && (
        <TextField
          className={searchFieldClassName}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder={searchFieldPlaceholder}
        />
      )}
      readOnly={countries.length === 1}
      startSlot={<FlagIcon size={size} name={value as FlagIconProps['name']} />}
      valueSlot={
        <VisuallyHidden>
          {countries.find(v => v.iso === value)?.label}
        </VisuallyHidden>
      }
      value={value}
      onSelect={onSelect}
      className={style.countrySelect}
    >
      {filteredCountries?.map(({ label, iso }) => (
        <SheetSelectOption key={iso} className={style.option} value={iso}>
          <FlagIcon className={style.icon} size={size} name={iso as FlagIconProps['name']} />
          {label}
        </SheetSelectOption>
      ))}
    </SheetSelect>
  )
}