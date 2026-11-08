import { FC, HTMLAttributes, MouseEvent, Ref, ToggleEvent, useLayoutEffect, useRef } from 'react'
import { csx, mergeEventHandlers, togglePopover } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import styles from './style.module.css';
import { useSelectContext } from '../../contexts';
import { useListboxContext } from '../../../Listbox/contexts';

export interface SelectListboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Ref to the listbox container element.
   *
   * Can be used for imperative access, for example measurements.
   */
  ref?: Ref<HTMLDivElement>
}

/**
 * Container for Select options rendered as a listbox.
 *
 * A native popover, so CSS animates it with `:popover-open`
 * without unmounting.
 * The focus stays on the combobox on a press inside the list, except on a form field such as a search input.
 */
export const SelectListbox: FC<SelectListboxProps> = ({
  className,
  children,
  style,
  onMouseDown: _onMouseDown,
  onToggle: _onToggle,
  ref,
  ...props
}) => {
  const { listboxStyles, open, changeOpen, setFloating } = useSelectContext()
  const { id } = useListboxContext()
  const listboxRef = useRef<HTMLDivElement>(null)
  const mergedRef = useMergeRefs([setFloating, listboxRef, ref])

  useLayoutEffect(() => {
    togglePopover(listboxRef.current, open ?? false)
  }, [open])

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target as Element).closest('input, textarea, select, [contenteditable]')) event.preventDefault()
  }

  const onToggle = (event: ToggleEvent<HTMLDivElement>) => {
    if (event.newState === 'closed' && open) changeOpen?.(false)
  }

  return (
    <div
      id={id}
      popover='auto'
      role='listbox'
      ref={mergedRef}
      className={csx(styles.listbox, className)}
      style={{ ...listboxStyles, ...style }}
      onMouseDown={mergeEventHandlers(onMouseDown, _onMouseDown)}
      onToggle={mergeEventHandlers(onToggle, _onToggle)}
      {...props}
    >
      {children}
    </div>
  )
}
