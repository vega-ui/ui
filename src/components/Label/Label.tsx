import { FC, ReactNode } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';
import { Text, TextProps } from '../Text';
import { sizeMapper } from './utils';

export interface LabelProps {
  className?: string
  children?: ReactNode | ReactNode[]
  size?: 'small' | 'medium' | 'large'
  fontWeight?: TextProps['fontWeight']
  htmlFor?: string
}

export const Label: FC<LabelProps> = ({ className, size = 'medium', htmlFor, fontWeight = 500, children }) => {
  return (
    <Text as='label' htmlFor={htmlFor} className={csx(style.label, className)} size={sizeMapper(size)} fontWeight={fontWeight}>{children}</Text>
  );
}