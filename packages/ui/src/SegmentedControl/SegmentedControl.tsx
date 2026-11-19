'use client';

import { HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { SegmentedControlProvider } from './contexts';
import { SegmentedControlSize, SegmentedControlValue, SegmentedControlVariant } from './types';
import styles from './style.module.css';

export interface SegmentedControlProps<Value extends SegmentedControlValue = SegmentedControlValue> extends HTMLAttributes<HTMLDivElement> {
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
  value?: Value
  
  /**
   * The initial selected value when the component is used in an uncontrolled mode
   */
  defaultValue?: NoInfer<Value>
  
  /**
   * Called with the value of the item the user selects. Like the native `change` event bubbling to the root, it
   * does not run when the `onChange` of the `SegmentedControlItemInput` stops the propagation. `preventDefault`
   * cannot undo the choice, because the radio is checked before `change`: to turn a choice down, keep the
   * previous `value` in controlled mode. The root's own `onChange` is the native `change` event that bubbles
   * from the radio input.
   */
  onChangeValue?: (value: Value) => void
  
  /**
   * The name of the underlying radio group.
   *
   * All `SegmentedControlItemInput` elements share this name,
   * allowing the segmented control to behave as a single native
   * radio group for form submission and accessibility.
   */
  name: string
}

/** A Segmented Control is a UI component that displays a set of options in a horizontal layout, where each option is a "segment." Users can select one segment to toggle between different views or settings, offering a compact alternative to multiple buttons or switches */
export const SegmentedControl = <Value extends SegmentedControlValue = SegmentedControlValue>({
  ref,
  size = 'md',
  disabled,
  className,
  variant = 'secondary',
  value,
  defaultValue,
  onChangeValue,
  name,
  ...props
}: SegmentedControlProps<Value>) => {
  return (
    <SegmentedControlProvider
      variant={variant}
      size={size}
      disabled={disabled}
      onChangeValue={onChangeValue}
      selected={value}
      defaultSelected={defaultValue}
      name={name}
    >
      <div
        ref={ref}
        role='radiogroup'
        data-size={size}
        data-variant={variant}
        className={csx(styles.segmentedControl, className)}
        {...props}
      />
    </SegmentedControlProvider>
  );
}
