'use client';
import { DialogHTMLAttributes, FC, Ref } from 'react';
import { createPortal } from 'react-dom';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useSnapshot } from '../../../internals/widget';
import { DIALOG, isMounted, isRendered, ModalDialogClosedBy } from '@vega-ui/widgets/modal-dialog';
import { drawerWidget } from '@vega-ui/widgets/drawer';
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
   *
   * @default 'any'
   */
  closedBy?: ModalDialogClosedBy

  /**
   * The element the drawer is rendered into through a portal.
   *
   * @default document.body
   */
  container?: Element | DocumentFragment | null

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
  container,
  children,
  ref,
  style: _style,
  ...props
}) => {
  const { handle, position } = useDrawerContext()
  const mounted = useSnapshot(handle, isMounted)
  const rendered = useSnapshot(handle, isRendered)
  const mergedRef = useMergeRefs([handle.rootAt(DIALOG, drawerWidget.output.dialog), ref])

  if (!mounted) return null

  return createPortal(
    <dialog
      closedby={closedBy}
      data-position={position}
      data-full-width={fullWidth}
      data-full-height={fullHeight}
      data-shadow={shadowed}
      data-blurred={blurred}
      data-overlay={overlay}
      ref={mergedRef}
      className={csx(style.drawer, className)}
      style={_style}
      {...handle.listen({}, props)}
    >
      {rendered && children}
    </dialog>,
    container ?? document.body
  )
}
