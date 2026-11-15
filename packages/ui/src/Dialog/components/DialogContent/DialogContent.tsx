'use client';
import { DialogHTMLAttributes, FC, ReactNode, Ref } from 'react';
import { createPortal } from 'react-dom';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useSnapshot } from '../../../internals/widget';
import { DIALOG, isMounted, isRendered, ModalDialogClosedBy, modalDialogWidget } from '@vega-ui/widgets/modal-dialog';
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
   *
   * @default 'closerequest'
   */
  closedBy?: ModalDialogClosedBy

  /**
   * The element the dialog is rendered into through a portal.
   *
   * @default document.body
   */
  container?: Element | DocumentFragment | null

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
  container,
  ref,
  className,
  children,
  ...props
}) => {
  const { handle } = useDialogContext()
  const mounted = useSnapshot(handle, isMounted)
  const rendered = useSnapshot(handle, isRendered)
  const mergedRef = useMergeRefs([handle.rootAt(DIALOG, modalDialogWidget.output.dialog), ref])

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      data-shadowed={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      className={csx(styles.dialog, className)}
      ref={mergedRef}
      {...handle.listen({}, props)}
    >
      {rendered && children}
    </dialog>,
    container ?? document.body
  )
}
