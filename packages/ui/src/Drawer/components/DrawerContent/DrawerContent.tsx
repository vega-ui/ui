'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import style from './style.module.css'
import { useDrawerContext } from '../../contexts';

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom class name applied to the drawer content container.
   */
  className?: string

  /**
   * Ref forwarded to the drawer content element.
   * Useful for measuring, focusing, or animation hooks.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Adds a shadow to the drawer panel for depth and separation.
   */
  shadowed?: boolean

  /**
   * Makes the drawer stretch to fill the full width of its parent container.
   */
  fullWidth?: boolean

  /**
   * Makes the drawer stretch to fill the full height of its parent container.
   */
  fullHeight?: boolean
}

/** The DrawerContent component is the main content area of a drawer, supporting scrollable layouts, optional headers, visual overlays, and full-size configurations for flexible and responsive panel design */
export const DrawerContent: FC<DrawerContentProps> = ({
  className,
  fullHeight,
  fullWidth,
  shadowed,
  children,
  ref,
  ...props
}) => {
  const { position, transitionStatus, contentProps = {}, context } = useDrawerContext()
  
  return (
    <div
      data-position={position}
      data-full-width={fullWidth}
      data-full-height={fullHeight}
      data-status={transitionStatus}
      data-shadow={shadowed}
      ref={mergeRefs([ref, context.refs?.setFloating])}
      className={csx(style.drawer, className)}
      {...mergeProps(props, contentProps)}
    >
      {children}
    </div>
  )
}