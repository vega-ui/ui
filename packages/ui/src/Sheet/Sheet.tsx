'use client';

import { FC, ReactNode, useLayoutEffect, useMemo, useState } from 'react';
import { useControlledState } from '@vega-ui/hooks';
import { resolveLength } from '@vega-ui/utils';
import { SheetProvider } from './contexts';

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
   * Callback fired when the user moves the sheet to another snap point.
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
  const [open, changeOpen] = useControlledState(controlledOpen, defaultOpen, onChangeOpen)
  const [content, setContent] = useState<HTMLDialogElement | null>(null)
  const [height, setHeight] = useState(0)
  const [viewport, setViewport] = useState(0)

  useLayoutEffect(() => {
    if (!content) return

    const observer = new ResizeObserver(() => setHeight(content.offsetHeight))
    setHeight(content.offsetHeight)
    observer.observe(content)

    return () => observer.disconnect()
  }, [content])

  useLayoutEffect(() => {
    const measure = () => setViewport(document.documentElement.clientHeight)
    measure()
    window.addEventListener('resize', measure)

    return () => window.removeEventListener('resize', measure)
  }, [])

  const heights = useMemo(() => snapPoints?.map((point) => resolveLength(point, viewport)), [snapPoints, viewport])
  const offsets = useMemo(() => heights?.map((snapHeight) => Math.max(0, height - snapHeight)) ?? [0], [heights, height])

  const [chosenSnapPoint, setChosenSnapPoint] = useControlledState(controlledActiveSnapPoint, defaultSnapPoint)
  const activeSnapPoint = chosenSnapPoint ?? offsets.indexOf(Math.max(...offsets))

  const changeActiveSnapPoint = (index: number) => {
    if (index === activeSnapPoint) return

    setChosenSnapPoint(index)
    onChangeActiveSnapPoint?.(index)
  }

  const [wasOpen, setWasOpen] = useState(open)

  if (open !== wasOpen) {
    setWasOpen(open)
    if (!open) setChosenSnapPoint(defaultSnapPoint)
  }

  return (
    <SheetProvider
      open={open}
      changeOpen={changeOpen}
      contentRef={setContent}
      height={height}
      viewport={viewport}
      offsets={offsets}
      activeSnapPoint={activeSnapPoint}
      changeActiveSnapPoint={changeActiveSnapPoint}
      steppedSnapPoints={steppedSnapPoints}
    >
      {children}
    </SheetProvider>
  )
}
