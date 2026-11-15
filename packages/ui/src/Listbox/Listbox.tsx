'use client';

import { HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useWidget, widgetEnvironment } from '../internals/widget';
import { ListboxEntry, ListboxSelected, listboxWidget } from '@vega-ui/widgets/listbox'
import { ListboxProvider } from './contexts';
import { OptionSize } from '../Option';
import { ListboxValue } from './types';
import styles from './style.module.css';

export interface ListboxProps<Value extends string | number = string, Multiple extends boolean = false> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Allows selecting several options.
   * Determines the structure of `value`: an array when true.
   */
  multiple?: Multiple

  /**
   * The currently selected value (controlled).
   * Without `multiple`, `null` clears the selection, while `undefined` makes the list uncontrolled.
   */
  value?: Multiple extends true ? Value[] : Value | null

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: ListboxValue<Value, Multiple>

  /**
   * Callback fired when the selection changes.
   *
   * @param value - The selected value, shaped by `multiple`
   */
  onChangeValue?(value: ListboxValue<Value, Multiple>): void

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
export const Listbox = <Value extends string | number, Multiple extends boolean = false>({
  multiple,
  value,
  defaultValue,
  onChangeValue,
  disabled = false,
  size = 'md',
  typeahead = true,
  className,
  children,
  ref,
  ...props
}: ListboxProps<Value, Multiple>) => {
  const handle = useWidget(listboxWidget, (items: readonly ListboxEntry[]) => ({
    items,
    mode: multiple ? ('multiple' as const) : ('single' as const),
    disabled,
    typeahead,
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: ListboxSelected) => void) | undefined,
  }), widgetEnvironment)
  const attrs = useOutput(handle, listboxWidget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <ListboxProvider handle={handle} size={size} disabled={disabled}>
      <div ref={rootRef} className={csx(styles.listbox, className)} {...handle.listen(attrs, props)}>
        {children}
      </div>
    </ListboxProvider>
  )
}
