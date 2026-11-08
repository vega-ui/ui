'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeEventHandlers } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useDialogContext } from '../../contexts';

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

  const { changeOpen } = useDialogContext()

  const onClick = () => {
    changeOpen(false)
  }

  return (
    <Element type='button' onClick={mergeEventHandlers(onClick, _onClick)} {...props}>
      {children}
    </Element>
  )
}
