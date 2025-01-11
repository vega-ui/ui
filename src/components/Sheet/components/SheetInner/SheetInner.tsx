import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren, Ref,
} from 'react';
import { SheetHandle } from '../SheetHandle';
import { SheetContent } from '../SheetContent';
import { SheetContainer } from '../SheetContainer';

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
  touchAction?: CSSProperties['touchAction']
  handleClassName?: string
  contentClassName?: string
}

export const SheetInner = forwardRef<HTMLDivElement, PropsWithChildren<SheetInnerProps>>(({
  status,
  children,
  dragging,
  offset = 0,
  contentRef,
  scrollable,
  shadow = false,
  touchAction,
  contentClassName,
  handleClassName,
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
      <SheetContent className={contentClassName} ref={contentRef} scrollable={scrollable} touchAction={touchAction}>
        {children}
      </SheetContent>
    </SheetContainer>
  )
})