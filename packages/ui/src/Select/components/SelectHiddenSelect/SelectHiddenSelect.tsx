import { FC, SelectHTMLAttributes } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSelectContext } from '../../contexts';

export type SelectHiddenSelectProps = SelectHTMLAttributes<HTMLSelectElement>

/**
 * Hidden native `<select>` for form compatibility.
 *
 * Renders a visually hidden native `select` element holding the current
 * value, so that forms submit it under `name`.
 */
export const SelectHiddenSelect: FC<SelectHiddenSelectProps> = (props) => {
  const { selected, disabled } = useSelectContext()
  const value = selected ?? ''

  return (
    <VisuallyHidden>
      <select value={value} disabled={disabled} onChange={() => {}} aria-hidden='true' tabIndex={-1} {...props}>
        <option value={value} />
      </select>
    </VisuallyHidden>
  )
}