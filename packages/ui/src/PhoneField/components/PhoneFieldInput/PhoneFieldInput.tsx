import { FC } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { usePhoneFieldContext } from '../../contexts';

export type PhoneFieldInputProps = TextFieldInputProps

/**
 * `PhoneFieldInput` is the input element used within `PhoneField`.
 *
 * It renders a telephone input based on `TextFieldInput`, applies the appropriate
 * `type` and `inputMode` for numeric phone entry, and forwards refs to the
 * underlying native input.
 */
export const PhoneFieldInput: FC<PhoneFieldInputProps> = ({ ref, onInput, ...props }) => {
  const { inputRef, onInput: _onInput } = usePhoneFieldContext()
  
  return (
    <TextFieldInput
      type='tel'
      inputMode='tel'
      ref={mergeRefs([inputRef, ref])}
      onInput={mergeEventHandlers(onInput, _onInput)}
      {...props}
    />
  )
}