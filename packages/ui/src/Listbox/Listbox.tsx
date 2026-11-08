'use client';

import { FocusEvent, HTMLAttributes, KeyboardEvent, PointerEvent, Ref, useRef } from 'react';
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useEventCallback, useSelection } from '@vega-ui/hooks';
import { useStore } from '@vega-ui/react-kit/store';
import { ListboxItem, useListbox } from '../internals/listbox';
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
  const { select, toggle, isSelected, selected, selectMany } = useSelection<V, 'single' | 'multiple'>({
    selection: multiple ? 'multiple' : 'single',
    defaultSelected: defaultValue ?? (multiple ? [] : null),
    selected: value,
    onSelect: onChangeValue as (value: V | V[] | null | undefined) => void,
  })

  const listRef = useRef<HTMLDivElement>(null)
  const anchor = useRef<V>(undefined)

  const toggleAnchored = useEventCallback((next: V) => {
    anchor.current = next
    toggle(next)
  })

  const onSelect = multiple ? toggleAnchored : select
  const list = useListbox(listRef, {
    typeahead,
    isSelected: isSelected as ListboxContextState['isSelected'],
    onSelect: onSelect as ListboxContextState['onSelect'],
  })
  const activeId = useStore(list.store, (state) => state.activeId)

  const selectRange = (from: ListboxItem | undefined, to: ListboxItem) => {
    const items = list.store.getItems().filter((item) => !item.disabled)
    const start = from ? items.indexOf(from) : items.indexOf(to)
    const end = items.indexOf(to)
    const range = items.slice(Math.min(start, end), Math.max(start, end) + 1).map((item) => item.value as V)
    const current = selected as V[]

    selectMany([...current, ...range.filter((next) => !current.includes(next))])
    anchor.current = to.value as V
  }

  const onKeyDownMultiple = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = list.store.getItems().filter((item) => !item.disabled)
    const activeId = list.store.get().activeId
    const active = items.find((item) => item.id === activeId)
    const command = event.ctrlKey || event.metaKey

    if (command && !event.shiftKey && event.key.toLowerCase() === 'a') {
      const values = items.map((item) => item.value as V)
      const all = values.every((next) => isSelected(next))

      selectMany(all ? [] : values)
      return true
    }

    if (command && event.shiftKey && (event.key === 'Home' || event.key === 'End')) {
      const edge = event.key === 'Home' ? items[0] : items[items.length - 1]
      if (!edge) return false

      selectRange(active ?? edge, edge)
      list.moveActive(edge, 'keyboard')
      return true
    }

    if (event.shiftKey && event.key === ' ') {
      if (!active) return false

      const from = items.find((item) => item.value === anchor.current)
      selectRange(from ?? active, active)
      return true
    }

    if (event.shiftKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      if (list.move(event)) list.selectActive()
      return true
    }

    return false
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return

    if (multiple && onKeyDownMultiple(event)) {
      event.preventDefault()
      return
    }

    list.navigate(event)
  }

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) list.activate()
  }

  const onBlur = () => {
    list.store.setActive(undefined)
  }

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.matches(':focus')) list.store.setActive(undefined)
  }

  return (
    <ListboxProvider
      id={list.id}
      store={list.store}
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
        aria-activedescendant={activeId}
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
