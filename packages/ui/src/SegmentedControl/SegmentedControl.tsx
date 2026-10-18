'use client';

import { ChangeEvent, FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { SegmentedControlProvider } from './contexts';
import { SegmentedControlSize, SegmentedControlValue, SegmentedControlVariant } from './types';
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
  value,
  defaultValue = '',
  onChange,
  name,
  ...props
}) => {
  return (
    <SegmentedControlProvider
      variant={variant}
      size={size}
      disabled={disabled}
      onChange={onChange}
      selected={value}
      defaultSelected={defaultValue}
      name={name}
    >
      <div
        ref={ref}
        data-size={size}
        data-variant={variant}
        className={csx(styles.segmentedControl, className)}
        {...props}
      />
    </SegmentedControlProvider>
  );
}
