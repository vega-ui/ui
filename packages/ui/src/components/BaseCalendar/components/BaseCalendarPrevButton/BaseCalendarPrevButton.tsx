import { IconButton, IconButtonProps } from '../../../IconButton';
import { FC } from 'react';
import { useBaseCalendarContext } from '../../contexts';

export type BaseCalendarPrevButtonProps = IconButtonProps

/**
 * `BaseCalendarPrevButton` is the foundational “previous” navigation
 * control used by calendar components such as `CalendarPrevButton`.
 * It wraps the generic `IconButton` while automatically applying the
 * calendar’s active styling configuration.
 */
export const BaseCalendarPrevButton: FC<BaseCalendarPrevButtonProps> = ({ children, ...props }) => {
  const { size, variant } = useBaseCalendarContext()
  
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