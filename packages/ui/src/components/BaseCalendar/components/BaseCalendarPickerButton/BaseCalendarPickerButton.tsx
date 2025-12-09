import { FC } from 'react';
import { Button, ButtonProps } from '../../../Button';
import { useBaseCalendarContext } from '../../hooks';

export type BaseCalendarPickerButtonProps = ButtonProps

/**
 * `BaseCalendarPickerButton` is the foundational trigger component used for
 * toggling secondary calendar views such as the month picker and year
 * picker. It wraps the generic `Button` component while binding its styling
 * to the calendar’s configuration through `useBaseCalendarContext()`.
 */
export const BaseCalendarPickerButton: FC<BaseCalendarPickerButtonProps> = ({ children, ...props }) => {
  const { size, variant } = useBaseCalendarContext()
  
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