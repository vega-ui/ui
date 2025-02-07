import { FC } from 'react';
import { useSelectContext } from '../../hooks';
import { Option, OptionProps } from '../../../Option';
import { useListItem } from '@floating-ui/react';

export type SelectOptionProps = OptionProps

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