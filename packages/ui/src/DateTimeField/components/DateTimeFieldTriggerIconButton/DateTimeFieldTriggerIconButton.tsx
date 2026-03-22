import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { Icon } from '../../../Icon';
import { CalendarIcon } from '@vega-ui/icons';
import { useDateTimeFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type DateTimeFieldTriggerIconButtonProps = IconButtonProps

/**
 * DateTimeFieldTriggerIconButton — a button component used to trigger the
 * calendar popover in a DateTimeField.
 *
 * Purpose:
 * Provides a clickable icon button that opens the associated calendar picker,
 * visually indicating that a date can be selected.
 */
export const DateTimeFieldTriggerIconButton: FC<DateTimeFieldTriggerIconButtonProps> = ({ children, className, ...props }) => {
  const { size } = useTextFieldContext()
  const { disabled } = useDateTimeFieldContext()

  return (
    <IconButton size={size} variant='secondary' appearance='transparent' disabled={disabled} className={csx(style.button, className)} {...props}>
      {children ?? <Icon><CalendarIcon /></Icon>}
    </IconButton>
  )
}