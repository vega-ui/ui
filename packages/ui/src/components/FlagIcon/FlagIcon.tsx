'use client';
import { forwardRef } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { FlagIconName, getFlagIcon } from './utils';

export interface FlagIconProps {
  size?: 'small' | 'medium' | 'large'
  name: FlagIconName
  className?: string
  width?: number
  height?: number
  'aria-label'?: string
  'aria-labelledby'?: string
}

/**
 * External component from <code>@adara-cs/flags-icon</code>
 *
 * Icons from <a href="https://flagpack.xyz/docs/flag-index/">Flagpack</a>
 * */
export const FlagIcon = forwardRef<SVGSVGElement, FlagIconProps>(({
  size = 'small',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  name,
  width,
  height,
  className,
  ...props
}, ref) => {
  const Component = getFlagIcon(name);

  return (
    <Component
      role='image'
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-hidden={!ariaLabel && !ariaLabelledby}
      data-testid='icon'
      className={csx(style.icon, className)}
      data-size={width || height ? undefined : size}
      width={width}
      height={height}
      {...props}
      ref={ref}
    />
  )
})