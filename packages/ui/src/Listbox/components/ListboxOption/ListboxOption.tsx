'use client';

import { MouseEvent, PointerEvent, useId } from 'react';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useRegistryItem } from '@vega-ui/react-kit/registry';
import { useStore } from '@vega-ui/react-kit/store';
import { Option, OptionProps } from '../../../Option';
import { useListboxContext } from '../../contexts';
import { ListboxItemData, ListboxState } from '../../../internals/listbox';

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
  onClick: _onClick,
  onPointerMove: _onPointerMove,
  ref,
  ...props
}: ListboxOptionProps<V>) => {
  const {
    size: listSize,
    disabled: listDisabled,
    store,
    isSelected,
    onSelect,
  } = useListboxContext()

  const id = useId()
  const optionDisabled = disabled || listDisabled
  const active = useStore<ListboxState, boolean>(store, (state) => state.activeId === id)
  const optionRef = useRegistryItem<ListboxItemData, HTMLDivElement>(store, id, { value, disabled: optionDisabled, label })

  const onClick = () => {
    onSelect(value)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && !optionDisabled && !active) store.setActive(id, 'pointer')
  }

  return (
    <Option
      size={size ?? listSize}
      active={active}
      selected={isSelected(value)}
      disabled={optionDisabled}
      onClick={mergeEventHandlers<MouseEvent<HTMLDivElement>>(onClick, _onClick)}
      onPointerMove={mergeEventHandlers(onPointerMove, _onPointerMove)}
      ref={mergeRefs([optionRef, ref])}
      {...props}
      id={id}
    />
  )
}
