import { FC } from 'react';
import { useResponsiveModalContext } from '../../hooks';
import { ModalContent, ModalContentProps, SheetContent, SheetContentProps } from '@adara-cs/ui-kit-web';

export type ResponsiveModalContentProps = SheetContentProps & ModalContentProps

export const ResponsiveModalContent: FC<ResponsiveModalContentProps> = ({ ...props }) => {
  const { isBreakpoint } = useResponsiveModalContext()

  return isBreakpoint ? <SheetContent {...props} /> : <ModalContent {...props} />
}