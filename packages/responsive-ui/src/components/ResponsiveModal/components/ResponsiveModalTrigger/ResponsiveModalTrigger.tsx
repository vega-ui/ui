import { FC } from 'react';
import { useResponsiveModalContext } from '../../hooks';
import { ModalTrigger, ModalTriggerProps, SheetTrigger, SheetTriggerProps } from '@adara-cs/ui-kit-web';

export type ResponsiveModalTriggerProps = SheetTriggerProps & ModalTriggerProps;

export const ResponsiveModalTrigger: FC<ResponsiveModalTriggerProps> = ({
  ...props
}) => {
  const { isBreakpoint } = useResponsiveModalContext()

  return isBreakpoint ? <SheetTrigger {...props} /> : <ModalTrigger {...props} />
}