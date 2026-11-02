import { FC } from 'react';
import { FloatingArrow, FloatingArrowProps } from '@floating-ui/react';
import { useTooltipContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import style from './style.module.css';

export type TooltipArrowProps = Omit<FloatingArrowProps, 'context'>

/**
 * TooltipArrow
 *
 * A visual arrow element for the `Tooltip` component that points from
 * the tooltip content toward its trigger element.
*/
export const TooltipArrow: FC<TooltipArrowProps> = ({ className, ref, ...props }) => {
  const { context, arrowRef } = useTooltipContext()
  const mergedRef = useMergeRefs([ref, arrowRef])
  
  return (
    <FloatingArrow
      className={csx(style.arrow, className)}
      ref={mergedRef}
      context={context}
      {...props}
    />
  )
}