import { FC } from 'react';
import style from './style.module.css';
import { Icon } from '../../../Icon';
import { csx } from '@vega-ui/utils';
import { sizeMapper } from './helpers';
import { ChevronDown } from '@vega-ui/icons';
import { SelectSize } from '../../types.ts';

export interface SelectArrowProps {
  open?: boolean
  className?: string
  size?: SelectSize
}

export const SelectArrow: FC<SelectArrowProps> = ({ open, size = 'medium', className }) => {
  return (
    <Icon className={csx(style.selectArrow, className)} data-open={open} size={sizeMapper(size)}>
      <ChevronDown />
    </Icon>
  )
}