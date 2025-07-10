import { FC, ReactNode } from 'react';
import { Text } from '../../../Text';
import style from './style.module.css';

export interface AlertTitleProps {
  children?: ReactNode
}

export const AlertTitle: FC<AlertTitleProps> = ({ children }) => {
  return (
    <Text className={style.title} fontWeight={500} size={3} asChild>
      <p>{children}</p>
    </Text>
  )
}