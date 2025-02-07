'use client';

import { Children, FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { OptionProps, SelectCombobox, SelectComboboxProps, Sheet, TextField } from '@adara-cs/ui-kit-web';
import { useControlledState } from '@adara-cs/hooks';
import { SheetSelectOptionList } from './components';
import { SheetSelectProvider } from './providers';
import style from './style.module.css'

export interface SheetSelectProps extends SelectComboboxProps {
  searchFieldClassName?: string
  filterable?: boolean
  value?: string | number | undefined
  defaultValue?: string | number | undefined
  onSelect?(value: string | number | undefined): void
  children?: ReactElement<OptionProps> | ReactElement<OptionProps>[]
  filterFieldPlaceholder?: string
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
  searchFieldClassName,
  endSlot,
  startSlot,
  valueSlot,
  onSelect,
  filterable = true,
  filterFieldPlaceholder,
  value: controlledValue,
  defaultValue,
  children,
}) => {
  const [value, setValue] = useControlledState(controlledValue, defaultValue, onSelect)
  const [searchValue, setSearchValue] = useState('')
  const [open, setOpen] = useState<boolean | undefined>(false)

  const enabled = !disabled && !readOnly

  useEffect(() => {
    if (!open) setSearchValue('')
  }, [open]);

  const options = useMemo(() =>
      Children.count(children) !== 0
        ? Children.map(children, (child) => ({
          label: child?.props.children ?? '',
          value: child?.props.value ?? ''
        }))
        : [], [children]
  )

  const filteredOptions = useMemo(() => {
    if (!searchValue) return children

    const childrenArray = Children.toArray(children) as ReactElement<OptionProps>[]
    const getLabel = (child: ReactElement<OptionProps>) => Array.isArray(child.props.children)
      ? child.props.children.filter(v => typeof v === 'string').join(' ')
      : child.props.children as string

    return childrenArray.filter((child) => getLabel(child)?.toLowerCase().includes(searchValue.toLowerCase()))
  }, [searchValue]) as ReactElement<OptionProps>[]

  const onSelectOption = (value: number | string | undefined) => {
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
      headerSlot={filterable && <TextField className={searchFieldClassName} value={searchValue}
                                            onChange={(e) => setSearchValue(e.currentTarget.value)} placeholder={filterFieldPlaceholder} />}
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
          {filteredOptions}
        </SheetSelectOptionList>
      </SheetSelectProvider>
    </Sheet>
  )
}