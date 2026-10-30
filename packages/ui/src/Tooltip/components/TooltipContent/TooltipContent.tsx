'use client';
import { CSSProperties, FC, HTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import { csx, mergeRefs, togglePopover } from '@vega-ui/utils';
import styles from './style.module.css';
import { useTooltipContext } from '../../contexts';
import { useTransitionStatus } from '@floating-ui/react';

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the tooltip content element.
   * Useful for positioning, measuring, or managing focus.
   */
  ref?: Ref<HTMLDivElement>
}

/** The TooltipContent component defines the styled body of a tooltip, allowing custom content, font size, and weight, and is positioned relative to a TooltipTrigger to display contextual information. */
export const TooltipContent: FC<TooltipContentProps> = ({
  className,
  ref,
  children,
  style,
  ...props
}) => {
  const { context, contentId, side = 'top', arrowX, arrowY, setFloating, contentStyle } = useTooltipContext()
  const { status, isMounted } = useTransitionStatus(context)
  const element = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (isMounted) togglePopover(element.current, true)
  }, [isMounted])

  if (!isMounted) return null

  return (
    <div
      id={contentId}
      role='tooltip'
      popover='manual'
      data-status={status}
      data-side={side}
      ref={mergeRefs([element, setFloating, ref])}
      className={csx(styles.tooltipContent, className)}
      style={{
        ...contentStyle,
        '--tooltip-arrow-x': arrowX === undefined ? undefined : `${arrowX}px`,
        '--tooltip-arrow-y': arrowY === undefined ? undefined : `${arrowY}px`,
        ...style,
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
