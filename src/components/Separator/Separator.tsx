import { FC } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';

export interface SeparatorProps {
  className?: string
}

export const Separator: FC<SeparatorProps> = ({ className }) => {
  return (
    <div role='separator' className={csx(style.separator, className)} />
  );
}