import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Icon, IconProps } from '../Icon';
import { Text } from '../Text';
import { iconMapper } from './utils';

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * The content of the alert.
   * Accepts a single React node or an array of nodes.
   */
  children?: ReactNode | ReactNode[]

  /**
   * The name of the icon to display at the start of the alert.
   * Uses the same naming convention as `IconProps['name']`.
   * Pass `false` to hide the icon entirely.
   */
  icon?: IconProps['name'] | false

  /**
   * Optional content rendered at the end of the alert.
   * Useful for action buttons, close icons, or links.
   */
  endSlot?: ReactNode | ReactNode[]

  /**
   * Optional custom CSS class for the alert container.
   * Useful for styling overrides or scoped styles.
   */
  className?: string

  /**
   * The main title or headline of the alert.
   * This is required and displayed prominently.
   */
  title: string

  /**
   * Visual style of the alert.
   * Determines background color, border, and icon style.
   *
   * - 'success': Indicates a positive or successful action
   * - 'error': Indicates an error or failure
   * - 'warning': Indicates a caution or risk
   * - 'info': Neutral informational message
   */
  variant?: 'success' | 'error' | 'warning' | 'info'
}

/** An Alert is a UI component that displays important messages, such as warnings, errors, or confirmations, to grab user attention. */
export const Alert: FC<AlertProps> = ({
  variant = 'info',
  endSlot,
  title,
  icon,
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} data-variant={variant} className={csx(style.alert, className)} {...props}>
      {icon !== false && <Icon className={style.icon} name={icon ?? iconMapper[variant]} size='md' />}
      <div className={style.content}>
        <Text className={style.title} fontWeight={500} size={3} asChild>
          <p>{title}</p>
        </Text>
        {children && (
          <Text asChild size={2} className={style.text}>
            <p>{children}</p>
          </Text>
        )}
      </div>
      {endSlot}
    </div>
  )
}