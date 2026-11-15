import { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import style from './style.module.css';
import { useSelectContext } from '../../contexts';
import { COMBOBOX, selectWidget } from '@vega-ui/widgets/select';

export interface SelectComboboxProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Ref to the underlying `<button>` element.
   *
   * Useful for focus management, positioning, and imperative access.
   */
  ref?: Ref<HTMLButtonElement>
}

/**
 * Select combobox trigger component.
 *
 * Renders a button with `role="combobox"` that acts as the main control
 * for opening and closing the Select dropdown
 *
 * Children are typically composed of:
 * - `SelectValue` (current value / placeholder)
 * - `SelectIcon` (dropdown indicator)
 */
export const SelectCombobox: FC<SelectComboboxProps> = ({
  className,
  children,
  style: _style,
  onMouseDown: _onMouseDown,
  ref,
  ...props
}) => {
  const { handle, size, variant, anchorName } = useSelectContext()
  const attrs = useOutput(handle, selectWidget.output.combobox)
  const mergedRef = useMergeRefs([ref, handle.part(COMBOBOX)])

  const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault()

  return (
    <button
      type='button'
      data-size={size}
      data-variant={variant}
      ref={mergedRef}
      className={csx(style.combobox, className)}
      style={{ anchorName, ..._style }}
      onMouseDown={mergeEventHandlers(_onMouseDown, onMouseDown)}
      {...handle.merge(attrs, props)}
    >
      {children}
    </button>
  )
}
