'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { Slot } from '../../../Slot';
import { useTooltipContext } from '../../hooks';
import { mergeProps, mergeRefs } from '@adara-cs/utils';

export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const TooltipTrigger: FC<ModalTriggerProps> = ({ asChild, children, ref, ...props }) => {
  const Element = asChild ? Slot : 'button'

  const { triggerRef, triggerProps = {} } = useTooltipContext()

  return (
    <Element {...mergeProps(props, triggerProps)} ref={mergeRefs([triggerRef, ref])}>
      {children}
    </Element>
  )
}