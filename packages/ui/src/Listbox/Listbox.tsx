'use client';

import { FocusEvent, HTMLAttributes, KeyboardEvent, PointerEvent, Ref, useRef } from 'react';
import { csx, isActivationKey, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useSelection } from '@vega-ui/hooks';
import { useListbox } from './hooks';
import { ListboxProvider, ListboxContextState } from './contexts';
import { OptionSize } from '../Option';
import { ListboxValue } from './types';
import styles from './style.module.css';

export interface ListboxProps<V extends string | number = string, M extends boolean = false> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Allows selecting several options.
   * Determines the structure of `value`: an array when true.
   */
  multiple?: M

  /**
   * The currently selected value (controlled).
   * Without `multiple`, `null` clears the selection, while `undefined` makes the list uncontrolled.
   */
  value?: M extends true ? V[] : V | null

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: ListboxValue<V, M>

  /**
   * Callback fired when the selection changes.
   *
   * @param value - The selected value, shaped by `multiple`
   */
  onChangeValue?(value: ListboxValue<V, M>): void

  /**
   * Prevents interaction and removes the list from the tab order.
   */
  disabled?: boolean

  /**
   * Visual size of the options.
   */
  size?: OptionSize

  /**
   * Enables moving to an option by typing the start of its label.
   *
   * @default true
   */
  typeahead?: boolean

  /**
   * Ref forwarded to the listbox element.
   */
  ref?: Ref<HTMLDivElement>
}

/** A Listbox shows a list of options to choose one or several from, always visible, like a native `select` with `size`. The focus stays on the list, which points to the active option with `aria-activedescendant`. Name it with `aria-labelledby` or `aria-label` */
export const Listbox = <V extends string | number, M extends boolean = false>({
  multiple,
  value,
  defaultValue,
  onChangeValue,
  disabled,
  size = 'md',
  typeahead = true,
  className,
  children,
  onKeyDown: _onKeyDown,
  onFocus: _onFocus,
  onBlur: _onBlur,
  onPointerLeave: _onPointerLeave,
  ref,
  ...props
}: ListboxProps<V, M>) => {
  const { select, toggle, isSelected } = useSelection<V, 'single' | 'multiple'>({
    selection: multiple ? 'multiple' : 'single',
    defaultSelected: defaultValue ?? (multiple ? [] : null),
    selected: value,
    onSelect: onChangeValue as (value: V | V[] | null | undefined) => void,
  })

  const onSelect = multiple ? toggle : select

  const listRef = useRef<HTMLDivElement>(null)
  const list = useListbox(listRef, { typeahead })

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || list.move(event) !== null || !isActivationKey(event)) return

    event.preventDefault()
    list.selectActive()
  }

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) list.activate()
  }

  const onBlur = () => {
    list.setActiveId(undefined)
  }

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.matches(':focus')) list.setActiveId(undefined)
  }

  return (
    <ListboxProvider
      id={list.id}
      activeId={list.activeId}
      getOptionId={list.getOptionId}
      setActiveId={list.setActiveId}
      clearActive={list.clearActive}
      isSelected={isSelected as ListboxContextState['isSelected']}
      onSelect={onSelect as ListboxContextState['onSelect']}
      size={size}
      disabled={disabled}
    >
      <div
        role='listbox'
        tabIndex={disabled ? undefined : 0}
        aria-disabled={disabled}
        aria-multiselectable={multiple}
        aria-activedescendant={list.activeId}
        ref={mergeRefs([listRef, ref])}
        className={csx(styles.listbox, className)}
        onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
        onFocus={mergeEventHandlers(onFocus, _onFocus)}
        onBlur={mergeEventHandlers(onBlur, _onBlur)}
        onPointerLeave={mergeEventHandlers(onPointerLeave, _onPointerLeave)}
        {...props}
      >
        {children}
      </div>
    </ListboxProvider>
  )
}
