'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { useModalContext } from '../../hooks';
import { mergeProps, mergeRefs } from '@adara-cs/utils';

export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const ModalTrigger: FC<ModalTriggerProps> = ({ asChild, children, ref, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = useModalContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}