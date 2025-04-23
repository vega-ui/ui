'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeProps, mergeRefs } from '@adara-cs/utils';
import { Slot } from '../../../Slot';
import { useSheetContext } from '../../hooks';

export interface SheetTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const SheetTrigger: FC<SheetTriggerProps> = ({
  asChild,
  children,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = useSheetContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}