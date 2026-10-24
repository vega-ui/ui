import { FC } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { mergeRefs } from '@vega-ui/utils';
import { usePhoneFieldContext } from '../../contexts';

export type PhoneFieldInputProps = TextFieldInputProps

/**
 * `PhoneFieldInput` is the input element used within `PhoneField`.
 *
 * It renders a telephone input based on `TextFieldInput`, applies the appropriate
 * `type` and `inputMode` for numeric phone entry, and forwards refs to the
 * underlying native input.
 */
export const PhoneFieldInput: FC<PhoneFieldInputProps> = ({ ref, ...props }) => {
  const { inputRef } = usePhoneFieldContext()
  
  return (
    <TextFieldInput
      type='tel'
      inputMode='tel'
      ref={mergeRefs([inputRef, ref])}
      {...props}
    />
  )
}