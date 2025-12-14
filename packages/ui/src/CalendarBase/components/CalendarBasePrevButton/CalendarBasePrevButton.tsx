import { IconButton, IconButtonProps } from '../../../IconButton';
import { FC } from 'react';
import { useCalendarBaseContext } from '../../contexts';

export type CalendarBasePrevButtonProps = IconButtonProps

/**
 * `CalendarBasePrevButton` is the foundational “previous” navigation
 * control used by calendar components such as `CalendarPrevButton`.
 * It wraps the generic `IconButton` while automatically applying the
 * calendar’s active styling configuration.
 */
export const CalendarBasePrevButton: FC<CalendarBasePrevButtonProps> = ({ children, ...props }) => {
  const { size, variant } = useCalendarBaseContext()
  
  return (
    <IconButton
      appearance='ghost'
      variant={variant satisfies IconButtonProps['variant']}
      size={size satisfies IconButtonProps['size']}
      {...props}
    >
      {children}
    </IconButton>
  )
}