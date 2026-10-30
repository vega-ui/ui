'use client';
import { DialogHTMLAttributes, FC, ReactNode, Ref } from 'react';
import { createPortal } from 'react-dom';
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { ModalDialogClosedBy, useModalDialog } from '@vega-ui/hooks';
import styles from './style.module.css';
import { useDialogContext } from '../../contexts';

export interface DialogContentProps extends DialogHTMLAttributes<HTMLDialogElement> {
  /**
   * Applies a visual shadow to the dialog panel.
   * Adds depth and separation from the background.
   */
  shadowed?: boolean

  /**
   * Blurs the page behind the dialog.
   */
  blurred?: boolean

  /**
   * Dims the page behind the dialog. When false, the page stays visible and the dialog stays modal.
   */
  overlay?: boolean

  /**
   * Which user actions close the dialog, like the native `closedby` attribute:
   * `any` a backdrop click or `Escape`, `closerequest` only `Escape`, `none` neither.
   */
  closedBy?: ModalDialogClosedBy

  /**
   * Ref forwarded to the native `<dialog>` element.
   * Useful for managing focus, animations, or measurements.
   */
  ref?: Ref<HTMLDialogElement>

  /**
   * The children nodes to render inside the dialog.
   */
  children?: ReactNode
}

/** The DialogContent component renders the native modal `<dialog>` with the dialog's content, its backdrop, and open and close transitions */
export const DialogContent: FC<DialogContentProps> = ({
  shadowed = true,
  blurred = true,
  overlay = true,
  closedBy = 'closerequest',
  ref,
  className,
  children,
  onCancel: _onCancel,
  onSubmit: _onSubmit,
  onClose: _onClose,
  ...props
}) => {
  const { open, changeOpen, fluid } = useDialogContext()
  const { ref: dialogRef, mounted, rendered, onCancel, onSubmit, onClose } = useModalDialog({ open, onChangeOpen: changeOpen })

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      data-fluid={fluid}
      data-shadowed={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      data-status={open ? 'open' : 'close'}
      className={csx(styles.dialog, className)}
      ref={mergeRefs([dialogRef, ref])}
      onCancel={mergeEventHandlers(onCancel, _onCancel)}
      onSubmit={mergeEventHandlers(onSubmit, _onSubmit)}
      onClose={mergeEventHandlers(onClose, _onClose)}
      {...props}
    >
      {rendered && children}
    </dialog>,
    document.body
  )
}
