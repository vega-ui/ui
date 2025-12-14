import { FC } from 'react';
import { Button, ButtonProps } from '../../../Button';
import { useCalendarBaseContext } from '../../contexts';

export type CalendarBasePickerButtonProps = ButtonProps

/**
 * `CalendarBasePickerButton` is the foundational trigger component used for
 * toggling secondary calendar views such as the month picker and year
 * picker. It wraps the generic `Button` component while binding its styling
 * to the calendar’s configuration through `useBaseCalendarContext()`.
 */
export const CalendarBasePickerButton: FC<CalendarBasePickerButtonProps> = ({ children, ...props }) => {
  const { size, variant } = useCalendarBaseContext()
  
  return (
    <Button
      size={size satisfies ButtonProps['size']}
      variant={variant}
      appearance='transparent'
      {...props}
    >
      {children}
    </Button>
  )
}