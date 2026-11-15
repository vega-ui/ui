'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useSnapshot } from '../../../internals/widget';
import styles from './style.module.css';
import { useTooltipContext } from '../../contexts';
import { CONTENT, isRendered, tooltipWidget } from '@vega-ui/widgets/tooltip';

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
  const { handle, contentId, placement = 'bottom', anchorName, setContent } = useTooltipContext()
  const attrs = useOutput(handle, tooltipWidget.output.content)
  const rendered = useSnapshot(handle, isRendered)
  const mergedRef = useMergeRefs([handle.rootAt(CONTENT, tooltipWidget.output.content), setContent, ref])
  const [side, align = 'center'] = placement.split('-')

  if (!rendered) return null

  return (
    <div
      id={contentId}
      data-side={side}
      data-align={align}
      ref={mergedRef}
      className={csx(styles.tooltipContent, className)}
      style={{ positionAnchor: anchorName, ...style }}
      {...handle.listen(attrs, props)}
    >
      {children}
    </div>
  )
}
