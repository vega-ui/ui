'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { useTooltipContext } from '../../hooks';
import { mergeProps, mergeRefs } from '@adara-cs/utils';

export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a slotted child element using `asChild`.
   * Enables integration with custom elements (e.g., <a>, <div>, icon buttons) that serve as tooltip triggers.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button or slotted element.
   * Useful for focus control, programmatic access, or accessibility enhancements.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The TooltipTrigger component is the interactive element—typically a button, icon, or text span—that activates a Tooltip, supporting flexible rendering via the asChild prop for custom composition and accessibility */
export const TooltipTrigger: FC<TooltipTriggerProps> = ({ asChild, children, ref, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = useTooltipContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}