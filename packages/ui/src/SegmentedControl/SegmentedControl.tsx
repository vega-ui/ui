'use client';

import { ChangeEvent, CSSProperties, FC, HTMLAttributes, Ref, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { SegmentedControlProvider } from './contexts';
import { SegmentedControlSize, SegmentedControlValue, SegmentedControlVariant } from './types';
import { useControlledState, useRefMap, useResizeObserver } from '@vega-ui/hooks';
import styles from './style.module.css';

export interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Disables all segments, preventing user interaction.
   */
  disabled?: boolean

  /**
   * Visual size of the segmented control.
   */
  size?: SegmentedControlSize

  /**
   * Visual style variant of the segmented control.
   */
  variant?: SegmentedControlVariant

  /**
   * Ref to the root container element.
   * Useful for measuring or controlling focus.
   */
  ref?: Ref<HTMLDivElement>
  
  /**
   * The currently selected value of the segmented control
   */
  value?: SegmentedControlValue
  
  /**
   * The initial selected value when the component is used in an uncontrolled mode
   */
  defaultValue?: SegmentedControlValue
  
  /**
   * Fired when the selected segment changes.
   *
   * This event mirrors the native `change` event of a radio input and
   * can be used to integrate with forms or listen for user selection.
   *
   * The event target is the underlying hidden `<input type="radio">`.
   */
  onChange?(e: ChangeEvent<HTMLInputElement>): void
  
  /**
   * The name of the underlying radio group.
   *
   * All `SegmentedControlItemHiddenInput` elements share this name,
   * allowing the segmented control to behave as a single native
   * radio group for form submission and accessibility.
   */
  name: string
}

/** A Segmented Control is a UI component that displays a set of options in a horizontal layout, where each option is a "segment." Users can select one segment to toggle between different views or settings, offering a compact alternative to multiple buttons or switches */
export const SegmentedControl: FC<SegmentedControlProps> = ({
  ref,
  size = 'md',
  disabled,
  className,
  variant = 'secondary',
  value: _value,
  defaultValue = '',
  onChange: _onChange,
  name,
  style,
  ...props
}) => {
  const [value, setValue] = useControlledState(_value, defaultValue)
  
  const controlRef = useRef<HTMLDivElement>(null)
  const { itemRef, getItem } = useRefMap<SegmentedControlValue, HTMLLabelElement>()
  
  const [indicatorSize, setIndicatorSize] = useState(0)
  const [indicatorOffsetLeft, setIndicatorOffsetLeft] = useState(0)
  
  const syncIndicatorParams = useCallback((value: SegmentedControlValue) => {
    const item = getItem(value)
    if (!item) return;

    setIndicatorOffsetLeft(item.offsetLeft)
    setIndicatorSize(item.clientWidth)
  }, [getItem])
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
  }
  
  useLayoutEffect(() => {
    if (value !== undefined) syncIndicatorParams(value)
  }, [value, syncIndicatorParams])
  
  useResizeObserver(controlRef, () => syncIndicatorParams(value))
  
  const properties = {
    ...style,
    '--segmented-control-indicator-size': indicatorSize + 'px',
    '--segmented-control-indicator-offset': indicatorOffsetLeft + 'px'
  } as CSSProperties
  
  return (
    <SegmentedControlProvider
      variant={variant}
      size={size}
      disabled={disabled}
      onChange={mergeEventHandlers(_onChange, onChange)}
      selected={value}
      itemRef={itemRef}
      name={name}
    >
      <div
        ref={mergeRefs([ref, controlRef])}
        data-size={size}
        data-variant={variant}
        className={csx(styles.segmentedControl, className)}
        style={properties}
        {...props}
      />
    </SegmentedControlProvider>
  );
}
