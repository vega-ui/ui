import { FC } from 'react';
import { Text } from '../../../Text';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface SelectPlaceholderProps {
  className?: string
  children?: string
}

export const SelectPlaceholder: FC<SelectPlaceholderProps> = ({ className, children }) => {
  return (
    <Text className={csx(className, style.selectPlaceholder)}>{children}</Text>
  )
}