'use client';
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren, ReactNode, Ref,
} from 'react';
import { SheetHandle } from '../SheetHandle';
import { SheetContent } from '../SheetContent';
import { SheetContainer } from '../SheetContainer';
import { SheetHeader } from '../SheetHeader';

type TransitionStatus = 'unmounted' | 'initial' | 'open' | 'close'

export interface SheetInnerProps extends HTMLAttributes<HTMLDivElement> {
  hidden?: boolean
  className?: string
  status?: TransitionStatus
  dragging?: boolean
  shadow?: boolean
  offset: number
  contentRef?: Ref<HTMLDivElement>
  scrollable?: boolean
  handleClassName?: string
  contentClassName?: string
  headerSlot?: ReactNode | ReactNode[]
}

export const SheetInner = forwardRef<HTMLDivElement, PropsWithChildren<SheetInnerProps>>(({
  status,
  children,
  dragging,
  offset = 0,
  contentRef,
  scrollable,
  shadow = false,
  contentClassName,
  handleClassName,
  headerSlot,
  ...props
}, ref) => {
  return (
    <SheetContainer
      status={status}
      dragging={dragging}
      offset={offset}
      shadow={shadow}
      ref={ref}
      {...props}
    >
      <SheetHandle className={handleClassName} />
      {headerSlot && (
        <SheetHeader>
          {headerSlot}
        </SheetHeader>
      )}
      <SheetContent className={contentClassName} ref={contentRef} scrollable={scrollable}>
        {children}
      </SheetContent>
    </SheetContainer>
  )
})