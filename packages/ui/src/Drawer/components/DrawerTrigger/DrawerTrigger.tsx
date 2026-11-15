'use client';

import { ButtonHTMLAttributes, FC, MouseEvent, Ref } from 'react';
import { createInput } from '@vega-ui/core';
import { Slot } from '../../../Slot';
import { useDrawerContext } from '../../contexts';
import { OPEN_DIALOG } from '@vega-ui/widgets/modal-dialog';

export interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a child element using `Slot`.
   * This enables custom wrappers (e.g., <a>, <div>) to inherit drawer-opening behavior.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Ref forwarded to the native button or slotted element.
   * Useful for focus management or integrations.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The DrawerTrigger component is an interactive control—usually a button or custom slotted element—that toggles the visibility of a drawer, supporting asChild for flexible rendering and integration with custom trigger elements */
export const DrawerTrigger: FC<DrawerTriggerProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { handle } = useDrawerContext()

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (event.defaultPrevented) return

    handle.send(createInput(OPEN_DIALOG))
  }

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      aria-haspopup='dialog'
      onClick={onClick}
      {...props}
    >
      {children}
    </Element>
  )
}
