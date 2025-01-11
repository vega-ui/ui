import { FC, HTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export const Separator: FC<SeparatorProps> = ({ orientation = 'horizontal', className, ...props }) => {
  return (
    <div role='separator' {...props} data-orientation={orientation} className={csx(style.separator, className)} />
  );
}