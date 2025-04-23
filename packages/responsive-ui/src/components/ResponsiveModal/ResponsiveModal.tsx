'use client';

import { FC } from 'react';
import { Modal, Sheet, SheetProps, ModalProps } from '@adara-cs/ui-kit-web';
import { ResponsiveModalProvider } from './providers';

export interface ResponsiveModalProps extends ModalProps, SheetProps {
  isBreakpoint?: boolean
}

export const ResponsiveModal: FC<ResponsiveModalProps> = ({
  isBreakpoint = false,
  ...props
}) => {
  return (
    <ResponsiveModalProvider isBreakpoint={isBreakpoint}>
      {isBreakpoint ? (
        <Sheet
          {...props}
        />
      ): (
        <Modal
          {...props}
        />
      )}
    </ResponsiveModalProvider>
  )
}