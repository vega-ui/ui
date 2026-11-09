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
  const { opened, hidden, contentId, hide } = useCollapsibleContext()

  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation>(null)
  const openedRef = useRef(opened)

  useLayoutEffect(() => {
    const contentNode = contentRef.current
    if (!contentNode || openedRef.current === opened) return
    openedRef.current = opened

    const startsHidden = opened && animationRef.current?.playState !== 'running'
    const from = startsHidden ? 0 : contentNode.getBoundingClientRect().height
    animationRef.current?.cancel()
    const to = opened ? contentNode.getBoundingClientRect().height : 0

    const { animationDuration, animationTimingFunction } = getComputedStyle(contentNode)
    animationRef.current = contentNode.animate({ height: [from + 'px', to + 'px'] }, {
      duration: parseFloat(animationDuration) * 1000,
      easing: animationTimingFunction,
      fill: opened ? 'none' : 'forwards',
    })

    if (!opened) animationRef.current.onfinish = hide
  }, [opened, hide]);

  return (
    <div
      hidden={hidden}
      data-open={opened}
      ref={mergeRefs([ref, contentRef])}
      className={csx(style.content, className)}
      id={contentId}
      {...props}
    >
      {children}
    </div>
  )
}