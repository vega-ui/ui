'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
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
  ...props
}) => {
  const { contentProps, context, contentStyle, open } = useTooltipContext()

  return (
    <>
      {open && (
        <div
          ref={mergeRefs([context?.refs.setFloating, ref])}
          className={csx(styles.tooltip, className)}
          style={{ ...contentStyle, ...style }}
          {...mergeProps(contentProps ?? {}, props)}
        >
          {children}
        </div>
      )}
    </>
  )
}