'use client';

import { CSSProperties, DialogHTMLAttributes, FC, Ref } from 'react';
import { createPortal } from 'react-dom';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { ModalDialogClosedBy, useKeyboardInset, useMergeRefs, useModalDialog } from '@vega-ui/hooks';
import { useSheetContext } from '../../contexts';
import { useSheetDrag } from '../../hooks';
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
  blurred = false,
  overlay = true,
  closedBy = 'any',
  style,
  onCancel: _onCancel,
  onSubmit: _onSubmit,
  onClose: _onClose,
  ...props
}) => {
  const { open, changeOpen } = useSheetContext()
  const { ref: dialogRef, dialog, mounted, rendered, onCancel, onSubmit, onClose } = useModalDialog({ open, onChangeOpen: changeOpen })
  const mergedRef = useMergeRefs([dialogRef, ref])
  const keyboardInset = useKeyboardInset()
  const surfaceRef = useSheetDrag({ dialog, rendered, keyboardInset, swipeable: closedBy === 'any' })

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      className={csx(styles.content, className)}
      onCancel={mergeEventHandlers(onCancel, _onCancel)}
      onSubmit={mergeEventHandlers(onSubmit, _onSubmit)}
      onClose={mergeEventHandlers(onClose, _onClose)}
      data-status={open ? 'open' : 'close'}
      ref={mergedRef}
      style={{
        '--sheet-keyboard-inset': `${keyboardInset}px`,
        ...style,
      } as CSSProperties}
      data-shadow={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      {...props}
    >
      <div ref={surfaceRef} className={styles.surface} />
      {rendered && children}
    </dialog>,
    document.body
  )
}
