'use client';

import { DialogHTMLAttributes, FC, Ref, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createInput } from '@vega-ui/core';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useSnapshot } from '../../../internals/widget';
import { DIALOG, isMounted, isRendered, ModalDialogClosedBy } from '@vega-ui/widgets/modal-dialog';
import { useSheetContext } from '../../contexts';
import { MEASURE_SHEET, sheetWidget, SURFACE } from '@vega-ui/widgets/sheet';
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
   *
   * @default 'any'
   */
  closedBy?: ModalDialogClosedBy

  /**
   * The element the sheet is rendered into through a portal.
   *
   * @default document.body
   */
  container?: Element | DocumentFragment | null
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
  container,
  style,
  ...props
}) => {
  const { handle } = useSheetContext()
  const mounted = useSnapshot(handle, isMounted)
  const rendered = useSnapshot(handle, isRendered)
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)
  const mergedRef = useMergeRefs([handle.rootAt(DIALOG, sheetWidget.output.dialog), setDialog, ref])

  useLayoutEffect(() => {
    if (dialog) handle.send(createInput(MEASURE_SHEET))
  }, [handle, dialog, rendered])

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      className={csx(styles.content, className)}
      ref={mergedRef}
      style={style}
      data-shadow={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      {...handle.listen({}, props)}
    >
      <div ref={handle.part(SURFACE, sheetWidget.output.surface)} className={styles.surface} />
      {rendered && children}
    </dialog>,
    container ?? document.body
  )
}
