import { forwardRef, ReactNode } from 'react';
import style from './style.module.css'
import { csx } from '../../utils/css';
import { Text, TextProps } from '../Text';
import { TextSize } from '../Text/Text.tsx';

export interface CodeProps extends Omit<TextProps<'code'>, 'as'> {
  children?: ReactNode | ReactNode[]
  className?: string
  size?: TextSize
}

export const Code = forwardRef<HTMLElement, CodeProps>(({
  size,
  className,
  children,
  ...props
}, ref) => {
  return (
    <Text as='code' className={csx(style.code, className)} size={size} ref={ref} {...props}>
      {children}
    </Text>
  )
})