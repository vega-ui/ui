import { FC, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import style from '../../style.module.css';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { csx } from '@vega-ui/utils';
import { useNumberFieldContext } from '../../contexts';
import { defaultTextOf, numberFieldWidget } from '@vega-ui/widgets/number-field';

export type NumberFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * `NumberFieldInput` is the low-level input component used inside `NumberField`.
 *
 * It renders a numeric `<input>` element based on `TextFieldInput` and connects
 * it to the surrounding `NumberField` context.
 *
 * The number comes from `NumberField`; `onChange` and `onInput` still report
 * each edit of the text.
 *
 * `NumberFieldInput` is designed to be used only as a child of `NumberField`.
 */
export const NumberFieldInput: FC<NumberFieldInputProps> = ({ ref, disabled, className, ...props }) => {
  const { handle, disabled: _disabled } = useNumberFieldContext()
  const [defaultValue] = useState(() => defaultTextOf(handle.instance.state))
  const attrs = useOutput(handle, numberFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.root, ref])

  return (
    <TextFieldInput
      defaultValue={defaultValue}
      ref={mergedRef}
      inputMode='numeric'
      disabled={disabled ?? _disabled}
      className={csx(style.numberTextField, className)}
      {...handle.listen(attrs, props)}
    />
  )
}
