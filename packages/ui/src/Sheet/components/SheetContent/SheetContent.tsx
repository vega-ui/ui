'use client';

import { CSSProperties, DialogHTMLAttributes, FC, Ref, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { clamp, csx, findScrollableAncestor, isBackdropPoint, isTextInteraction, mergeEventHandlers, mergeRefs, projectMomentum, resolveSnapStop, rubberBand } from '@vega-ui/utils';
import { DragGesture, ModalDialogClosedBy, useDragGesture, useKeyboardInset, useModalDialog } from '@vega-ui/hooks';
import { useSheetContext } from '../../contexts';
import styles from './style.module.css'

export interface SheetContentProps extends DialogHTMLAttributes<HTMLDialogElement> {
  /**
   * Ref forwarded to the native `<dialog>` element.
   * Useful for focus management, measurement, or animation hooks.
   */
  ref?: Ref<HTMLDialogElement>

  /**
   * Applies a visual shadow to the sheet panel.
   * Adds depth and separation from the background.
   */
  shadowed?: boolean

  /**
   * Blurs the page behind the sheet.
   */
  blurred?: boolean

  /**
   * Dims the page behind the sheet. When false, the page stays visible and the sheet stays modal.
   */
  overlay?: boolean

  /**
   * Which user actions close the sheet, like the native `closedby` attribute:
   * `any` a backdrop click, a swipe down or `Escape`, `closerequest` only `Escape`, `none` neither.
   */
  closedBy?: ModalDialogClosedBy
}

/** The SheetContent component renders the sliding sheet as a native modal `<dialog>`, with its backdrop, drag gestures, and open and close transitions */
export const SheetContent: FC<SheetContentProps> = ({
  className,
  ref,
  children,
  shadowed,
  blurred = true,
  overlay = true,
  closedBy = 'any',
  style,
  onCancel: _onCancel,
  onSubmit: _onSubmit,
  onClose: _onClose,
  ...props
}) => {
  const {
    open,
    changeOpen,
    changeHeight,
    height,
    viewport,
    offsets,
    activeSnapPoint,
    changeActiveSnapPoint,
    steppedSnapPoints,
  } = useSheetContext()
  const { ref: dialogRef, dialog, mounted, rendered, onCancel, onSubmit, onClose } = useModalDialog({ open, onChangeOpen: changeOpen })
  const [dragOffset, setDragOffset] = useState<number | null>(null)
  const keyboardInset = useKeyboardInset()

  const swipeable = closedBy === 'any'
  const restingOffset = offsets[activeSnapPoint] ?? 0
  const topOffset = Math.min(...offsets)
  const lowestOffset = Math.max(...offsets)
  const bottomOffset = swipeable ? height : lowestOffset
  const offset = dragOffset ?? restingOffset
  const progress = height > lowestOffset ? clamp(0, (height - offset) / (height - lowestOffset), 1) : 1
  const lowestTop = viewport - keyboardInset - height + lowestOffset
  const top = viewport - keyboardInset - height + offset
  const expansion = lowestTop > 0 ? clamp(0, 1 - top / lowestTop, 1) : 1
  const clip = clamp(0, offset, lowestOffset)

  const shouldStart = (event: PointerEvent, direction: 1 | -1) => {
    if (!dialog) return false
    if (isBackdropPoint(dialog, event) || isTextInteraction(event.target)) return false
    if (restingOffset > topOffset) return true

    const scroller = findScrollableAncestor(event.target as Element, dialog)
    if (!scroller) return true
    if (direction === -1) return false

    return scroller.scrollTop <= 0
  }

  const onMove = ({ delta }: DragGesture) => {
    const position = restingOffset + delta

    if (position < topOffset) {
      setDragOffset(topOffset + rubberBand(position - topOffset, height))
      return
    }

    if (position > bottomOffset) {
      setDragOffset(bottomOffset + rubberBand(position - bottomOffset, height))
      return
    }

    setDragOffset(position)
  }

  const onEnd = ({ delta, velocity }: DragGesture) => {
    setDragOffset(null)

    const stops = swipeable ? [...offsets, height] : offsets
    const target = resolveSnapStop(stops, restingOffset, restingOffset + delta + projectMomentum(velocity), steppedSnapPoints)

    if (swipeable && target === height) {
      changeOpen(false)
      return
    }

    changeActiveSnapPoint(offsets.indexOf(target))
  }

  useLayoutEffect(() => {
    if (!dialog) return

    const observer = new ResizeObserver(() => changeHeight(dialog.offsetHeight))
    changeHeight(dialog.offsetHeight)
    observer.observe(dialog)

    return () => observer.disconnect()
  }, [dialog, rendered, changeHeight])

  useDragGesture(dialog, { axis: 'y', shouldStart, onMove, onEnd })

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      className={csx(styles.content, className)}
      onCancel={mergeEventHandlers(onCancel, _onCancel)}
      onSubmit={mergeEventHandlers(onSubmit, _onSubmit)}
      onClose={mergeEventHandlers(onClose, _onClose)}
      data-status={open ? 'open' : 'close'}
      ref={mergeRefs([dialogRef, ref])}
      style={{
        '--sheet-offset': `${offset}px`,
        '--sheet-progress': progress,
        '--sheet-expansion': expansion,
        '--sheet-clip': `${clip}px`,
        '--sheet-keyboard-inset': `${keyboardInset}px`,
        ...style,
      } as CSSProperties}
      data-dragging={dragOffset !== null}
      data-floating={expansion < 1}
      data-clipped={clip > 0}
      data-shadow={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      {...props}
    >
      {rendered && children}
    </dialog>,
    document.body
  )
}
