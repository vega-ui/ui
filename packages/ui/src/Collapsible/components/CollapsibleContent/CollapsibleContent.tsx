'use client';
import { FC, HTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import style from './style.module.css';
import { csx, mergeRefs } from '@vega-ui/utils';
import { useCollapsibleContext } from '../../contexts';

export interface CollapsibleContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Ref forwarded to the root collapsible content container.
   * Useful for measuring height, managing animation, or setting focus.
   */
  ref?: Ref<HTMLDivElement>
}

/** The CollapsibleContent component holds the expandable content of a Collapsible section and is shown or hidden based on the trigger state, with optional animation and accessibility support */
export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  ref,
  className,
  children,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const { opened, onTransitionEnd, hidden, contentId } = useCollapsibleContext()

  useLayoutEffect(() => {
    const contentNode = contentRef.current
    if (!contentNode) return
    
    contentNode.style.setProperty('--content-height', contentNode.scrollHeight + 'px')
  });

  return (
    <div
      hidden={hidden}
      data-open={opened}
      onTransitionEnd={onTransitionEnd}
      ref={mergeRefs([ref, contentRef])}
      className={csx(style.content, className)}
      id={contentId}
      {...props}
    >
      {children}
    </div>
  )
}