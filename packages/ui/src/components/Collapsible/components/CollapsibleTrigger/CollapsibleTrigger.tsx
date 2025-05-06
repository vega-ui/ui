'use client';
import { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { useCollapsibleContext } from '../../hooks';
import { Slot } from '../../../Slot';

export interface CollapsibleTriggerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional class name for custom styling of the trigger element.
   */
  className?: string

  /**
   * If true, renders the trigger as a child component using `Slot` (e.g. <a> or <div>).
   * This allows custom semantics or styling while preserving collapsible behavior.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the native trigger element (typically a button).
   */
  ref?: Ref<HTMLButtonElement>
}

/** The CollapsibleTrigger component is the interactive element—typically a button or custom slot—that toggles the open or closed state of a Collapsible section */
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