'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { useDrawerContext } from '../../contexts';
import { mergeEventHandlers } from '@vega-ui/utils';

export interface DrawerCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the close action as its child element using `Slot`,
   * so any button of your own closes the drawer.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The DrawerClose component is a button that closes the drawer, with no styles of its own: render your own button inside it with asChild */
export const DrawerClose: FC<DrawerCloseProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { changeOpen } = useDrawerContext()

  const onClick = () => {
    changeOpen(false)
  }

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      onClick={mergeEventHandlers(onClick, _onClick)}
      {...props}
    >
      {children}
    </Element>
  )
}