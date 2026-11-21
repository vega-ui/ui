'use client';

import { ButtonHTMLAttributes, FC, Ref, useId } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { CLOSE } from '@vega-ui/widgets/toast';
import { Slot } from '../../../Slot';
import { usePart } from '../../../internals/widget';
import { useToastRegionContext } from '../../contexts';

export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the close action as its child element using `Slot`,
   * so any button of your own closes the toast, like an action that also dismisses it.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button.
   */
  ref?: Ref<HTMLButtonElement>
}

/** ToastClose is a button that closes its toast after your onClick, unless it calls preventDefault, with no styles of its own: render your own button inside it with asChild */
export const ToastClose: FC<ToastCloseProps> = ({ asChild, children, ref, ...props }) => {
  const Element = asChild ? Slot : 'button'
  const { handle } = useToastRegionContext()
  const register = usePart(handle, CLOSE, undefined, useId())
  const closeRef = useMergeRefs([register, ref])

  return <Element ref={closeRef} type='button' {...handle.merge({}, props)}>{children}</Element>
}
