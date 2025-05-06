import { FC } from 'react';
import { Option, OptionProps } from '@vega-ui/react';
import { useSheetSelectContext } from '../../hooks';

export type SheetSelectOptionProps = OptionProps

export const SheetSelectOption: FC<SheetSelectOptionProps> = ({
  value,
  size,
  children,
  ...props
}) => {
  const { value: selectedValue, onSelect, size: selectSize } = useSheetSelectContext()

  return (
    <Option
      size={size ?? selectSize}
      value={value}
      selected={Array.isArray(selectedValue) ? selectedValue.includes(value as never) : selectedValue === value}
      onSelect={onSelect}
      focusable
      {...props}
    >
      {children}
    </Option>
  )
}