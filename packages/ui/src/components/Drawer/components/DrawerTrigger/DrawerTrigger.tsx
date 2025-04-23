'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { mergeProps, mergeRefs } from '@adara-cs/utils';
import { Slot } from '../../../Slot';
import { useDrawerContext } from '../../hooks';

export interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const DrawerTrigger: FC<DrawerTriggerProps> = ({
  asChild,
  children,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = useDrawerContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}