'use client';
import { CSSProperties, FC, HTMLAttributes, PointerEvent, Ref, useLayoutEffect, useRef, useState } from 'react';
import { csx, mergeEventHandlers, togglePopover } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import styles from './style.module.css';
import { useTooltipContext } from '../../contexts';

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
  onPointerEnter: _onPointerEnter,
  onPointerLeave: _onPointerLeave,
  ...props
}) => {
  const { open, cancelHide, hideAfterDelay, context, contentId, side = 'top', arrowX, arrowY, setFloating, contentStyle } = useTooltipContext()
  const [mounted, setMounted] = useState(open)
  const element = useRef<HTMLDivElement>(null)
  const mergedRef = useMergeRefs([element, setFloating, ref])

  if (open && !mounted) setMounted(true)

  useLayoutEffect(() => {
    const popover = element.current
    if (!popover) return

    if (open) {
      togglePopover(popover, true)
      return
    }

    let cancelled = false

    Promise.allSettled(popover.getAnimations().map((animation) => animation.finished)).then(() => {
      if (!cancelled) setMounted(false)
    })

    return () => {
      cancelled = true
    }
  }, [open, mounted])

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && context.elements.domReference?.contains(event.relatedTarget)) return

    hideAfterDelay()
  }

  if (!mounted) return null

  return (
    <div
      id={contentId}
      role='tooltip'
      popover='manual'
      data-status={open ? 'open' : 'close'}
      data-side={side}
      ref={mergedRef}
      className={csx(styles.tooltipContent, className)}
      style={{
        ...contentStyle,
        '--tooltip-arrow-x': arrowX === undefined ? undefined : `${arrowX}px`,
        '--tooltip-arrow-y': arrowY === undefined ? undefined : `${arrowY}px`,
        ...style,
      } as CSSProperties}
      onPointerEnter={mergeEventHandlers(cancelHide, _onPointerEnter)}
      onPointerLeave={mergeEventHandlers(onPointerLeave, _onPointerLeave)}
      {...props}
    >
      {children}
    </div>
  )
}
