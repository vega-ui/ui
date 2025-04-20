'use client';
import { FC, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { IconName, getIcon } from './utils';

export interface IconProps {
  size?: '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  name: IconName
  className?: string
  width?: number
  height?: number
  'aria-label'?: string
  'aria-labelledby'?: string
  ref?: Ref<SVGSVGElement>
}

/** UI component for render svg icons */
export const Icon: FC<IconProps> = ({
  size = 'sm',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ref,
  name,
  width,
  height,
  className,
  ...props
}) => {
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
      ref={ref}
      {...props}
    />
  )
}