'use client';
import { CSSProperties, DialogHTMLAttributes, FC, Ref, useState } from 'react';
import { createPortal } from 'react-dom';
import { csx, findScrollableAncestor, isBackdropPoint, isTextInteraction, mergeEventHandlers, mergeRefs, projectMomentum, rubberBand } from '@vega-ui/utils';
import { DragGesture, ModalDialogClosedBy, useDragGesture, useModalDialog } from '@vega-ui/hooks';
import style from './style.module.css'
import { useDrawerContext } from '../../contexts';

export interface DrawerContentProps extends DialogHTMLAttributes<HTMLDialogElement> {
  /**
   * Ref forwarded to the native `<dialog>` element.
   * Useful for measuring, focusing, or animation hooks.
   */
  ref?: Ref<HTMLDialogElement>

  /**
   * Adds a shadow to the drawer panel for depth and separation.
   */
  shadowed?: boolean

  /**
   * Blurs the page behind the drawer.
   */
  blurred?: boolean

  /**
   * Dims the page behind the drawer. When false, the page stays visible and the drawer stays modal.
   */
  overlay?: boolean

  /**
   * Which user actions close the drawer, like the native `closedby` attribute:
   * `any` a backdrop click, a touch swipe toward its edge or `Escape`, `closerequest` only `Escape`, `none` neither.
   */
  closedBy?: ModalDialogClosedBy

  /**
   * Makes the drawer stretch to fill the full width of its parent container.
   */
  fullWidth?: boolean

  /**
   * Makes the drawer stretch to fill the full height of its parent container.
   */
  fullHeight?: boolean
}

/** The DrawerContent component renders the drawer panel as a native modal `<dialog>`, with its backdrop, slide transitions, and full-size configurations for flexible and responsive panel design */
export const DrawerContent: FC<DrawerContentProps> = ({
  className,
  fullHeight,
  fullWidth,
  shadowed,
  blurred = true,
  overlay = true,
  closedBy = 'any',
  children,
  ref,
  onCancel: _onCancel,
  onSubmit: _onSubmit,
  onClose: _onClose,
  style: _style,
  ...props
}) => {
  const { open, changeOpen, position } = useDrawerContext()
  const { ref: dialogRef, dialog, mounted, rendered, onCancel, onSubmit, onClose } = useModalDialog({ open, onChangeOpen: changeOpen })
  const [drag, setDrag] = useState<number | null>(null)

  const edge = position?.split('-')[0]
  const axis = edge === 'top' || edge === 'bottom' ? 'y' : 'x'

  const getSize = () => {
    if (!dialog) return 0
    return axis === 'x' ? dialog.offsetWidth : dialog.offsetHeight
  }

  const getDirection = () => {
    if (edge === 'bottom') return 1
    if (edge === 'top') return -1

    const rtl = dialog !== null && dialog.matches(':dir(rtl)')

    if (edge === 'end') return rtl ? -1 : 1
    return rtl ? 1 : -1
  }

  const shouldStart = (event: PointerEvent, dragDirection: 1 | -1) => {
    if (!dialog || closedBy !== 'any' || event.pointerType === 'mouse') return false
    if (isBackdropPoint(dialog, event) || isTextInteraction(event.target)) return false
    if (axis === 'x') return true

    const direction = getDirection()
    const scroller = findScrollableAncestor(event.target as Element, dialog)
    if (!scroller) return true
    if (dragDirection !== direction) return false
    if (direction === 1) return scroller.scrollTop <= 0

    return scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight
  }

  const onMove = ({ delta }: DragGesture) => {
    const direction = getDirection()
    const toward = delta * direction

    if (toward >= 0) {
      setDrag(delta)
      return
    }

    setDrag(rubberBand(toward, getSize()) * direction)
  }

  const onEnd = ({ delta, velocity }: DragGesture) => {
    setDrag(null)

    if ((delta + projectMomentum(velocity)) * getDirection() > getSize() / 2) changeOpen(false)
  }

  useDragGesture(dialog, { axis, shouldStart, onMove, onEnd })

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      data-position={position}
      data-full-width={fullWidth}
      data-full-height={fullHeight}
      data-status={open ? 'open' : 'close'}
      data-shadow={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      data-dragging={drag !== null}
      ref={mergeRefs([dialogRef, ref])}
      className={csx(style.drawer, className)}
      onCancel={mergeEventHandlers(onCancel, _onCancel)}
      onSubmit={mergeEventHandlers(onSubmit, _onSubmit)}
      onClose={mergeEventHandlers(onClose, _onClose)}
      style={{ '--drawer-drag': `${drag ?? 0}px`, ..._style } as CSSProperties}
      {...props}
    >
      {rendered && children}
    </dialog>,
    document.body
  )
}
