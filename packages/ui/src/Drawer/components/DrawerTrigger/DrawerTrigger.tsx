'use client';

import { ButtonHTMLAttributes, FC, MouseEvent, Ref } from 'react';
import { mergeEventHandlers } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useDrawerContext } from '../../contexts';

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

  const { changeOpen } = useDrawerContext()

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.focus()
    changeOpen(true)
  }

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      aria-haspopup='dialog'
      onClick={mergeEventHandlers(onClick, _onClick)}
      {...props}
    >
      {children}
    </Element>
  )
}
