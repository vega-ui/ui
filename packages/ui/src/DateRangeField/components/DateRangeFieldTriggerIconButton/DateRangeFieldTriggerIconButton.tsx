import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { Icon } from '../../../Icon';
import { CalendarIcon } from '@vega-ui/icons';
import { useDateRangeFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';

export type DateRangeFieldTriggerIconButtonProps = IconButtonProps

/**
 * DateRangeFieldTriggerIconButton — a button component used to trigger the
 * calendar popover in a DateRangeField.
 *
 * Purpose:
 * Provides a clickable icon button that opens the associated calendar picker,
 * visually indicating that a date can be selected.
 */
export const DateRangeFieldTriggerIconButton: FC<DateRangeFieldTriggerIconButtonProps> = ({ children, ...props }) => {
  const { size } = useTextFieldContext()
  const { disabled } = useDateRangeFieldContext()
  
  return (
    <IconButton size={size} variant='secondary' appearance='transparent' disabled={disabled} {...props}>
      {children ?? <Icon><CalendarIcon /></Icon>}
    </IconButton>
  )
}