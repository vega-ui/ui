'use client';
import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import styles from './style.module.css';
import { useDialogContext } from '../../contexts';
 
export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Applies a visual shadow to the dialog panel.
   * Adds depth and separation from the background.
   */
  shadowed?: boolean

  /**
   * Ref forwarded to the dialog’s root element.
   * Useful for managing focus, animations, or measurements.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * The children nodes to render inside the dialog.
   */
  children?: ReactNode
}

/** The DialogContent component is the main container for a dialog dialog’s content, supporting layout options like blurred overlays, shadows, fluid width, and overlaid positioning to control its appearance and behavior */
export const DialogContent: FC<DialogContentProps> = ({
  shadowed = true,
  ref,
  className,
  children,
  ...props
}) => {
  const { contentProps, status, context, fluid } = useDialogContext()

  return (
    <div
      data-fluid={fluid}
      data-shadowed={shadowed}
      data-status={status}
      className={csx(styles.dialog, className)}
      ref={mergeRefs([context.refs?.setFloating, ref])}
      {...mergeProps(contentProps ?? {}, props)}
    >
      {children}
    </div>
  )
}