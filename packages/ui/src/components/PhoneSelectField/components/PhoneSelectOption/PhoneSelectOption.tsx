'use client';
import { FC, ReactNode } from 'react';
import { FlagIcon, FlagIconProps } from '../../../FlagIcon';
import { Option, OptionProps } from '../../../Option';
import style from './style.module.css'
import { useListItem } from '@floating-ui/react';
import { useSelectContext } from '../../../Select';

export interface PhoneSelectOptionProps {
  children?: ReactNode | ReactNode[]
  size?: OptionProps['size']
  value: string
  iso: FlagIconProps['name']
}

export const PhoneSelectOption: FC<PhoneSelectOptionProps> = ({ children, size, value, iso }) => {
  const { value: selectedValue, onSelect, activeIndex, size: selectSize, getItemProps } = useSelectContext()
  const { ref, index } = useListItem()

  return (
    <Option selected={selectedValue === value} onSelect={onSelect} ref={ref} focusable={index === activeIndex} size={size ?? selectSize} className={style.option} value={value} {...(getItemProps ? getItemProps() : {})}>
      <FlagIcon className={style.icon} size={size} name={iso as FlagIconProps['name']} />
      {children}
    </Option>
  )
}