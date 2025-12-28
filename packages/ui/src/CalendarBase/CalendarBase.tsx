import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { CalendarBaseSize, CalendarBaseVariant } from './types';
import { CalendarBaseProvider } from './contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface CalendarBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant for the calendar.
   * Propagated through `CalendarBaseContext` and used by nested
   * controls (buttons, labels, etc.) to keep styling consistent.
   */
  variant?: CalendarBaseVariant;
  
  /**
   * Global size scale for the calendar.
   * Affects nested controls such as navigation buttons, picker triggers,
   * and week labels via `CalendarBaseContext`.
   */
  size?: CalendarBaseSize;
  
  /**
   * Density flag for more compact layouts.
   *
   * When `true`, the root element receives `data-compact="true"`,
   * allowing styles to reduce paddings, gaps, and control heights
   * for a denser calendar presentation.
   *
   * When `false` or `undefined`, the calendar uses the default spacing.
   */
  compact?: boolean;
}

/**
 * `CalendarBase` is the foundational layout and context provider for all
 * calendar components. It establishes the visual theme, sizing, and density
 * settings for the entire calendar subtree and renders a styled container
 * that higher-level calendar components build upon.
 */
export const CalendarBase: FC<PropsWithChildren<CalendarBaseProps>> = ({
  variant = 'secondary',
  size = 'xs',
  compact,
  className,
  children,
  ...props
}) => {
  return (
    <CalendarBaseProvider size={size} variant={variant}>
      <div className={csx(style.baseCalendar, className)} data-compact={compact} {...props}>
        {children}
      </div>
    </CalendarBaseProvider>
  )
}