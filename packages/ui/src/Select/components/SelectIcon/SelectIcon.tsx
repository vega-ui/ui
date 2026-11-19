import { FC } from 'react';
import style from './style.module.css';
import { Icon, IconProps } from '../../../Icon';
import { csx } from '@vega-ui/utils';
import { sizeMapper } from './helpers';
import { useSelectContext } from '../../contexts';

export type SelectIconProps = IconProps

/**
 * The icon of the Select trigger, sized by the Select. It has `data-open` while the list is shown. Pass the icon as its children, such as a chevron.
 */
export const SelectIcon: FC<SelectIconProps> = ({ children, className, ...props }) => {
  const { size, open } = useSelectContext()
  
  return (
    <Icon
      className={csx(style.icon, className)}
      data-open={open}
      size={sizeMapper(size ?? 'md')}
      {...props}
    >
      {children}
    </Icon>
  )
}