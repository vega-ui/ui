'use client';

import { Children, FC, ReactElement, ReactNode, useMemo, useState } from 'react';
import { OptionProps, SelectCombobox, SelectComboboxProps, SelectEvent, Sheet } from '@adara-cs/ui-kit-web';
import { useControlledState } from '@adara-cs/hooks';
import { SheetSelectOptionList } from './components';
import { SheetSelectProvider } from './providers';
import style from './style.module.css'

export interface SheetSelectProps extends SelectComboboxProps {
  searchFieldClassName?: string
  searchable?: boolean
  value?: string | number | undefined
  defaultValue?: string | number | undefined
  onSelect?(e: SelectEvent, value: string | number | undefined): void
  children?: ReactElement<OptionProps> | ReactElement<OptionProps>[]
  searchFieldPlaceholder?: string
  headerSlot?: ReactNode | ReactNode[]
}

export const SheetSelect: FC<SheetSelectProps> = ({
  size = 'medium',
  className,
  disabled,
  readOnly,
  variant = 'field',
  placeholder,
  valueClassName,
  placeholderClassName,
  endSlot,
  startSlot,
  valueSlot,
  headerSlot,
  onSelect,
  value: controlledValue,
  defaultValue,
  children,
}) => {
  const [value, setValue] = useControlledState(controlledValue, defaultValue)
  const [open, setOpen] = useState<boolean | undefined>(false)

  const enabled = !disabled && !readOnly

  const options = useMemo(() =>
      Children.count(children) !== 0
        ? Children.map(children, (child) => ({
          label: child?.props.children ?? '',
          value: child?.props.value ?? ''
        }))
        : [], [children]
  )

  const onSelectOption = (e: SelectEvent, value: number | string | undefined) => {
    onSelect?.(e, value)
    setValue(value)
    setOpen(false)
  }

  const label = useMemo(() => options?.find(v => v.value === value)?.label, [value, options])

  return (
    <Sheet
      role='listbox'
      className={style.sheet}
      clickEnabled={enabled}
      open={open}
      onChangeOpen={setOpen}
      headerSlot={headerSlot}
      triggerSlot={(ref, props) => (
        <SelectCombobox
          ref={ref}
          size={size}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          variant={variant}
          placeholder={placeholder}
          valueClassName={valueClassName}
          placeholderClassName={placeholderClassName}
          endSlot={endSlot}
          startSlot={startSlot}
          valueSlot={valueSlot}
          withArrow={!readOnly}
          open={open}
          {...props}
        >
          {label}
        </SelectCombobox>
      )}>
      <SheetSelectProvider value={value} onSelect={onSelectOption} size={size}>
        <SheetSelectOptionList>
          {children}
        </SheetSelectOptionList>
      </SheetSelectProvider>
    </Sheet>
  )
}