import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { BadgeAppearance, BadgeSize, BadgeVariant } from './types';

export interface BadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Semantic color style of the badge.
   * Indicates the meaning or status represented by the badge.
   *
   * - 'success': For positive/confirmed status
   * - 'error': For error/negative status
   * - 'warning': For cautionary/in-progress status
   * - 'info': For neutral/informational status
   */
  variant?: BadgeVariant

  /**
   * Visual appearance of the badge.
   * Defines how the badge is styled (background, border, etc.).
   */
  appearance?: BadgeAppearance

  /**
   * Size of the badge. Affects padding, font size, and overall dimensions.
   */
  size?: BadgeSize
}

/** A Badge is a UI component that displays small status indicators, counts, or labels, often used to highlight notifications, message counts, or item statuses on top of icons or other UI elements. */
export const Badge: FC<BadgeProps> = ({
  variant = 'success',
  className,
  children,
  size = 'md',
  appearance = 'ghost',
  ref,
  ...props
}) => {
  return (
    <div ref={ref} data-size={size} data-variant={variant} data-appearance={appearance} className={csx(style.badge, className)} {...props}>
      {children}
    </div>
  )
}