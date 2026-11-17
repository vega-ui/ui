'use client';

import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { comboboxWidget, INPUT } from '@vega-ui/widgets/combobox';
import { useOutput } from '../../../internals/widget';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useComboboxContext } from '../../contexts';

export type ComboboxInputProps = TextFieldInputProps

/**
 * The text input of a Combobox, with `role="combobox"`. Put it inside a `TextField`.
 *
 * Its text is a plain input value: leave it uncontrolled or pass `value` and `onChange`.
 * Picking an option writes the option label and fires `input`, so `onChange` receives it.
 */
export const ComboboxInput: FC<ComboboxInputProps> = ({ ref, ...props }) => {
  const { handle } = useComboboxContext()
  const attrs = useOutput(handle, comboboxWidget.output.input)
  const mergedRef = useMergeRefs([handle.part(INPUT), ref])

  return <TextFieldInput ref={mergedRef} {...handle.merge(attrs, props)} />
}
