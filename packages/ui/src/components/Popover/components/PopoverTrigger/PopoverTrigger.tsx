'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { mergeProps, mergeRefs } from '@adara-cs/utils';
import { usePopoverContext } from '../../hooks';

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const PopoverTrigger: FC<PopoverTriggerProps> = ({
  ref,
  asChild,
  children,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = usePopoverContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}