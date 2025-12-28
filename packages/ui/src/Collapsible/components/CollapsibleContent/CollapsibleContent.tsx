'use client';
import { FC, HTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import style from './style.module.css';
import { csx, mergeRefs } from '@vega-ui/utils';
import { useCollapsibleContext } from '../../contexts';

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the root collapsible content container.
   * Useful for measuring height, managing animation, or setting focus.
   */
  ref?: Ref<HTMLDivElement>
}

/** The CollapsibleContent component holds the expandable content of a Collapsible section and is shown or hidden based on the trigger state, with optional animation and accessibility support */
export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  className,
  ref,
  children,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const { opened, onTransitionEnd, hidden } = useCollapsibleContext()

  useLayoutEffect(() => {
    const contentNode = contentRef.current
    if (!contentNode) return
    
    contentNode.style.setProperty('--content-height', contentNode.scrollHeight + 'px')
  });

  return (
    <div
      ref={mergeRefs([ref, contentRef])}
      data-open={opened}
      hidden={hidden}
      onTransitionEnd={onTransitionEnd}
      className={csx(style.content, className)}
      {...props}
    >
      {children}
    </div>
  )
}