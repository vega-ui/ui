'use client';
import { FC, ReactNode, Ref } from 'react';
import {
  FloatingArrow,
} from '@floating-ui/react';
import { csx, mergeRefs } from '@adara-cs/utils';
import styles from './style.module.css';
import { useTooltipContext } from '../../hooks';
import { Text, TextProps } from '../../../Text';

export interface TooltipContentProps {
  /**
   * Custom class name for styling the tooltip content container.
   */
  className?: string

  /**
   * Ref forwarded to the tooltip content element.
   * Useful for positioning, measuring, or managing focus.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * The text or elements displayed inside the tooltip.
   */
  children?: ReactNode

  /**
   * Font size applied to the tooltip content.
   * Inherits values from the `Text` component scale.
   */
  fontSize?: TextProps['size']

  /**
   * Font weight applied to the tooltip content.
   * Inherits values from the `Text` component scale.
   */
  fontWeight?: TextProps['fontWeight']
}

/** The TooltipContent component defines the styled body of a tooltip, allowing custom content, font size, and weight, and is positioned relative to a TooltipTrigger to display contextual information. */
export const TooltipContent: FC<TooltipContentProps> = ({
  className,
  ref,
  fontWeight,
  fontSize = 2,
  children,
}) => {
  const { contentProps, contentRef, context, contentStyle, arrowRef, open } = useTooltipContext()

  return (
    <>
      {open && (
        <div ref={mergeRefs([contentRef, ref])} className={csx(styles.tooltip, className)}
             style={contentStyle} {...contentProps}>
          <FloatingArrow className={styles.arrow} ref={arrowRef} context={context}/>
          <Text size={fontSize} fontWeight={fontWeight} className={styles.content}>
            {children}
          </Text>
        </div>
      )}
    </>
  )
}