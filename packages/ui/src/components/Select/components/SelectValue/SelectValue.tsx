import { FC, ReactNode } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';
import { Text } from '../../../Text';

export interface SelectValueProps {
  className?: string
  children?: ReactNode | ReactNode[]
}

export const SelectValue: FC<SelectValueProps> = ({ className, children }) => {
  return (
    <Text className={csx(style.selectValue, className)}>{children}</Text>
  )
}