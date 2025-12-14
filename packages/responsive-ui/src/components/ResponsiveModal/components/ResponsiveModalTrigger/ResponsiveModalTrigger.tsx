import { FC } from 'react';
import { useResponsiveModalContext } from '../../contexts';
import { ModalTrigger, ModalTriggerProps, SheetTrigger, SheetTriggerProps } from '@vega-ui/react';

export type ResponsiveModalTriggerProps = SheetTriggerProps & ModalTriggerProps;

export const ResponsiveModalTrigger: FC<ResponsiveModalTriggerProps> = ({
  ...props
}) => {
  const { isBreakpoint } = useResponsiveModalContext()

  return isBreakpoint ? <SheetTrigger {...props} /> : <ModalTrigger {...props} />
}