'use client';

import { FC, ReactNode } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { SheetProvider } from './contexts';
import { sheetWidget } from '@vega-ui/widgets/sheet';

export interface SheetProps {
  /**
   * The heights the sheet rests at, like the detents of a native sheet: a fraction of the viewport height
   * (`0.5`) or a pixel height (`'200px'`). The sheet fits its content unless `SheetContent`
   * has a CSS height, and a snap point above its height rests at its top.
   * Without snap points the sheet rests fully open.
   */
  snapPoints?: Array<`${number}px` | number>

  /**
   * The currently active snap point (controlled), as an index into `snapPoints`.
   */
  activeSnapPoint?: number

  /**
   * The snap point the sheet opens at when uncontrolled, as an index into `snapPoints`.
   * Defaults to the lowest one.
   */
  defaultSnapPoint?: number

  /**
   * Callback fired when the active snap point changes: the user moves the sheet to another snap point, or an uncontrolled sheet returns to its default snap point once it closes.
   *
   * @param activeSnapPoint - The index into `snapPoints` of the new snap point.
   */
  onChangeActiveSnapPoint?: (activeSnapPoint: number) => void

  /**
   * Moves at most one snap point per drag, however far or fast the drag is.
   */
  steppedSnapPoints?: boolean

  /**
   * Controls whether the sheet is initially open (uncontrolled).
   */
  defaultOpen?: boolean

  /**
   * Controls whether the sheet is currently open (controlled).
   */
  open?: boolean

  /**
   * Callback fired when the open state changes.
   *
   * @param value - The new open state (`true` or `false`).
   */
  onChangeOpen?: (value: boolean) => void

  /**
   * The content rendered inside the sheet.
   * Can include any layout or form elements.
   */
  children?: ReactNode | ReactNode[]
}

/** A Sheet is a UI component that slides up from the bottom of the screen, typically used for displaying additional content or actions without navigating away from the current page */
export const Sheet: FC<SheetProps> = ({
  children,
  snapPoints,
  defaultOpen = false,
  defaultSnapPoint,
  steppedSnapPoints = false,
  activeSnapPoint: controlledActiveSnapPoint,
  onChangeActiveSnapPoint,
  open: controlledOpen,
  onChangeOpen,
}) => {
  const handle = useWidget(sheetWidget, {
    snapPoints,
    steppedSnapPoints,
    open: controlledOpen,
    defaultOpen,
    onChangeOpen,
    activeSnapPoint: controlledActiveSnapPoint,
    defaultActiveSnapPoint: defaultSnapPoint,
    onChangeActiveSnapPoint: onChangeActiveSnapPoint as ((index: number | undefined) => void) | undefined,
  }, widgetEnvironment)

  return (
    <SheetProvider handle={handle}>
      {children}
    </SheetProvider>
  )
}
