'use client';

import { FocusEvent, HTMLAttributes, KeyboardEvent, MouseEvent, Ref, useLayoutEffect, useRef, useState } from 'react';
import {
  flip,
  offset,
  autoUpdate,
  useFloating,
  shift,
  size as matchSize,
} from '@floating-ui/react';
import { csx, findTabbable, mergeEventHandlers } from '@vega-ui/utils';
import styles from './style.module.css';
import { useControlledState, useFormReset, useMergeRefs, useSelection } from '@vega-ui/hooks';
import { useListbox } from '../internals/listbox';
import { SelectProvider } from './contexts';
import { ListboxContextState, ListboxProvider } from '../Listbox/contexts';
import { SelectSize, SelectVariant } from './types';

export interface SelectProps<V extends string | number = string> extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the select is disabled.
   * Prevents interaction and applies a disabled style.
   */
  disabled?: boolean

  /**
   * If true, the select cannot be changed but remains focusable.
   */
  readOnly?: boolean

  /**
   * Visual style variant for the select control.
   */
  variant?: SelectVariant

  /**
   * Visual size of the select control.
   */
  size?: SelectSize

  /**
   * The currently selected value (controlled).
   * `null` clears the selection, while `undefined` makes the select uncontrolled.
   */
  value?: V | null | undefined

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: V | undefined

  /**
   * Callback fired when an option is selected.
   *
   * @param value - The selected option value
   */
  onChangeValue?(value: V | null): void

  /**
   * Ref to the root element.
   */
  ref?: Ref<HTMLDivElement>
  
  /**
   * Controls the open state of the Select dropdown.
   *
   * When provided, the Select becomes a controlled component
   * and relies on this value to determine whether the listbox
   * is open or closed.
   */
  open?: boolean
  
  /**
   * Callback fired when the open state changes.
   *
   * Called with the next open state (`true` or `false`)
   * whenever the Select is opened or closed by user interaction.
   *
   * Useful for synchronizing the Select state with external logic.
   */
  onChangeOpen?(open: boolean): void
  
  /**
   * Sets the initial open state of the Select when used
   * in uncontrolled mode.
   *
   * Applied only on the first render and ignored afterward.
   */
  defaultOpen?: boolean
  
  /**
   * Enables moving to an option by typing the start of its label.
   *
   * @default true
   */
  typeahead?: boolean
}

/** A Select is a UI component that provides a dropdown menu of options from which users can choose one. It is commonly used for forms and filtering, offering a list of predefined values in a compact, accessible manner */
export const Select = <V extends string | number>({
  className,
  disabled,
  readOnly = false,
  children,
  variant = 'field',
  size = 'md',
  value,
  defaultValue,
  onChangeValue,
  open: _open,
  defaultOpen = false,
  typeahead = true,
  onChangeOpen,
  onBlur: _onBlur,
  ref,
  ...props
}: SelectProps<V>) => {
  const [valueElement, setValueElement] = useState<HTMLSpanElement | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const mergedRef = useMergeRefs([rootRef, ref])

  const { selected, select, isSelected } = useSelection<V, 'single'>({
    selection: 'single',
    defaultSelected: defaultValue ?? null,
    selected: value,
    onSelect: onChangeValue,
  })

  useFormReset(rootRef, () => {
    if (value !== undefined) return

    select((defaultValue ?? null) as V)
  })

  const placement = variant === 'inline' ? 'bottom' : 'bottom-start'
  const enabled = !disabled && !readOnly

  const [openState, setOpen] = useControlledState(_open, defaultOpen, onChangeOpen);
  const open = enabled && openState

  const { refs, elements, floatingStyles, update } = useFloating({
    open,
    placement,
    strategy: 'fixed',
    transform: false,
    middleware: [
      offset(10),
      flip(),
      shift(),
      matchSize({
        apply: ({ rects, elements }) => {
          elements.floating.style.minWidth = `${rects.reference.width}px`
        },
      }),
    ],
  });

  useLayoutEffect(() => {
    if (!open || !elements.reference || !elements.floating) return

    return autoUpdate(elements.reference, elements.floating, update)
  }, [open, elements.reference, elements.floating, update])

  const focusCombobox = () => {
    if (elements.domReference instanceof HTMLElement) elements.domReference.focus()
  }

  const onSelect = (next: V) => {
    setOpen(false)
    select(next)
  }

  const list = useListbox(refs.floating, {
    typeahead,
    isSelected: isSelected as ListboxContextState['isSelected'],
    onSelect: onSelect as ListboxContextState['onSelect'],
  })

  const { store, activate } = list

  useLayoutEffect(() => {
    if (!open) {
      store.setActive(undefined)
      return
    }

    activate()
  }, [open, activate, store])

  const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (!enabled || event.button !== 0) return

    event.preventDefault()
    event.currentTarget.focus()
    setOpen(!open)
  }

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (enabled && event.detail === 0) setOpen(!open)
  }

  const onKeyDownOpen = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.altKey && event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(false)
      return
    }

    if (event.key === 'Tab') {
      if (!event.shiftKey && refs.floating.current && findTabbable(refs.floating.current)) return

      const { activeId, activeSource } = store.get()
      if (activeSource !== 'keyboard' || !activeId) return

      const item = store.getItem(activeId)
      if (item && !item.disabled) select(item.value as V)
      return
    }

    list.navigate(event)
  }

  const onKeyDownClosed = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.ctrlKey || event.metaKey) return

    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault()
      setOpen(true)
      return
    }

    if (list.move(event)) setOpen(true)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!enabled) return

    if (open) onKeyDownOpen(event)
    else onKeyDownClosed(event)
  }

  const onKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ') event.preventDefault()
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }

  return (
    <SelectProvider
      size={size}
      variant={variant}
      open={open}
      changeOpen={setOpen}
      disabled={disabled}
      readOnly={readOnly}
      valueElement={valueElement}
      setValueElement={setValueElement}
      selected={selected}
      comboboxProps={{ onMouseDown, onClick, onKeyDown, onKeyUp }}
      setReference={refs.setReference}
      focusCombobox={focusCombobox}
      setFloating={refs.setFloating}
      listboxStyles={floatingStyles}
    >
      <ListboxProvider
        id={list.id}
        store={store}
        isSelected={isSelected as ListboxContextState['isSelected']}
        onSelect={onSelect as ListboxContextState['onSelect']}
        size={size}
        disabled={disabled}
      >
        <div
          data-size={size}
          className={csx(styles.select, className)}
          ref={mergedRef}
          onBlur={mergeEventHandlers(onBlur, _onBlur)}
          {...props}
        >
          {children}
        </div>
      </ListboxProvider>
    </SelectProvider>
  )
}
