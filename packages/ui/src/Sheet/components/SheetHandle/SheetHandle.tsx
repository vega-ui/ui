'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { useSheetContext } from '../../contexts';
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
  const { offsets, activeSnapPoint, changeActiveSnapPoint } = useSheetContext()

  const resizable = offsets.length > 1

  const onClick = () => {
    const order = offsets.map((_, index) => index).sort((a, b) => offsets[b] - offsets[a])
    const next = order[(order.indexOf(activeSnapPoint) + 1) % order.length]

    changeActiveSnapPoint(next)
  }

  return (
    <button
      ref={ref}
      type='button'
      disabled={!resizable}
      aria-hidden={!resizable}
      className={csx(style.handle, className)}
      onClick={mergeEventHandlers(onClick, _onClick)}
      {...props}
    />
  )
}
