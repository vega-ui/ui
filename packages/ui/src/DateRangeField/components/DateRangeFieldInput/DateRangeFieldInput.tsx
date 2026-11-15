import { FC, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { ROOT } from '@vega-ui/core';
import { useOutput } from '../../../internals/widget';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useDateRangeFieldContext } from '../../contexts';
import { defaultTextOf, dateRangeFieldWidget } from '@vega-ui/widgets/date-range-field';

export type DateRangeFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * DateRangeFieldInput — the text input component for DateRangeField that
 * supports masked range entry.
 *
 * Purpose:
 * Provides a controlled text input for entering a start and end date, using
 * masking to enforce formatting and separators. The range comes from
 * `DateRangeField`; `onChange` and `onInput` still report each edit of the
 * text.
 *
 * Like a native input, it submits the shown text under `name`. A range
 * without a complete start or end, a date outside `min` and `max` and an
 * unavailable date make the input invalid through `setCustomValidity` with
 * the message of the browser, so `:invalid`, `reportValidity()` and the form
 * submit check work natively.
 */
export const DateRangeFieldInput: FC<DateRangeFieldInputProps> = ({ ref, ...props }) => {
  const { handle, disabled, readOnly } = useDateRangeFieldContext()
  const [defaultValue] = useState(() => defaultTextOf(handle.instance.state))
  const attrs = useOutput(handle, dateRangeFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.rootAt(ROOT, dateRangeFieldWidget.output.root), ref])

  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      readOnly={readOnly}
      defaultValue={defaultValue}
      ref={mergedRef}
      {...handle.listen(attrs, props)}
    />
  )
}
