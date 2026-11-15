import { DetailedHTMLProps, FC, InputHTMLAttributes, Ref, useState } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import { usePinFieldContext } from '../../contexts';
import { pinFieldWidget } from '@vega-ui/widgets/pin-field';
import { VisuallyHidden } from '../../../VisuallyHidden';

export interface PinFieldInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'disabled' | 'maxLength' | 'value' | 'defaultValue'> {
  ref?: Ref<HTMLInputElement>
}

/**
 * PinFieldInput is the single, visually hidden `<input>` that backs the PinField UI.
 *
 * It stores the full PIN value in one place while the visible pin “cells” render the
 * per-character representation. The input is hidden via `VisuallyHidden` but remains
 * focusable and accessible for keyboard input, screen readers, and browser autofill.
 * The code, `disabled` and `maxLength` come from `PinField`, so the slots and the
 * input always agree; `onChange` and `onInput` still report each edit of the text.
 *
 * The caret always selects one character, so typing replaces the character of
 * the active slot. Focusing the input selects the slot after the code, ArrowUp
 * and Home select the first slot, ArrowDown and End the slot after the code,
 * and the inline arrows the previous or next slot; Shift with an arrow extends
 * the selection natively. Selecting the whole code marks every slot active.
 */
export const PinFieldInput: FC<PinFieldInputProps> = ({ ref, inputMode = 'numeric', ...props }) => {
  const { handle, disabled, placeholder, maxLength } = usePinFieldContext()
  const [defaultValue] = useState(() => handle.instance.state.value)
  const attrs = useOutput(handle, pinFieldWidget.output.root)
  const mergedRef = useMergeRefs([handle.root, ref])

  return (
    <VisuallyHidden asChild>
      <input
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        inputMode={inputMode}
        maxLength={maxLength}
        ref={mergedRef}
        {...handle.listen(attrs, props)}
      />
    </VisuallyHidden>
  )
}
