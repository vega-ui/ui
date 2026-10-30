'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { useDialogContext } from '../../contexts';
import { mergeEventHandlers } from '@vega-ui/utils';

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a child element using `Slot`.
   * Allows for custom wrapper elements (e.g., <a>, <div>) to behave as modal triggers.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying trigger element (typically a <button>).
   * Useful for focus control or imperative access.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The DialogTrigger component is an interactive element—usually a button or slotted custom element—that opens a modal dialog when activated, supporting flexible composition via the asChild prop */
export const DialogTrigger: FC<DialogTriggerProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { open, changeOpen } = useDialogContext()

  const onClick = () => {
    changeOpen(true)
  }

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