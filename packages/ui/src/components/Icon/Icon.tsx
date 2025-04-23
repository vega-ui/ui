'use client';
import { FC, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { IconName, getIcon } from './utils';

export interface IconProps {
  /**
   * The name of the icon to render.
   * Must match a key in the IconName type or icon registry.
   */
  name: IconName

  /**
   * Predefined size keyword for the icon.
   * Can be overridden by custom `width` and `height`.
   */
  size?: '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Optional class name for styling the icon container.
   */
  className?: string

  /**
   * Explicit width in pixels for the icon.
   * Overrides the preset from `size` if provided.
   */
  width?: number

  /**
   * Explicit height in pixels for the icon.
   * Overrides the preset from `size` if provided.
   */
  height?: number

  /**
   * Aria label for accessibility.
   * Use when the icon conveys meaningful information without visible text.
   */
  'aria-label'?: string

  /**
   * ID of an element that labels the icon.
   * Alternative to `aria-label` for externalized or localized labels.
   */
  'aria-labelledby'?: string

  /**
   * Ref forwarded to the underlying SVG element.
   * Useful for animation, focus, or measuring.
   */
  ref?: Ref<SVGSVGElement>
}

/** UI component for render SVG icons */
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