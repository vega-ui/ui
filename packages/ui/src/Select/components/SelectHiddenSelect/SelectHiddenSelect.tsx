import { FC, SelectHTMLAttributes } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSelectContext, useSelectOptionsContext } from '../../contexts';

export type SelectHiddenSelectProps = SelectHTMLAttributes<HTMLSelectElement>

/**
 * Hidden native `<select>` for form compatibility.
 *
 * Renders a visually hidden native `select` element that mirrors the
 * current Select state. It is used to:
 * - Enable correct form submission (`name`, `value`)
 * - Support browser autofill and native form behaviors
 * - Preserve accessibility semantics for forms without exposing UI
 */
export const SelectHiddenSelect: FC<SelectHiddenSelectProps> = ({ ...props }) => {
  const { options } = useSelectOptionsContext()
  const { selected } = useSelectContext()
  
  return (
    <VisuallyHidden>
      <select defaultValue={selected} aria-hidden='true' tabIndex={-1} {...props}>
        {options?.map(({ label, value, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </VisuallyHidden>
  )
}