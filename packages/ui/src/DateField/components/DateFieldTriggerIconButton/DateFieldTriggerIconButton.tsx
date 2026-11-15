import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { Icon } from '../../../Icon';
import { CalendarIcon } from '@vega-ui/icons';
import { useDateFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type DateFieldTriggerIconButtonProps = IconButtonProps

/**
 * DateFieldTriggerIconButton — a button component used to trigger the
 * calendar popover in a DateField.
 *
 * Purpose:
 * Provides a clickable icon button that opens the associated calendar picker,
 * visually indicating that a date can be selected. It has
 * `aria-haspopup="dialog"`.
 */
export const DateFieldTriggerIconButton: FC<DateFieldTriggerIconButtonProps> = ({
  children,
  className,
  type = 'button',
  'aria-haspopup': ariaHasPopup = 'dialog',
  ...props
}) => {
  const { size } = useTextFieldContext()
  const { disabled } = useDateFieldContext()

  return (
    <IconButton
      type={type}
      size={size}
      variant='secondary'
      appearance='transparent'
      disabled={disabled}
      aria-haspopup={ariaHasPopup}
      className={csx(style.button, className)}
      {...props}
    >
      {children ?? <Icon><CalendarIcon /></Icon>}
    </IconButton>
  )
}
