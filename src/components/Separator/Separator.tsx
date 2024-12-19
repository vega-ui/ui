import { FC } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';

export interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export const Separator: FC<SeparatorProps> = ({ orientation = 'horizontal', className }) => {
  return (
    <div role='separator' aria-orientation={orientation} data-orientation={orientation} className={csx(style.separator, className)} />
  );
}