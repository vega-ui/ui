'use client';

import { CSSProperties, HTMLAttributes, Ref, useEffect, useRef, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { getInitialIndex, getRowCount, SETTLE, WheelPickerEntry, WheelPickerValue, wheelPickerWidget } from '@vega-ui/widgets/wheel-picker';
import { SnapScroller } from '../../../SnapScroller';
import { useOutput, useWidget, widgetEnvironment } from '../../../internals/widget';
import { useWheelPickerContext, WheelPickerColumnProvider, WheelPickerOptionProvider } from '../../contexts';
import { getOptionElements, getOptionLabel, supportsScrollTimeline } from '../../helpers';
import { WheelPickerOptionProps } from '../WheelPickerOption';
import style from '../../style.module.css';

const scrollTimeline = supportsScrollTimeline()

export interface WheelPickerColumnProps<Value extends string | number> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * The value of the selected option, for a controlled column.
   */
  value?: Value | null

  /**
   * The value of the option selected at first, for an uncontrolled column. Without it the column starts at its first enabled option.
   */
  defaultValue?: Value | null

  /**
   * Called with the value of the option the column stops at after a scroll, and at once after a key.
   */
  onChangeValue?(value: NoInfer<Value>): void

  /**
   * If true, the column goes on past its last option to the first one and back, like a dial.
   * @default false
   */
  loop?: boolean

  /**
   * If true, the column does not turn and leaves the Tab order.
   * @default false
   */
  disabled?: boolean

  /**
   * If true, the column stays focusable but does not turn.
   * @default false
   */
  readOnly?: boolean

  /**
   * If true, the column takes the focus once it mounts, like a native control with `autofocus`, for example as the first column in a popover.
   */
  autoFocus?: boolean

  /**
   * Ref forwarded to the spinbutton element.
   */
  ref?: Ref<HTMLDivElement>
}

/** WheelPickerColumn is one wheel of a WheelPicker: a spinbutton over its WheelPickerOption children that turns with a swipe, the wheel of the mouse or the keys. Name it with aria-label or aria-labelledby */
export const WheelPickerColumn = <Value extends string | number>({
  value,
  defaultValue,
  onChangeValue,
  loop = false,
  disabled = false,
  readOnly = false,
  autoFocus,
  children,
  ref,
  ...props
}: WheelPickerColumnProps<Value>) => {
  const { rows } = useWheelPickerContext()
  const options = getOptionElements<WheelPickerOptionProps<Value>>(children)
  const items: WheelPickerEntry[] = options.map((option, position) => ({
    key: position,
    data: { value: option.props.value, disabled: option.props.disabled, label: option.props.label ?? getOptionLabel(option.props.children, option.props.value) },
  }))
  const total = getRowCount(options.length, loop)
  const [initial] = useState(() => getInitialIndex(items, value ?? defaultValue, loop))

  const handle = useWidget(wheelPickerWidget, {
    items,
    loop,
    page: rows,
    scrollTimeline,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: WheelPickerValue | null) => void) | undefined,
  }, widgetEnvironment)
  const attrs = useOutput(handle, wheelPickerWidget.output.root)
  const element = useRef<HTMLDivElement>(null)
  const columnRef = useMergeRefs([handle.root, element, ref])

  useEffect(() => {
    if (autoFocus) element.current?.focus()
  }, [autoFocus])

  const onSettle = (_element: HTMLElement, index: number) => handle.send(createInput(SETTLE, { key: index }))

  return (
    <WheelPickerColumnProvider handle={handle}>
      <SnapScroller
        ref={columnRef}
        orientation='vertical'
        tabIndex={disabled ? -1 : 0}
        defaultIndex={initial}
        onScrollSnapChange={onSettle}
        {...handle.listen({
          ...attrs,
          className: loop ? style.column : csx(style.column, style.bounded),
          style: { '--wheel-picker-center': initial } as CSSProperties,
        }, props)}
      >
        {Array.from({ length: total }, (_, row) => (
          <WheelPickerOptionProvider key={row} index={row} label={items[row % items.length].data.label}>{options[row % options.length]}</WheelPickerOptionProvider>
        ))}
      </SnapScroller>
    </WheelPickerColumnProvider>
  )
}
