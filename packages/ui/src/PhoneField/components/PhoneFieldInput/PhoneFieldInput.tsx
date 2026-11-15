import { FC, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { ROOT } from '@vega-ui/core';
import { useOutput } from '../../../internals/widget';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { usePhoneFieldContext } from '../../contexts';
import { defaultTextOf, phoneFieldWidget } from '@vega-ui/widgets/phone-field';

export type PhoneFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * `PhoneFieldInput` is the input element used within `PhoneField`.
 *
 * It renders a telephone input based on `TextFieldInput`, applies the appropriate
 * `type` and `inputMode` for numeric phone entry, and forwards refs to the
 * underlying native input. The number comes from `PhoneField`; `onChange` and
 * `onInput` still report each edit of the text.
 *
 * Like a native input, it submits the shown text under `name`. A number too
 * short or too long for its country, and a `required` input that shows only
 * the calling code, make the input invalid through `setCustomValidity` with
 * the message of the browser, so `:invalid`, `reportValidity()` and the form
 * submit check work natively.
 */
export const PhoneFieldInput: FC<PhoneFieldInputProps> = ({ ref, ...props }) => {
  const { handle, disabled } = usePhoneFieldContext()
  const [defaultValue] = useState(() => defaultTextOf(handle.instance.state))
  const attrs = useOutput(handle, phoneFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.rootAt(ROOT, phoneFieldWidget.output.root), ref])

  return (
    <TextFieldInput
      type='tel'
      inputMode='tel'
      disabled={disabled}
      defaultValue={defaultValue}
      ref={mergedRef}
      {...handle.listen(attrs, props)}
    />
  )
}
