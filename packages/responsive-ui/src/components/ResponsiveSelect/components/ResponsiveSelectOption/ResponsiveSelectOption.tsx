import { FC } from 'react';
import { useResponsiveSelectContext } from '../../hooks';
import { SheetSelectOption, SheetSelectOptionProps } from '../../../SheetSelect';
import { SelectOption, SelectOptionProps } from '@adara-cs/ui-kit-web';

export interface ResponsiveSelectOptionProps extends SheetSelectOptionProps, SelectOptionProps {}

export const ResponsiveSelectOption: FC<ResponsiveSelectOptionProps> = ({ value, ...props }) => {
  const { isBreakpoint } = useResponsiveSelectContext()

  if (isBreakpoint) return <SheetSelectOption value={value} {...props} />

  return <SelectOption value={value} {...props} />
}