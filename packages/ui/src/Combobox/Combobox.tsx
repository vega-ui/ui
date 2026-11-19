'use client';

import { HTMLAttributes, Ref, useId } from 'react';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { ListboxEntry, ListboxValue } from '@vega-ui/widgets/listbox';
import { ComboboxAutocomplete, comboboxWidget } from '@vega-ui/widgets/combobox';
import styles from './style.module.css';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { anchorNameOf } from '../internals/anchor';
import { ListboxProvider } from '../Listbox/contexts';
import { ComboboxProvider } from './contexts';
import { ComboboxSize } from './types';

export interface ComboboxProps<Value extends string | number = string> extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the combobox is disabled. Disables the input and keeps the list closed.
   */
  disabled?: boolean

  /**
   * If true, the text cannot be changed and the list stays closed, but the input remains focusable.
   */
  readOnly?: boolean

  /**
   * Size of the options and of the list corners.
   */
  size?: ComboboxSize

  /**
   * How the text and the list relate, as in `aria-autocomplete`, which the input gets:
   * `list` when the app filters the options by the text, `none` when the options stay the same,
   * `both` to also complete the text with the first matching option, its rest selected,
   * and `inline` to only complete it, leaving the list closed while typing.
   *
   * @default 'list'
   */
  autocomplete?: ComboboxAutocomplete

  /**
   * The value of the picked option (controlled).
   * `null` clears it, while `undefined` makes the combobox uncontrolled.
   */
  value?: Value | null | undefined

  /**
   * The value of the option picked initially (uncontrolled).
   */
  defaultValue?: NoInfer<Value> | undefined

  /**
   * Called when an option is picked, and with `null` when the text is edited or cleared.
   *
   * @param value - The value of the picked option
   */
  onChangeValue?(value: Value | null): void

  /**
   * Whether the list is open (controlled). The list is shown only while it has options.
   */
  open?: boolean

  /**
   * Whether the list is open initially (uncontrolled).
   */
  defaultOpen?: boolean

  /**
   * Called when the list opens or closes by user interaction.
   *
   * @param open - The next open state
   */
  onChangeOpen?(open: boolean): void

  /**
   * Ref to the root element.
   */
  ref?: Ref<HTMLDivElement>
}

/** A Combobox is a text input with a list of suggestions: typing opens the list, the arrow keys move through it, and picking an option writes its label into the input */
export const Combobox = <Value extends string | number>({
  className,
  style,
  disabled = false,
  readOnly = false,
  size = 'md',
  autocomplete = 'list',
  value,
  defaultValue,
  onChangeValue,
  open,
  defaultOpen,
  onChangeOpen,
  children,
  ref,
  ...props
}: ComboboxProps<Value>) => {
  const handle = useWidget(comboboxWidget, (items: readonly ListboxEntry[]) => ({
    items,
    disabled,
    readOnly,
    autocomplete,
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: ListboxValue | null) => void) | undefined,
    open,
    defaultOpen,
    onChangeOpen,
  }), widgetEnvironment)
  const mergedRef = useMergeRefs([handle.root, ref])
  const anchorName = anchorNameOf(useId())

  return (
    <ComboboxProvider handle={handle} anchorName={anchorName}>
      <ListboxProvider handle={handle} size={size} disabled={disabled} option={comboboxWidget.output.option}>
        <div
          data-size={size}
          className={csx(styles.combobox, className)}
          style={{ anchorName, ...style }}
          ref={mergedRef}
          {...handle.listen({}, props)}
        >
          {children}
        </div>
      </ListboxProvider>
    </ComboboxProvider>
  )
}
