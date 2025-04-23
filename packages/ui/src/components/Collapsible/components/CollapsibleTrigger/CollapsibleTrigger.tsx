'use client';
import { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';
import { useCollapsibleContext } from '../../hooks';
import { Slot } from '../../../Slot';

export interface CollapsibleTriggerProps extends HTMLAttributes<HTMLElement> {
  className?: string
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const CollapsibleTrigger: FC<CollapsibleTriggerProps> = ({
  className,
  onClick: _onClick,
  children,
  asChild,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'button';

  const { opened, open, close } = useCollapsibleContext()

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (opened) close()
    else open()

    _onClick?.(e)
  }

  return (
    <Element type={Element === 'button' ? 'button' : undefined} aria-expanded={opened} data-open={opened} onClick={onClick} ref={ref}
             className={csx(style.triggerButton, className)} {...props}>
      {children}
    </Element>
  )
}