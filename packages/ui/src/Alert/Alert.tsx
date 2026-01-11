import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { AlertAppearance, AlertVariant } from './types';
import { AlertProvider } from './contexts';

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   /**
   * Visual style of the alert.
   * Determines background color, border, and icon style.
   *
   * - 'success': Indicates a positive or successful action
   * - 'error': Indicates an error or failure
   * - 'warning': Indicates a caution or risk
   * - 'info': Neutral informational message
   */
  variant?: AlertVariant

  /**
   * Visual appearance of the badge.
   * Defines how the badge is styled (background, border, etc.).
   */
  appearance?: AlertAppearance
}

/** An Alert is a UI component that displays important messages, such as warnings, errors, or confirmations, to grab user attention. */
export const Alert: FC<AlertProps> = ({
  variant = 'info',
  appearance = 'fill',
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <AlertProvider variant={variant}>
      <div
        ref={ref}
        data-appearance={appearance}
        data-variant={variant}
        className={csx(style.alert, className)}
        {...props}
      >
        {children}
      </div>
    </AlertProvider>
  )
}