'use client';
import { FC, ReactElement, ReactNode, Ref } from 'react';
import styles from './style.module.css'
import {
  autoUpdate,
  flip, FloatingFocusManager, FloatingOverlay,
  offset, Placement,
  shift, useClick, useDismiss,
  useFloating,
  useInteractions, useRole, useTransitionStyles
} from '@floating-ui/react';
import { mergeRefs, csx } from '@adara-cs/utils';
import { useControlledState } from '@adara-cs/hooks';

export interface PopoverProps {
  className?: string
  triggerSlot?: (ref: Ref<never>, props?: Record<string, unknown>) => ReactElement
  children?: ReactNode
  placement?: Placement
  lockScroll?: boolean
  overlay?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(state: boolean): void
  blurredOverlay?: boolean
  role?: 'combobox' | 'listbox' | 'dialog' | 'select'
  ref?: Ref<HTMLDivElement>
}

export const Popover: FC<PopoverProps> = ({
  triggerSlot,
  placement = 'bottom',
  role: ariaRole,
  lockScroll = false,
  overlay = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  blurredOverlay = true,
  className,
  children,
  ref,
}) => {
  const [open, setOpen] = useControlledState(controlledOpen, defaultOpen, onOpenChange);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift()],
    placement,
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: ariaRole });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  const content = (
    <FloatingFocusManager context={context}>
      <div
        ref={mergeRefs([refs.setFloating, ref])}
        style={{ ...floatingStyles, ...transitionStyles }}
        className={csx(styles.popover, className)}
        {...getFloatingProps()}
      >
        {children}
      </div>
    </FloatingFocusManager>
  )

  return (
    <>
      {triggerSlot?.(refs.setReference, getReferenceProps())}
      {open && (
        overlay ? (
          <FloatingOverlay lockScroll={lockScroll} className={csx(styles.popoverOverlay, blurredOverlay ? styles.popoverOverlayBlurred : undefined)}>
            {content}
          </FloatingOverlay>
        ) : content
      )}
    </>
  )
}