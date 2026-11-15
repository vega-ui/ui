'use client';

import { ButtonHTMLAttributes, FC, MouseEvent, Ref } from 'react';
import { createInput } from '@vega-ui/core';
import { Slot } from '../../../Slot';
import { useSheetContext } from '../../contexts';
import { CLOSE_DIALOG } from '@vega-ui/widgets/modal-dialog';

export interface SheetCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the close action as its child element using `Slot`,
   * so any button of your own closes the sheet.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The SheetClose component is a button that closes the sheet, with no styles of its own: render your own button inside it with asChild */
export const SheetClose: FC<SheetCloseProps> = ({ asChild, children, onClick: _onClick, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { handle } = useSheetContext()

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
