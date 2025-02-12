import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Icon, IconProps } from '../Icon';
import { Text } from '../Text';
import { iconMapper } from './utils';

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode | ReactNode[]
  icon?: IconProps['name'] | false
  endSlot?: ReactNode | ReactNode[]
  className?: string
  title: string
  variant?: 'success' | 'error' | 'warning' | 'info'
}

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
      {icon !== false && <Icon className={style.icon} name={icon ?? iconMapper[variant]} size='medium' />}
      <div className={style.content}>
        <Text className={style.title} fontWeight={500} size={3} as='p'>{title}</Text>
        {children && <Text as='p' size={2} className={style.text}>{children}</Text>}
      </div>
      {endSlot}
    </div>
  )
}