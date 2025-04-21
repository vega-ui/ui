'use client';
import { ComponentPropsWithRef, ElementType, MouseEvent } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';
import { useCollapsibleContext } from '../../hooks';

export type CollapsibleTriggerProps<T extends ElementType = 'button'> = {
  className?: string
  as?: T
} & Omit<ComponentPropsWithRef<T>, 'as'>;

export const CollapsibleTrigger = <T extends ElementType = 'button'>({
  className,
  onClick: _onClick,
  children,
  as,
  ref,
  ...props
}: CollapsibleTriggerProps<T>) => {
  const Element = as || 'button';

  const { opened, open, close } = useCollapsibleContext()

  const onClick = (e: MouseEvent) => {
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