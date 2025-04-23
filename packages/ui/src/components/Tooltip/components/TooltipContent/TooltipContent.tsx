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
  className?: string
  ref?: Ref<HTMLDivElement>
  children?: ReactNode
  fontSize?: TextProps['size']
  fontWeight?: TextProps['fontWeight']
}

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