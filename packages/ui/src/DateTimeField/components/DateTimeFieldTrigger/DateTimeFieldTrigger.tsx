import { FC } from 'react';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { useDateTimeFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type DateTimeFieldTriggerProps = ButtonProps

/**
 * `DateTimeFieldTrigger` is the button that opens the calendar popover of a DateTimeField, with `aria-haspopup="dialog"`. Pass the icon as its children, with `square` and an `aria-label` for an icon alone, or render your own element with `asChild`.
 */
export const DateTimeFieldTrigger: FC<DateTimeFieldTriggerProps & ButtonShape> = ({
  children,
  className,
  type = 'button',
  'aria-haspopup': ariaHasPopup = 'dialog',
  ...props
}) => {
  const { size } = useTextFieldContext()
  const { disabled } = useDateTimeFieldContext()

  return (
    <Button
      type={type}
      size={size}
      variant='secondary'
      appearance='transparent'
      disabled={disabled}
      aria-haspopup={ariaHasPopup}
      className={csx(style.button, className)}
      {...props}
    >
      {children}
    </Button>
  )
}
