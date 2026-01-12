'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
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
  const { contentProps, context, contentStyle, open } = useTooltipContext()
  const { status } = useTransitionStatus(context)

  return (
    <>
      {open && (
        <div
          data-status={status}
          ref={mergeRefs([context?.refs.setFloating, ref])}
          className={csx(styles.tooltipContent, className)}
          style={{ ...contentStyle, ...style }}
          {...mergeProps(contentProps ?? {}, props)}
        >
          {children}
        </div>
      )}
    </>
  )
}