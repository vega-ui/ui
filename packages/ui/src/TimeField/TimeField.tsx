import { FC } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { TimeFieldProvider } from './contexts';

export interface TimeFieldProps extends TextFieldProps {
  /**
   * Time format used for input masking and parsing.
   * Defines which segments are shown and their order.
   *
   * Examples:
   * - "HH:MM"
   * - "HH:MM:SS"
   */
  format?: 'HH:MM' | 'HH:MM:SS'
  
  /**
   * Minimum allowed time.
   * Times earlier than this value cannot be selected
   * or will be clamped/rejected during input parsing.
   *
   * Format must match the chosen `format`:
   * - "HH:MM"
   * - "HH:MM:SS"
   */
  min?: `${string}:${string}` | `${string}:${string}:${string}`
  
  /**
   * Maximum allowed time.
   * Times later than this value cannot be selected
   * or will be clamped/rejected during input parsing.
   *
   * Format must match the chosen `format`:
   * - "HH:MM"
   * - "HH:MM:SS"
   */
  max?: `${string}:${string}` | `${string}:${string}:${string}`
  
  /**
   * Step increment for adjusting time values in the input.
   * Defines how many minutes (or seconds if format is "HH:MM:SS") the
   * input should increase or decrease when using arrow keys or similar controls.
   *
   * Defaults to `1`.
   */
  step?: number
}

/**
 * TimeField — a high-level time input component that integrates a masked
 * text input with a shared context for time constraints and formatting.
 *
 * Purpose:
 * Provides a user-friendly way to enter times either by typing in a structured
 * format (`HH:MM` or `HH:MM:SS`) while enforcing optional minimum and maximum
 * time boundaries, and optional step increments.
 *
 * Features:
 * - Supports 24-hour time formats: `"HH:MM"` and `"HH:MM:SS"`.
 * - Optional `min` and `max` properties to restrict selectable times.
 *   - Accepts strings in the form `"HH:MM"` or `"HH:MM:SS"`.
 * - Optional `step` property to define minute/second increments.
 */
export const TimeField: FC<TimeFieldProps> = ({ min, max, format = 'HH:MM', step = 1, ...props }) => {
  return (
    <TimeFieldProvider
      max={max}
      min={min}
      format={format}
      step={step}
    >
      <TextField {...props} />
    </TimeFieldProvider>
  )
}