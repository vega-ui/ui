'use client';

import { FC } from 'react';
import { Select, SelectProps } from '@adara-cs/ui-kit-web';
import { useControlledState } from '@adara-cs/hooks';
import { SheetSelect, SheetSelectProps } from '../SheetSelect';
import { ResponsiveSelectProvider } from './providers';

export interface ResponsiveSelectProps extends Omit<SelectProps, 'className'>, Omit<SheetSelectProps, 'className'> {
  isBreakpoint?: boolean
  sheetSelectClassName?: string
  selectClassName?: string
}

export const ResponsiveSelect: FC<ResponsiveSelectProps> = ({
  size = 'medium',
  sheetSelectClassName,
  selectClassName,
  disabled,
  readOnly,
  variant = 'field',
  placeholder,
  valueClassName,
  placeholderClassName,
  endSlot,
  startSlot,
  valueSlot,
  onSelect,
  defaultValue,
  isBreakpoint = false,
  value: controlledValue,
  children
}) => {
  const [value, setValue] = useControlledState(controlledValue, defaultValue, onSelect)

  return (
    <ResponsiveSelectProvider isBreakpoint={isBreakpoint}>
      {isBreakpoint ? (
        <SheetSelect
          onSelect={setValue}
          value={value}
          className={sheetSelectClassName}
          disabled={disabled}
          readOnly={readOnly}
          variant={variant}
          valueClassName={valueClassName}
          placeholderClassName={placeholderClassName}
          endSlot={endSlot}
          startSlot={startSlot}
          valueSlot={valueSlot}
          placeholder={placeholder}
        >
          {children}
        </SheetSelect>
      ) : (
        <Select
          size={size}
          className={selectClassName}
          disabled={disabled}
          readOnly={readOnly}
          variant={variant}
          valueClassName={valueClassName}
          placeholderClassName={placeholderClassName}
          endSlot={endSlot}
          startSlot={startSlot}
          valueSlot={valueSlot}
          placeholder={placeholder}
          value={value}
          onSelect={setValue}
        >
          {children}
        </Select>
      )}
    </ResponsiveSelectProvider>
  )
}