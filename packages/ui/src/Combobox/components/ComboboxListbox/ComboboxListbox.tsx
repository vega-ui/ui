'use client';

import { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { comboboxWidget, LISTBOX } from '@vega-ui/widgets/combobox';
import { useOutput } from '../../../internals/widget';
import styles from './style.module.css';
import { useComboboxContext } from '../../contexts';

export interface ComboboxListboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Ref to the list element.
   */
  ref?: Ref<HTMLDivElement>
}

/**
 * The list of a Combobox, with `role="listbox"`, shown under the input while it is open and has options.
 *
 * A native popover, so CSS animates it with `:popover-open` without unmounting.
 * The focus stays in the input on a press inside the list.
 */
export const ComboboxListbox: FC<ComboboxListboxProps> = ({
  className,
  children,
  style,
  onMouseDown: _onMouseDown,
  onToggle: _onToggle,
  ref,
  ...props
}) => {
  const { handle, anchorName } = useComboboxContext()
  const attrs = useOutput(handle, comboboxWidget.output.listbox)
  const mergedRef = useMergeRefs([handle.part(LISTBOX), ref])

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => event.preventDefault()

  return (
    <div
      popover='manual'
      ref={mergedRef}
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
