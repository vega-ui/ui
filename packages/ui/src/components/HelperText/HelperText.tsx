import { FC } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Text } from '../Text';
import { sizeMapper } from './utils';

export interface HelperTextProps {
  className?: string
  children?: string | string[]
  size?: 'small' | 'medium' | 'large'
  fontWeight?: 400 | 500 | 700 | 900
  error?: boolean
}

export const HelperText: FC<HelperTextProps> = ({ className, size = 'medium', error, fontWeight, children }) => {
  return (
    <Text as='p' className={csx(style.helperText, className)} data-error={error} size={sizeMapper(size)} fontWeight={fontWeight}>{children}</Text>
  );
}