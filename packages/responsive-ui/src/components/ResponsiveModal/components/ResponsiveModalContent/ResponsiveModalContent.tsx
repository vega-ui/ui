import { FC } from 'react';
import { useResponsiveModalContext } from '../../hooks';
import { ModalContent, ModalContentProps, SheetContent, SheetContentProps } from '@vega-ui/react';

export type ResponsiveModalContentProps = SheetContentProps & ModalContentProps

export const ResponsiveModalContent: FC<ResponsiveModalContentProps> = ({ ...props }) => {
  const { isBreakpoint } = useResponsiveModalContext()

  return isBreakpoint ? <SheetContent {...props} /> : <ModalContent {...props} />
}