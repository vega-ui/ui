'use client';
import {
  FC,
  HTMLAttributes, JSX, Ref,
} from 'react';
import { csx, mergeProps, mergeRefs } from '@adara-cs/utils';
import style from './style.module.css'
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { DrawerOverlay } from '../DrawerOverlay';
import styles from '../../style.module.css';
import { useDrawerContext } from '../../hooks';

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean
  className?: string
  ref?: Ref<HTMLDivElement>
  headerSlot?: JSX.Element | JSX.Element[]
  blurredOverlay?: boolean
  shadowed?: boolean
  overlaid?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
}

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
      className={csx(styles.drawer, className)}
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