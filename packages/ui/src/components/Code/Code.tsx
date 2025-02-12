import { FC, ReactNode, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Text, TextProps } from '../Text';
import { TextSize } from '../Text/Text.tsx';

export interface CodeProps extends Omit<TextProps<'code'>, 'as'> {
  children?: ReactNode | ReactNode[]
  className?: string
  size?: TextSize
  ref?: Ref<HTMLElement>
}

export const Code: FC<CodeProps> = ({
  size,
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <Text as='code' className={csx(style.code, className)} size={size} ref={ref} {...props}>
      {children}
    </Text>
  )
}