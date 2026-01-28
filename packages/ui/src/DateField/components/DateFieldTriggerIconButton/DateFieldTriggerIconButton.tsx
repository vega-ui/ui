import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { Icon } from '../../../Icon';
import { CalendarIcon } from '@vega-ui/icons';
import { useDateFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';

export type DateFieldTriggerIconButtonProps = IconButtonProps

/**
 * DateFieldTriggerIconButton — a button component used to trigger the
 * calendar popover in a DateField.
 *
 * Purpose:
 * Provides a clickable icon button that opens the associated calendar picker,
 * visually indicating that a date can be selected.
 */
export const DateFieldTriggerIconButton: FC<DateFieldTriggerIconButtonProps> = ({ children, ...props }) => {
  const { size } = useTextFieldContext()
  const { disabled } = useDateFieldContext()
  
  return (
    <IconButton size={size} variant='secondary' appearance='transparent' disabled={disabled} {...props}>
      {children ?? <Icon><CalendarIcon /></Icon>}
    </IconButton>
  )
}