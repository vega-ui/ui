import { FC } from 'react';
import style from './style.module.css';
import { Icon } from '../../../Icon';
import { csx } from '@adara-cs/utils';

export interface SelectArrowProps {
  open?: boolean
  className?: string
}

export const SelectArrow: FC<SelectArrowProps> = ({ open, className }) => {
  return (
    <Icon className={csx(style.selectArrow, className)} data-open={open} name='chevron' size='pico'/>
  )
}