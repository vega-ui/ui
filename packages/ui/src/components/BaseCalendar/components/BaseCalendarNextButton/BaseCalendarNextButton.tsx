import { IconButton, IconButtonProps } from '../../../IconButton';
import { FC } from 'react';
import { useBaseCalendarContext } from '../../contexts';

export type BaseCalendarNextButtonProps = IconButtonProps

/**
 * `BaseCalendarNextButton` is the foundational “next” navigation button
 * used by higher-level calendar components (such as `CalendarNextButton`).
 * It wraps the generic `IconButton` while binding its visual appearance to
 * the current calendar configuration via `useBaseCalendarContext()`
 */
export const BaseCalendarNextButton: FC<BaseCalendarNextButtonProps> = ({ children, ...props }) => {
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