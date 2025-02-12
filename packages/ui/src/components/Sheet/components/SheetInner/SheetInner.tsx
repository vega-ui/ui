'use client';
import {
  FC,
  HTMLAttributes,
  ReactNode, Ref,
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
  ref?: Ref<HTMLDivElement>
}

export const SheetInner: FC<SheetInnerProps> = ({
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
  ref,
  ...props
}) => {
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
}