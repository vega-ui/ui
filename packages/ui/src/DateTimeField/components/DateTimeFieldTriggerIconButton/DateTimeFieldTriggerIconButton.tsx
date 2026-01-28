import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { Icon } from '../../../Icon';
import { CalendarIcon } from '@vega-ui/icons';
import { useDateTimeFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';

export type DateTimeFieldTriggerIconButtonProps = IconButtonProps

/**
 * DateTimeFieldTriggerIconButton — a button component used to trigger the
 * calendar popover in a DateTimeField.
 *
 * Purpose:
 * Provides a clickable icon button that opens the associated calendar picker,
 * visually indicating that a date can be selected.
 */
export const DateTimeFieldTriggerIconButton: FC<DateTimeFieldTriggerIconButtonProps> = ({ children, ...props }) => {
  const { size } = useTextFieldContext()
  const { disabled } = useDateTimeFieldContext()
  
  return (
    <IconButton size={size} variant='secondary' appearance='transparent' disabled={disabled} {...props}>
      {children ?? <Icon><CalendarIcon /></Icon>}
    </IconButton>
  )
}