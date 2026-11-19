'use client';

import { HTMLAttributes, Ref, useId, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { csx } from '@vega-ui/utils';
import styles from './style.module.css';
import { useMergeRefs } from '@vega-ui/hooks';
import { useSnapshot, useWidget, widgetEnvironment } from '../internals/widget';
import { anchorNameOf } from '../internals/anchor';
import { ListboxEntry, ListboxValue } from '@vega-ui/widgets/listbox'
import { ListboxProvider } from '../Listbox/contexts';
import { FOCUS_COMBOBOX, isShown, selectWidget } from '@vega-ui/widgets/select';
import { SelectProvider } from './contexts';
import { SelectSize, SelectVariant } from './types';

export interface SelectProps<Value extends string | number = string> extends HTMLAttributes<HTMLDivElement> {
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
  value?: Value | null | undefined

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: NoInfer<Value> | undefined

  /**
   * Callback fired when an option is selected.
   *
   * @param value - The selected option value
   */
  onChangeValue?(value: Value | null): void

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

const readValue = (state: typeof selectWidget.shape.__snapshot) => state.value

/** A Select is a UI component that provides a dropdown menu of options from which users can choose one. It is commonly used for forms and filtering, offering a list of predefined values in a compact, accessible manner */
export const Select = <Value extends string | number>({
  className,
  disabled = false,
  readOnly = false,
  children,
  variant = 'field',
  size = 'md',
  value,
  defaultValue,
  onChangeValue,
  open: openProp,
  defaultOpen,
  typeahead = true,
  onChangeOpen,
  ref,
  ...props
}: SelectProps<Value>) => {
  const [valueElement, setValueElement] = useState<HTMLSpanElement | null>(null)
  const handle = useWidget(selectWidget, (items: readonly ListboxEntry[]) => ({
    items,
    disabled,
    readOnly,
    typeahead,
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: ListboxValue | null) => void) | undefined,
    open: openProp,
    defaultOpen,
    onChangeOpen,
  }), widgetEnvironment)
  const selected = useSnapshot(handle, readValue)
  const open = useSnapshot(handle, isShown)
  const mergedRef = useMergeRefs([handle.root, ref])

  const anchorName = anchorNameOf(useId())

  const focusCombobox = () => void handle.send(createInput(FOCUS_COMBOBOX))

  return (
    <SelectProvider
      handle={handle}
      size={size}
      variant={variant}
      open={open}
      disabled={disabled}
      readOnly={readOnly}
      valueElement={valueElement}
      setValueElement={setValueElement}
      selected={selected}
      anchorName={anchorName}
      focusCombobox={focusCombobox}
    >
      <ListboxProvider handle={handle} size={size} disabled={disabled}>
        <div
          data-size={size}
          className={csx(styles.select, className)}
          ref={mergedRef}
          {...handle.listen({}, props)}
        >
          {children}
        </div>
      </ListboxProvider>
    </SelectProvider>
  )
}
