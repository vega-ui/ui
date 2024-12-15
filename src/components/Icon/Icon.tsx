import { FC } from 'react';
import style from './style.module.css'
import { csx } from '../../utils/css';
import { IconName, getIcon } from './utils';

export interface IconProps {
  size?: 'pico' | 'nano' | 'mini' | 'small' | 'medium' | 'large' | 'huge'
  name: IconName
  color?: string
  className?: string
  width?: number
  height?: number
  'aria-label'?: string
  'aria-labelledby'?: string
}

/** UI component for render svg icons */
export const Icon: FC<IconProps> = ({ size = 'small', color = 'var(--neutral-1000)', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, name, width, height, className }) => {
  const Component = getIcon(name as IconName);

  return (
    <Component
      role='image'
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-hidden={!ariaLabel && !ariaLabelledby}
      data-testid='icon'
      className={csx(style.icon, className)}
      fill={color}
      data-size={width || height ? undefined : size}
      width={width}
      height={height}
    />
  )
}