'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeEventHandlers } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useSheetContext } from '../../contexts';

export interface SheetTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a custom element using a Slot.
   * Allows flexible composition with custom elements like <a>, <div>, or icon buttons.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying trigger element.
   * Useful for focus management or external control.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The SheetTrigger component is the interactive element—typically a button or a slotted custom element—that opens a Sheet, supporting flexible rendering with the asChild prop for advanced composition */
export const SheetTrigger: FC<SheetTriggerProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { open, changeOpen } = useSheetContext()

  const onClick = () => changeOpen(true)

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      aria-haspopup='dialog'
      aria-expanded={open}
      onClick={mergeEventHandlers(onClick, _onClick)}
      {...props}
    >
      {children}
    </Element>
  )
}
