'use client';

import { FC, MouseEvent } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { comboboxWidget, TRIGGER } from '@vega-ui/widgets/combobox';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useOutput } from '../../../internals/widget';
import { useComboboxContext } from '../../contexts';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';

export type ComboboxTriggerProps = IconButtonProps

/**
 * A button that opens and closes the list of a Combobox, for the pointer and touch. Put it inside the `TextField`, next to the input.
 *
 * It stays out of the tab order and keeps the focus in the input. Name it with `aria-label`.
 */
export const ComboboxTrigger: FC<ComboboxTriggerProps> = ({ ref, className, onMouseDown: _onMouseDown, type = 'button', ...props }) => {
  const { size } = useTextFieldContext()
  const { handle } = useComboboxContext()
  const attrs = useOutput(handle, comboboxWidget.output.trigger)
  const mergedRef = useMergeRefs([handle.part(TRIGGER), ref])

  const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    _onMouseDown?.(event)
    event.preventDefault()
  }

  return (
    <IconButton
      ref={mergedRef}
      type={type}
      size={size}
      className={csx(style.button, className)}
      variant='secondary'
      appearance='transparent'
      {...handle.merge(attrs, props)}
      onMouseDown={onMouseDown}
    />
  )
}
