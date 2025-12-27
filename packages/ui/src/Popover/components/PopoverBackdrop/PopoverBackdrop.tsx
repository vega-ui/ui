import { FC } from 'react';
import { Backdrop, BackdropProps } from '../../../Backdrop';
import { usePopoverContext } from '../../contexts';
import { useTransitionStatus } from '@floating-ui/react';

export type PopoverBackdropProps = BackdropProps

/**
 * PopoverBackdrop component is a full-screen overlay behind the popovers content.
 *
 * It is responsible for visually separating the popovers from the
 * underlying page content and optionally preventing background
 * scrolling while the drawer is open.
 *
 * The component composes `FloatingOverlay` to handle scroll locking
 * and layering, and supports optional visual effects such as blur.
 */
export const PopoverBackdrop: FC<PopoverBackdropProps> = (props) => {
  const { context } = usePopoverContext()
  const { status, isMounted } = useTransitionStatus(context)
  
  return isMounted ? <Backdrop visible={status === 'open'} {...props} /> : null
}