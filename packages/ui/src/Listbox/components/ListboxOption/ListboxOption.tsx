'use client';

import { useCallback, useId } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import { Option, OptionProps } from '../../../Option';
import { useListboxContext } from '../../contexts'
import { optionPart } from '@vega-ui/widgets/listbox';

export interface ListboxOptionProps<V> extends Omit<OptionProps, 'id' | 'selected' | 'active'> {
  /**
   * The value of this option, passed to the change callback when it is selected.
   */
  value: V

  /**
   * Plain text of this option for typeahead, used instead of the text of its content.
   */
  label?: string
}

/** A ListboxOption is a single choice of a Listbox or a Select: it registers in the list, which owns selection and keyboard navigation */
export const ListboxOption = <V extends string | number>({
  value,
  label,
  size,
  disabled,
  ref,
  ...props
}: ListboxOptionProps<V>) => {
  const { handle, size: listSize, disabled: listDisabled } = useListboxContext()
  const key = useId()
  const optionDisabled = disabled || listDisabled
  const register = useCallback(
    (element: HTMLElement | null) => handle.elements.setItem(key, element, element ? { value, disabled: optionDisabled, label: label ?? element.textContent ?? '' } : undefined),
    [handle, key, value, optionDisabled, label],
  )
  const attrs = useOutput(handle, optionPart, key)
  const optionRef = useMergeRefs([register, ref])

  return <Option size={size ?? listSize} disabled={optionDisabled} ref={optionRef} {...handle.merge(attrs, props)} />
}
