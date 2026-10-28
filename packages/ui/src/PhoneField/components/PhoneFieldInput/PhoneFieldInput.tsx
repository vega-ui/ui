import { FC, FormEvent } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { usePhoneFieldContext } from '../../contexts';

export type PhoneFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * `PhoneFieldInput` is the input element used within `PhoneField`.
 *
 * It renders a telephone input based on `TextFieldInput`, applies the appropriate
 * `type` and `inputMode` for numeric phone entry, and forwards refs to the
 * underlying native input. The number comes from `PhoneField`; `onChange` and
 * `onInput` still report each edit of the text.
 */
export const PhoneFieldInput: FC<PhoneFieldInputProps> = ({ ref, onInput, ...props }) => {
  const { inputRef, phone, changePhone } = usePhoneFieldContext()

  const onPhoneInput = (event: FormEvent<HTMLInputElement>) => changePhone?.(event.currentTarget.value)

  return (
    <TextFieldInput
      type='tel'
      inputMode='tel'
      value={phone}
      onInput={mergeEventHandlers(onPhoneInput, onInput)}
      ref={mergeRefs([inputRef, ref])}
      {...props}
    />
  )
}