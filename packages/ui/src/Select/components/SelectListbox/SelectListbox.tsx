import { FC, HTMLAttributes, MouseEvent, Ref } from 'react'
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import { isTextEntry } from '@vega-ui/core';
import styles from './style.module.css';
import { useSelectContext } from '../../contexts';
import { LISTBOX, selectWidget } from '@vega-ui/widgets/select';

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
  const { handle, variant, anchorName } = useSelectContext()
  const attrs = useOutput(handle, selectWidget.output.listbox)
  const mergedRef = useMergeRefs([handle.part(LISTBOX), ref])

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element) || !isTextEntry(event.target)) event.preventDefault()
  }

  return (
    <div
      popover='auto'
      ref={mergedRef}
      data-variant={variant}
      className={csx(styles.listbox, className)}
      style={{ positionAnchor: anchorName, ...style }}
      onMouseDown={mergeEventHandlers(_onMouseDown, onMouseDown)}
      onToggle={mergeEventHandlers(_onToggle, handle.listeners.onToggle)}
      {...handle.merge(attrs, props)}
    >
      {children}
    </div>
  )
}
