import { FC, FocusEvent, SelectHTMLAttributes } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSelectContext } from '../../contexts';

export type SelectHiddenSelectProps = SelectHTMLAttributes<HTMLSelectElement>

/**
 * Hidden native `<select>` for form compatibility.
 *
 * Renders a visually hidden native `select` element holding the current
 * value, so that forms submit it under `name`.
 */
export const SelectHiddenSelect: FC<SelectHiddenSelectProps> = ({ onFocus: _onFocus, ...props }) => {
  const { selected, disabled, focusCombobox } = useSelectContext()
  const value = selected ?? ''

  const onFocus = (event: FocusEvent<HTMLSelectElement>) => {
    _onFocus?.(event)
    if (!event.defaultPrevented) focusCombobox?.()
  }

  return (
    <VisuallyHidden>
      <select
        value={value}
        disabled={disabled}
        onChange={() => {}}
        onFocus={onFocus}
        aria-hidden='true'
        tabIndex={-1}
        {...props}
      >
        <option key={value} value={value} />
      </select>
    </VisuallyHidden>
  )
}