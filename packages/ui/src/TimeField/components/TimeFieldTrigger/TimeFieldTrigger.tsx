import { FC } from 'react';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { useTimeFieldContext } from '../../contexts';
import { useTextFieldContext } from '../../../TextField/contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type TimeFieldTriggerProps = ButtonProps

/**
 * `TimeFieldTrigger` is the button that opens the popover with the wheels of a TimeField, with `aria-haspopup="dialog"`. Pass the icon as its children, with `square` and an `aria-label` for an icon alone, or render your own element with `asChild`.
 */
export const TimeFieldTrigger: FC<TimeFieldTriggerProps & ButtonShape> = ({
  children,
  className,
  type = 'button',
  'aria-haspopup': ariaHasPopup = 'dialog',
  ...props
}) => {
  const { size } = useTextFieldContext()
  const { disabled } = useTimeFieldContext()

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
