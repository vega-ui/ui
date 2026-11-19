'use client';
import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Icon, IconProps } from '../../../Icon';
import { useMenuContext } from '../../contexts';
import { sizeMapper } from './helpers';
import style from './style.module.css'

export type MenuItemIndicatorProps = IconProps

/** MenuItemIndicator is the mark of a MenuCheckboxItem or a MenuRadioItem: it keeps its place in every item and shows its children only in a checked one. Pass the check mark as its children. */
export const MenuItemIndicator: FC<MenuItemIndicatorProps> = ({ children, className, ...props }) => {
  const { size } = useMenuContext()

  return (
    <Icon className={csx(style.indicator, className)} size={sizeMapper(size ?? 'md')} {...props}>
      {children}
    </Icon>
  )
}
