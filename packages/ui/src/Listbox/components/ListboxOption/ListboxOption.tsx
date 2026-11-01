'use client';

import { MouseEvent, PointerEvent, useLayoutEffect } from 'react';
import { mergeEventHandlers } from '@vega-ui/utils';
import { Option, OptionProps } from '../../../Option';
import { useListboxContext } from '../../contexts';

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

/** A ListboxOption is a single choice of a Listbox or a Select: the list reads it from the DOM and owns selection and keyboard navigation */
export const ListboxOption = <V extends string | number>({
  value,
  label,
  size,
  disabled,
  onClick: _onClick,
  onPointerMove: _onPointerMove,
  ...props
}: ListboxOptionProps<V>) => {
  const {
    size: listSize,
    disabled: listDisabled,
    activeId,
    getOptionId,
    isSelected,
    onSelect,
    setActiveId,
    clearActive
  } = useListboxContext()

  const id = getOptionId(value)
  const active = id === activeId
  const optionDisabled = disabled || listDisabled

  useLayoutEffect(() => {
    if (!active) return undefined
    return () => clearActive(id)
  }, [active, id, clearActive])

  const onClick = () => {
    onSelect(value)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && !optionDisabled && !active) setActiveId(id)
  }

  return (
    <Option
      data-label={label}
      size={size ?? listSize}
      active={active}
      selected={isSelected(value)}
      disabled={optionDisabled}
      onClick={mergeEventHandlers<MouseEvent<HTMLDivElement>>(onClick, _onClick)}
      onPointerMove={mergeEventHandlers(onPointerMove, _onPointerMove)}
      {...props}
      id={id}
    />
  )
}
