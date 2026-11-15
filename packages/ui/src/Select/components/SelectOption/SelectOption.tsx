'use client';
import { createPortal } from 'react-dom';
import { useSelectContext } from '../../contexts';
import { ListboxOption, ListboxOptionProps } from '../../../Listbox';

export type SelectOptionProps<V> = ListboxOptionProps<V>

/** The SelectOption component represents a single selectable item within a Select dropdown, supporting optional selection state, custom content, and ARIA roles for accessibility compliance */
export const SelectOption = <V extends string | number>({ children, ...props }: SelectOptionProps<V>) => {
  const { selected, valueElement } = useSelectContext()

  return (
    <>
      <ListboxOption {...props}>{children}</ListboxOption>
      {selected === props.value && valueElement ? createPortal(children, valueElement) : null}
    </>
  )
}
