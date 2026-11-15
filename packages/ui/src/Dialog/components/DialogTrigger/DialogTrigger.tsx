'use client';

import { ButtonHTMLAttributes, FC, MouseEvent, Ref } from 'react';
import { createInput } from '@vega-ui/core';
import { Slot } from '../../../Slot';
import { useDialogContext } from '../../contexts';
import { OPEN_DIALOG } from '@vega-ui/widgets/modal-dialog';

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a child element using `Slot`.
   * Allows for custom wrapper elements (e.g., <a>, <div>) to behave as modal triggers.
   *
   * @default false
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

  const { handle } = useDialogContext()

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
