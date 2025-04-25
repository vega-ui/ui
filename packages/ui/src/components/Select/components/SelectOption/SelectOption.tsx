'use client';
import { FC } from 'react';
import { useSelectContext } from '../../hooks';
import { Option, OptionProps } from '../../../Option';
import { useListItem } from '@floating-ui/react';

export type SelectOptionProps = OptionProps

/** The SelectOption component represents a single selectable item within a Select dropdown, supporting optional selection state, focusability, custom content, and ARIA roles for accessibility compliance */
export const SelectOption: FC<SelectOptionProps> = ({ 
  value,
  size,
  children,
  ...props
}) => {
  const { ref, index } = useListItem();
  const { value: selectedValue, onSelect, activeIndex, size: selectSize, getItemProps } = useSelectContext()

  return (
    <Option
      size={size ?? selectSize}
      value={value}
      selected={Array.isArray(selectedValue) ? selectedValue.includes(value as never) : selectedValue === value}
      focusable={activeIndex === index}
      onSelect={onSelect}
      ref={ref}
      {...props}
      {...(getItemProps ? getItemProps() : {})}
    >
      {children}
    </Option>
  )
}