'use client';
import { createPortal } from 'react-dom';
import { useSelectContext } from '../../contexts';
import { ListboxOption, ListboxOptionProps } from '../../../Listbox';

export type SelectOptionProps<Value> = ListboxOptionProps<Value>

/** The SelectOption component represents a single selectable item within a Select dropdown, supporting optional selection state, custom content, and ARIA roles for accessibility compliance */
export const SelectOption = <Value extends string | number>({ children, ...props }: SelectOptionProps<Value>) => {
  const { selected, valueElement } = useSelectContext()

  return (
    <>
      <ListboxOption {...props}>{children}</ListboxOption>
      {selected === props.value && valueElement ? createPortal(children, valueElement) : null}
    </>
  )
}
