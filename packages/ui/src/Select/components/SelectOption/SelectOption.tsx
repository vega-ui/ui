'use client';
import { useSelectContext, useSelectOptionsContext } from '../../contexts';
import { Option, OptionProps } from '../../../Option';
import { useListItem } from '@floating-ui/react';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { createPortal } from 'react-dom';
import { useLayoutEffect, useRef } from 'react';

export type SelectOptionProps<V> = OptionProps<V>

/** The SelectOption component represents a single selectable item within a Select dropdown, supporting optional selection state, focusability, custom content, and ARIA roles for accessibility compliance */
export const SelectOption = <V extends string | number>({
  value,
  children,
  disabled,
  onClick: _onClick,
  ...props
}: SelectOptionProps<V>) => {
  const { onSelect, activeIndex, size, disabled: _disabled, itemProps, isSelected, valueRef, hasValueChildren } = useSelectContext()
  const { addOption, removeOption } = useSelectOptionsContext()
  
  const optionRef = useRef<HTMLButtonElement>(null)
  const { ref, index } = useListItem();
  
  const onClick = () => {
    onSelect?.(index, value)
  }
  const selected = isSelected(value)
  const focusable = activeIndex === index
  const disabledOption = disabled ?? _disabled
  
  useLayoutEffect(() => {
    const label = optionRef.current?.textContent ?? ''
    addOption({ value, disabled: disabledOption, label, index })
    
    return () => removeOption({ value, disabled: disabledOption, label, index })
  }, [value, disabledOption, index, addOption, removeOption])
  
  return (
    <>
      <Option
        size={size}
        value={value}
        selected={selected}
        focusable={focusable}
        ref={mergeRefs([ref, optionRef])}
        {...itemProps({ ...props, onClick: mergeEventHandlers(onClick, _onClick) })}
      >
        {children}
      </Option>
      {selected && valueRef?.current && !hasValueChildren ? createPortal(children, valueRef.current) : null}
    </>
  )
}