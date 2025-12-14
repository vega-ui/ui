import { FC } from 'react';
import { AlertVariant } from '../../types.ts';
import { Icon } from '../../../Icon';
import { iconMapper } from './helpers';
import style from './style.module.css'

export interface AlertIconProps {
  variant: AlertVariant,
}

export const AlertIcon: FC<AlertIconProps> = ({ variant }) => {
  return <Icon size='md' className={style.icon}>{iconMapper[variant]}</Icon>
}