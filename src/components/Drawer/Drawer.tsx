'use client';

import {
  HTMLAttributes,
  ReactNode,
  useRef,
  Ref, ReactElement, forwardRef,
} from 'react';
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus
} from '@floating-ui/react';
import { DrawerOverlay, DrawerContent } from './components';
import { useControlledState } from '../../hooks';
import { csx } from '../../utils/css';
import styles from './style.module.css';
import { mergeRefs } from '../../utils/margeRefs';
import { DrawerProvider } from './providers';

export type DrawerPosition = 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'

export interface DrawerProps extends HTMLAttributes<HTMLElement> {
  dismissible?: boolean
  withOverlay?: boolean
  shadowed?: boolean
  scrollable?: boolean
  open?: boolean
  onChangeOpen?: (value: boolean | undefined) => void
  headerSlot?: JSX.Element | JSX.Element[]
  blurredOverlay?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  position?: DrawerPosition
  children?: ReactNode | ReactNode[]
  triggerSlot?: (ref: Ref<never>, props?: Record<string, unknown>) => ReactElement
  className?: string
  contentClassName?: string
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  children,
  triggerSlot,
  headerSlot,
  withOverlay = true,
  shadowed = !withOverlay,
  blurredOverlay = true,
  dismissible = true,
  fullWidth = false,
  fullHeight = false,
  position = 'right',
  scrollable = true,
  open: controlledOpen,
  onChangeOpen: controlledOnChangeOpen,
  className,
  contentClassName,
  ...props
}, ref) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useControlledState(controlledOpen, false, controlledOnChangeOpen)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown',
    enabled: dismissible
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const { isMounted, status } = useTransitionStatus(context);

  const content = (
    <div
      data-position={position}
      data-full-width={fullWidth}
      data-full-height={fullHeight}
      data-status={status}
      data-shadow={shadowed}
      ref={mergeRefs([ref, refs.setFloating])}
      className={csx(styles.drawer, className)}
      {...getFloatingProps(props)}
    >
      {headerSlot}
      <DrawerContent scrollable={scrollable} className={contentClassName} ref={contentRef}>
        {children}
      </DrawerContent>
    </div>
  )

  return (
    <>
      {triggerSlot?.(refs.setReference, getReferenceProps())}
      <FloatingPortal>
        <DrawerProvider open={isOpen} onChangeOpen={setIsOpen}>
          {isMounted && (
            <FloatingFocusManager context={context}>
              {withOverlay ? (
                <DrawerOverlay blurred={blurredOverlay} hidden={!isMounted}>
                  {content}
                </DrawerOverlay>
              ) : content}
            </FloatingFocusManager>
          )}
        </DrawerProvider>
      </FloatingPortal>
    </>
  )
})