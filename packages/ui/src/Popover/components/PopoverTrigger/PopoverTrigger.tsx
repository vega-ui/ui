'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { mergeRefs } from '@vega-ui/utils';
import { usePopoverContext } from '../../contexts';

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as its child element using a `Slot`.
   * The child must be a button: the browser opens the popover through its `popovertarget`.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying trigger element.
   * Useful for focus control, measurement, or integrations.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The PopoverTrigger component is the button that toggles a Popover through the native `popovertarget`, supporting flexible rendering through the asChild prop */
export const PopoverTrigger: FC<PopoverTriggerProps> = ({
  ref,
  asChild,
  children,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { role, contentId, setReference } = usePopoverContext()

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      popoverTarget={contentId}
      aria-haspopup={role}
      {...props}
      ref={mergeRefs([setReference, ref])}
    >
      {children}
    </Element>
  )
}
