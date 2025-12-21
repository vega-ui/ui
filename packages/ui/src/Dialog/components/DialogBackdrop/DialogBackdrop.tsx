import { Backdrop, BackdropProps } from '../../../Backdrop';
import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { useDialogContext } from '../../contexts';

export type DialogBackdropProps = BackdropProps

/**
 * `DialogBackdrop` is a visual subcomponent of `Dialog` that renders
 * a backdrop behind the dialog content.
 *
 * It composes the base `Backdrop` primitive and integrates with
 * `DialogContext` to adjust its presentation based on dialog state,
 * such as enabling a fluid (full-bleed) layout when required.
 *
 * The backdrop is responsible for visually separating the dialog
 * from the underlying page content and typically participates in
 * focus management and modal interaction patterns.
 *
 * This component does not manage dialog state itself and must be
 * used within a `Dialog` context.
 */

export const DialogBackdrop: FC<DialogBackdropProps> = ({ className, ...props }) => {
  const { fluid } = useDialogContext()
  return <Backdrop className={csx(style.backdrop, className)} data-fluid={fluid} {...props} />
}