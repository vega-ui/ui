'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeEventHandlers } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useSheetContext } from '../../contexts';

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

  const { changeOpen } = useSheetContext()

  const onClick = () => {
    changeOpen(false)
  }

  return (
    <Element type='button' onClick={mergeEventHandlers(onClick, _onClick)} {...props}>
      {children}
    </Element>
  )
}
