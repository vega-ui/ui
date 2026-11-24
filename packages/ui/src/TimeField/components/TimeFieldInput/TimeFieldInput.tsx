import { FC, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { ROOT } from '@vega-ui/core';
import { useOutput } from '../../../internals/widget';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useTimeFieldContext } from '../../contexts';
import { defaultTextOf, timeFieldWidget } from '@vega-ui/widgets/time-field';

export type TimeFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * TimeFieldInput — the masked text input of a TimeField.
 *
 * The time comes from `TimeField`; `onChange` and `onInput` still report
 * each edit of the text. An incomplete time and a time outside `min` and
 * `max` make the input invalid through `setCustomValidity` with the message
 * of the browser, so `:invalid`, `reportValidity()` and the form submit check
 * work natively.
 */
export const TimeFieldInput: FC<TimeFieldInputProps> = ({ ref, ...props }) => {
  const { handle, disabled, readOnly } = useTimeFieldContext()
  const [defaultValue] = useState(() => defaultTextOf(handle.instance.state))
  const attrs = useOutput(handle, timeFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.rootAt(ROOT, timeFieldWidget.output.root), ref])

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
