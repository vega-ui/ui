import { FC, ReactNode } from 'react';
import { Text } from '../../../Text';
import style from './style.module.css';

export interface AlertBodyProps {
  children: ReactNode
}

export const AlertBody: FC<AlertBodyProps> = ({ children }) => {
  return (
    <Text asChild size={2} className={style.text}>
      <p>{children}</p>
    </Text>
  )
}