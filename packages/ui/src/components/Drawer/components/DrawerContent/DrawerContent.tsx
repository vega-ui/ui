'use client';
import {
  FC,
  HTMLAttributes, JSX, Ref,
} from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import style from './style.module.css'
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { DrawerOverlay } from '../DrawerOverlay';
import { useDrawerContext } from '../../hooks';

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enables vertical scrolling inside the drawer body.
   * Useful for long content within fixed-height drawers.
   */
  scrollable?: boolean

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
   * Custom node(s) rendered in the header area of the drawer.
   * Typically used for titles, close buttons, or actions.
   */
  headerSlot?: JSX.Element | JSX.Element[]

  /**
   * Applies a blurred background overlay behind the drawer content.
   * Useful for modal-style drawer overlays.
   */
  blurredOverlay?: boolean

  /**
   * Adds a shadow to the drawer panel for depth and separation.
   */
  shadowed?: boolean

  /**
   * Indicates that the drawer floats over the main content (not pushed from the edge).
   */
  overlaid?: boolean

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
  scrollable,
  headerSlot,
  fullHeight,
  fullWidth,
  overlaid = true,
  shadowed = !overlaid,
  children,
  blurredOverlay,
  ref,
  ...props
}) => {
  const { position, transitionStatus, contentProps = {}, contentRef, isMounted, context } = useDrawerContext()

  const content = (
    <div
      data-position={position}
      data-full-width={fullWidth}
      data-full-height={fullHeight}
      data-status={transitionStatus}
      data-shadow={shadowed}
      ref={mergeRefs([ref, contentRef])}
      className={csx(style.drawer, className)}
      {...mergeProps(props, contentProps)}
    >
      {headerSlot}
      <div
        ref={ref}
        className={csx(style.drawerContent, className)}
        data-scrollable={scrollable}
        {...props}
      >
        {children}
      </div>
    </div>
  )

  return (
    <FloatingPortal>
      {isMounted && (
        <FloatingFocusManager context={context}>
          {overlaid ? (
            <DrawerOverlay blurred={blurredOverlay} hidden={!isMounted}>
              {content}
            </DrawerOverlay>
          ) : content}
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
}