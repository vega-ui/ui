'use client';
import { HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { ToggleGroupEntry, ToggleGroupSelected, toggleGroupWidget } from '@vega-ui/widgets/toggle-group';
import { useOutput, useWidget, widgetEnvironment } from '../internals/widget';
import { ButtonSize } from '../Button';
import { useToolbarContext } from '../Toolbar/contexts';
import { ToggleGroupProvider } from './contexts';
import { ToggleGroupValue } from './types';
import style from './style.module.css'

export interface ToggleGroupProps<Multiple extends boolean = false> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Lets every button turn on and off by itself, and makes the value an array.
   */
  multiple?: Multiple

  /**
   * The value of the pressed button, or the values of the pressed buttons with `multiple`. Enables controlled mode when set.
   */
  value?: Multiple extends true ? string[] : string | null

  /**
   * The value of the pressed button, or the values of the pressed buttons with `multiple`, on mount.
   */
  defaultValue?: Multiple extends true ? string[] : string | null

  /**
   * Called when a click, Enter or Space presses a button, or releases one with `multiple`.
   */
  onChangeValue?: (value: ToggleGroupValue<Multiple>) => void

  /**
   * Disables every button.
   */
  disabled?: boolean

  /**
   * Size of the buttons.
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Ref forwarded to the group element.
   */
  ref?: Ref<HTMLDivElement>
}

/** ToggleGroup is a set of ToggleGroupToggle: one is pressed at a time, as a radio group, or each turns on and off by itself with `multiple`. Inside a Toolbar its buttons join the arrow key navigation of the toolbar. */
export const ToggleGroup = <Multiple extends boolean = false>({
  multiple,
  value,
  defaultValue,
  onChangeValue,
  disabled = false,
  size = 'md',
  className,
  ref,
  ...props
}: ToggleGroupProps<Multiple>) => {
  const { inside } = useToolbarContext()
  const handle = useWidget(toggleGroupWidget, (items: readonly ToggleGroupEntry[]) => ({
    items,
    multiple: multiple === true,
    rovingFocus: !inside,
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: ToggleGroupSelected) => void) | undefined,
  }), widgetEnvironment)
  const attrs = useOutput(handle, toggleGroupWidget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <ToggleGroupProvider handle={handle} size={size} disabled={disabled}>
      <div
        ref={rootRef}
        className={csx(style.group, className)}
        {...handle.listen(attrs, props)}
      />
    </ToggleGroupProvider>
  )
}
