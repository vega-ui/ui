import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { AlertAppearance, AlertVariant } from './types.ts';
import { AlertProvider } from './contexts';

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * The content of the alert.
   * Accepts a single React node or an array of nodes.
   */
  children?: ReactNode | ReactNode[]

  /**
   * Optional custom CSS class for the alert container.
   * Useful for styling overrides or scoped styles.
   */
  className?: string

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
        data-apperance={appearance}
        data-variant={variant}
        className={csx(style.alert, className)}
        {...props}
      >
        {children}
      </div>
    </AlertProvider>
  )
}