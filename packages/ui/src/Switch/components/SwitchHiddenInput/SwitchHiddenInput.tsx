import { FC, InputHTMLAttributes, Ref } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSwitchContext } from '../../contexts';

export interface SwitchHiddenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Ref forwarded to the underlying native `<input>` element
   */
  ref?: Ref<HTMLInputElement>
}

/**
 * SwitchHiddenInput
 *
 * A visually hidden native `<input type="checkbox">` that provides
 * form integration and accessibility for the `Switch` component.
 *
 * Purpose:
 * - Acts as the form-associated control for `Switch`
 * - Enables native keyboard interaction, form submission, and
 *   screen reader support
 * - Separates visual presentation (custom switch UI) from semantics
 */
export const SwitchHiddenInput: FC<SwitchHiddenInputProps> = ({ ref, ...props }) => {
  const { size } = useSwitchContext()
  
  return (
    <VisuallyHidden asChild>
      <input
        ref={ref}
        role='switch'
        type='checkbox'
        data-size={size}
        {...props}
      />
    </VisuallyHidden>
  )
}