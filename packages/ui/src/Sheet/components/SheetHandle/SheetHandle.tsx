'use client';
import { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { createInput } from '@vega-ui/core';
import { useSnapshot } from '../../../internals/widget';
import { csx } from '@vega-ui/utils';
import { useSheetContext } from '../../contexts';
import { hasSnapPoints, NEXT_SNAP_POINT } from '@vega-ui/widgets/sheet';
import style from './style.module.css'

export interface SheetHandleProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Ref forwarded to the handle `<button>`.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The SheetHandle component is the grip at the top of a sheet, a button that moves the sheet to the next snap point, and back to the lowest one from the top. Without several snap points it is disabled and hidden from assistive technology */
export const SheetHandle: FC<SheetHandleProps> = ({
  className,
  ref,
  onClick: _onClick,
  ...props
}) => {
  const { handle } = useSheetContext()
  const resizable = useSnapshot(handle, hasSnapPoints)

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (event.defaultPrevented) return

    handle.send(createInput(NEXT_SNAP_POINT))
  }

  return (
    <button
      ref={ref}
      type='button'
      disabled={!resizable}
      aria-hidden={!resizable}
      className={csx(style.handle, className)}
      onClick={onClick}
      {...props}
    />
  )
}
