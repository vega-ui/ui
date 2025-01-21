import { forwardRef } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { IconName, getIcon } from './utils';

export interface IconProps {
  size?: 'femto' | 'pico' | 'nano' | 'mini' | 'small' | 'medium' | 'large' | 'huge'
  name: IconName
  className?: string
  width?: number
  height?: number
  'aria-label'?: string
  'aria-labelledby'?: string
}

/** UI component for render svg icons */
export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  size = 'small',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  name,
  width,
  height,
  className,
  ...props
}, ref) => {
  const Component = getIcon(name as IconName);

  return (
    <Component
      role='image'
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-hidden={!ariaLabel && !ariaLabelledby}
      data-testid='icon'
      className={csx(style.icon, className)}
      fill='currentColor'
      data-size={width || height ? undefined : size}
      width={width}
      height={height}
      {...props}
      ref={ref}
    />
  )
})