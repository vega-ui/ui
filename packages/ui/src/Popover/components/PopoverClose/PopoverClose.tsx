'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeEventHandlers } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { usePopoverContext } from '../../contexts';

export interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the close action as its child element using `Slot`,
   * so any button of your own closes the popover.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The PopoverClose component is a button that closes the popover, with no styles of its own: render your own button inside it with asChild */
export const PopoverClose: FC<PopoverCloseProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { changeOpen } = usePopoverContext()

  const onClick = () => {
    changeOpen(false)
  }

  return (
    <Element type='button' onClick={mergeEventHandlers(onClick, _onClick)} {...props}>
      {children}
    </Element>
  )
}
