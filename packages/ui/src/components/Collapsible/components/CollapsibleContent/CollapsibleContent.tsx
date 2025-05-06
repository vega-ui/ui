'use client';
import { FC, HTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import style from './style.module.css';
import { csx, mergeRefs } from '@vega-ui/utils';
import { useCollapsibleContext } from '../../hooks';

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name for the outer wrapper that may contain animation or layout styling.
   */
  wrapperClassName?: string

  /**
   * Ref forwarded to the root collapsible content container.
   * Useful for measuring height, managing animation, or setting focus.
   */
  ref?: Ref<HTMLDivElement>
}

/** The CollapsibleContent component holds the expandable content of a Collapsible section and is shown or hidden based on the trigger state, with optional animation and accessibility support */
export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  className,
  wrapperClassName,
  ref,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { opened, onTransitionEnd, hidden } = useCollapsibleContext()

  useLayoutEffect(() => {
    const contentNode = contentRef.current
    const wrapperNode = wrapperRef.current

    if (contentNode && wrapperNode) {
      const rectHeight = wrapperNode.getBoundingClientRect().height
      contentNode.style.setProperty('--content-height', rectHeight + 'px')
    }
  });

  return (
    <div ref={mergeRefs([ref, contentRef])} data-type='content' data-open={opened} hidden={hidden} onTransitionEnd={onTransitionEnd} className={csx(style.content, className)}>
      <div ref={wrapperRef} className={wrapperClassName}>
        {children}
      </div>
    </div>
  )
}