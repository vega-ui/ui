'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeProps, mergeRefs } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useDrawerContext } from '../../hooks';

export interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a child element using `Slot`.
   * This enables custom wrappers (e.g., <a>, <div>) to inherit drawer-opening behavior.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the native button or slotted element.
   * Useful for focus management or integrations.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The DrawerTrigger component is an interactive control—usually a button or custom slotted element—that toggles the visibility of a drawer, supporting asChild for flexible rendering and integration with custom trigger elements */
export const DrawerTrigger: FC<DrawerTriggerProps> = ({
  asChild,
  children,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = useDrawerContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}