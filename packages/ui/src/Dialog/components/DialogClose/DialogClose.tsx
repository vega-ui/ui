'use client';

import { ButtonHTMLAttributes, FC, MouseEvent, Ref } from 'react';
import { createInput } from '@vega-ui/core';
import { Slot } from '../../../Slot';
import { useDialogContext } from '../../contexts';
import { CLOSE_DIALOG } from '@vega-ui/widgets/modal-dialog';

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the close action as its child element using `Slot`,
   * so any button of your own closes the dialog.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The DialogClose component is a button that closes the dialog, with no styles of its own: render your own button inside it with asChild */
export const DialogClose: FC<DialogCloseProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { handle } = useDialogContext()

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (!event.defaultPrevented) handle.send(createInput(CLOSE_DIALOG))
  }

  return (
    <Element type='button' onClick={onClick} {...props}>
      {children}
    </Element>
  )
}
