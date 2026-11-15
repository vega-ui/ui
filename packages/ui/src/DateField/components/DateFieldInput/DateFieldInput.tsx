import { FC, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { ROOT } from '@vega-ui/core';
import { useOutput } from '../../../internals/widget';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useDateFieldContext } from '../../contexts';
import { defaultTextOf, dateFieldWidget } from '@vega-ui/widgets/date-field';

export type DateFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * DateFieldInput — a masked date text input used inside DateField.
 *
 * Applies a date mask based on the current format, separator and calendar
 * system. The date comes from `DateField`; `onChange` and `onInput` still
 * report each edit of the text.
 *
 * Like a native input, it submits the shown text under `name`. An incomplete
 * date, a date outside `min` and `max` and an unavailable date make the input
 * invalid through `setCustomValidity` with the message of the browser, so
 * `:invalid`, `reportValidity()` and the form submit check work natively.
 */
export const DateFieldInput: FC<DateFieldInputProps> = ({ ref, ...props }) => {
  const { handle, disabled, readOnly } = useDateFieldContext()
  const [defaultValue] = useState(() => defaultTextOf(handle.instance.state))
  const attrs = useOutput(handle, dateFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.rootAt(ROOT, dateFieldWidget.output.root), ref])

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
