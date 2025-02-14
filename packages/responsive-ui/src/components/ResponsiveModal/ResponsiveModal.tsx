'use client';

import { FC, Ref } from 'react';
import { Modal, Sheet, SheetProps, ModalProps } from '@adara-cs/ui-kit-web';
import { ResponsiveModalProvider } from './providers/ResponsiveModalProvider';

export interface ResponsiveModalProps extends ModalProps, SheetProps {
  isBreakpoint?: boolean
  ref?: Ref<HTMLDivElement>
}

export const ResponsiveModal: FC<ResponsiveModalProps> = ({
  isBreakpoint = false,
  ref,
  ...props
}) => {
  return (
    <ResponsiveModalProvider isBreakpoint={isBreakpoint}>
      {isBreakpoint ? (
        <Sheet
          ref={ref}
          {...props}
        />
      ): (
        <Modal
          ref={ref}
          {...props}
        />
      )}
    </ResponsiveModalProvider>
  )
}