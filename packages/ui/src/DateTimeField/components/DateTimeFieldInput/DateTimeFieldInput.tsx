import { FC, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { ROOT } from '@vega-ui/core';
import { useOutput } from '../../../internals/widget';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useDateTimeFieldContext } from '../../contexts';
import { defaultTextOf, dateTimeFieldWidget } from '@vega-ui/widgets/date-time-field';

export type DateTimeFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * DateTimeFieldInput — a masked text input for entering date and time values.
 *
 * Purpose:
 * Provides controlled text-based entry for a DateTimeField using an input mask,
 * while keeping the parsed date and time values synchronized with shared field state.
 *
 * This component represents the input side of the DateTimeField and works in
 * tandem with the calendar component to maintain a consistent date–time state.
 *
 * The date and time come from `DateTimeField`; `onChange` and `onInput` still
 * report each edit of the text.
 *
 * Like a native input, it submits the shown text under `name`. An incomplete
 * value, a value outside `min` and `max` and a day that is unavailable make
 * the input invalid through `setCustomValidity` with the message of the
 * browser, so `:invalid`, `reportValidity()` and the form submit check work
 * natively.
 */
export const DateTimeFieldInput: FC<DateTimeFieldInputProps> = ({ ref, ...props }) => {
  const { handle, disabled, readOnly } = useDateTimeFieldContext()
  const [defaultValue] = useState(() => defaultTextOf(handle.instance.state))
  const attrs = useOutput(handle, dateTimeFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.rootAt(ROOT, dateTimeFieldWidget.output.root), ref])

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
