'use client';

import { FC, ReactElement, Ref, useRef, useState } from 'react';
import { csx } from '../../utils/css';
import {
  arrow, autoUpdate, flip, FloatingArrow, offset, shift,
  useDismiss,
  useFloating, useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import styles from './style.module.css'
import { Text, TextProps } from '../Text';

export interface TooltipProps {
  className?: string
  triggerSlot?: (ref: Ref<never>, props?: Record<string, unknown>) => ReactElement
  children?: string | string[]
  fontSize?: TextProps['size']
  fontWeight?: TextProps['fontWeight']
  delayOpen?: number
  delayClose?: number
}

export const Tooltip: FC<TooltipProps> = ({
  triggerSlot,
  className,
  fontSize = 2,
  fontWeight,
  delayOpen = 500,
  delayClose = 0,
  children
}) => {
  const arrowRef = useRef(null);

  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(14),
      flip(),
      shift(),
    ],
    open,
    onOpenChange: setOpen,
  });

  const hover = useHover(context, { move: false, delay: { open: delayOpen, close: delayClose } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return (
    <>
      {triggerSlot?.(refs.setReference, getReferenceProps({ tabIndex: 0 }))}
      {open && (
        <div ref={refs.setFloating} className={csx(styles.tooltip, className)} style={{ ...floatingStyles, ...transitionStyles}} {...getFloatingProps()}>
          <FloatingArrow className={styles.arrow} ref={arrowRef} context={context} />
          <Text size={fontSize} fontWeight={fontWeight} className={styles.content}>
            {children}
          </Text>
        </div>
      )}
    </>
  )
}