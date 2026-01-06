'use client';
import { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { useCollapsibleContext } from '../../contexts';
import { Slot } from '../../../Slot';

export interface CollapsibleTriggerProps extends HTMLAttributes<HTMLElement> {
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

  const { opened, open, close, contentId } = useCollapsibleContext()

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (opened) close()
    else open()

    _onClick?.(e)
  }

  return (
    <Element
      ref={ref}
      onClick={onClick}
      data-open={opened}
      aria-expanded={opened}
      aria-controls={contentId}
      className={csx(style.triggerButton, className)}
      type={Element === 'button' ? 'button' : undefined}
      {...props}
    >
      {children}
    </Element>
  )
}