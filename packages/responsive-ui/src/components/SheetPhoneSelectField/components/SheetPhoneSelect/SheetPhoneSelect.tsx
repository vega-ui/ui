import { FC } from 'react';
import { FlagIcon, FlagIconProps, usePhoneSelectContext } from '@adara-cs/ui-kit-web';
import { SheetSelect, SheetSelectOption } from '../../../SheetSelect';
import { CountryCode } from 'libphonenumber-js';
import style from './style.module.css';

export interface SheetPhoneSelectProps {
  countries: Array<{
    iso: CountryCode
    label: string
  }>
}

export const SheetPhoneSelect: FC<SheetPhoneSelectProps> = ({ countries }) => {
  const { size, value, onSelect } = usePhoneSelectContext()

  return (
    <SheetSelect readOnly={countries.length === 1} valueSlot={<FlagIcon size={size} name={value as FlagIconProps['name']} />} value={value} onSelect={onSelect} className={style.countrySelect}>
      {countries?.map(({ label, iso }) => (
        <SheetSelectOption key={iso} className={style.option} value={iso}>
          <FlagIcon className={style.icon} size={size} name={iso as FlagIconProps['name']} />
          {label}
        </SheetSelectOption>
      ))}
    </SheetSelect>
  )
}