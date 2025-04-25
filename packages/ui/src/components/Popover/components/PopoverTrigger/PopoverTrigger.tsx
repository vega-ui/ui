'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { mergeProps, mergeRefs } from '@adara-cs/utils';
import { usePopoverContext } from '../../hooks';

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a child element using a `Slot`.
   * Allows custom elements like `<a>` or `<div>` to behave as a popover trigger.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying trigger element.
   * Useful for focus control, measurement, or integrations.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The PopoverTrigger component is the interactive element—typically a button or slotted custom element—that toggles the visibility of a Popover, supporting flexible rendering through the asChild prop */
export const PopoverTrigger: FC<PopoverTriggerProps> = ({
  ref,
  asChild,
  children,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = usePopoverContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}