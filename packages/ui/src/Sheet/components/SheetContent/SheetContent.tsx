'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import { useSheetContext } from '../../contexts';
import { useTransitionStatus } from '@floating-ui/react';
import styles from './style.module.css'

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name for custom styling of the sheet container.
   */
  className?: string

  /**
   * Ref forwarded to the root sheet container.
   * Useful for focus management, measurement, or animation hooks.
   */
  ref?: Ref<HTMLDivElement>
  
  /**
   * Applies a visual shadow to the sheet panel.
   * Adds depth and separation from the background.
   */
  shadowed?: boolean
}

/** The SheetContent component is the main container for a sliding sheet or bottom drawer, supporting scrollable content, overlays, headers, and visibility toggling for responsive, layered UI panels */
export const SheetContent: FC<SheetContentProps> = ({
  className,
  ref,
  children,
  shadowed,
  style,
  ...props
}) => {
  const {
    context,
    contentRef,
    contentProps = {},
    transitionStatus,
    onPress,
    onDrag,
    onScrollCapture,
    onRelease,
    offset = 0,
    transforming,
  } = useSheetContext()
  const { status } = useTransitionStatus(context)
  
  const mergedStyles = { ...(status === 'open' ? { transform: `translateY(${offset}px)` } : {}), ...style }
  
  return (
    <div
      className={csx(styles.content, className)}
      onScrollCapture={onScrollCapture}
      onPointerDown={onPress}
      onPointerMove={onDrag}
      onPointerUp={onRelease}
      data-status={transitionStatus}
      ref={mergeRefs([contentRef, ref])}
      style={mergedStyles}
      data-dragging={transforming}
      data-shadow={shadowed}
      {...mergeProps(contentProps, props)}
    >
      {children}
    </div>
  )
}