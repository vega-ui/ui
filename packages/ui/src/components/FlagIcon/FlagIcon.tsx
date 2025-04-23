'use client';
import { FC, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { FlagIconName, getFlagIcon } from './utils';

export interface FlagIconProps {
  /**
   * The predefined name of the flag icon to display.
   * Typically corresponds to a country or locale code.
   */
  name: FlagIconName

  /**
   * Visual size of the flag icon. Affects its rendered dimensions unless overridden by width/height.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Custom CSS class for styling the SVG element.
   */
  className?: string

  /**
   * Explicit width in pixels. Overrides the default size preset.
   */
  width?: number

  /**
   * Explicit height in pixels. Overrides the default size preset.
   */
  height?: number

  /**
   * Accessible label for screen readers.
   * Use when no visible label is present.
   */
  'aria-label'?: string

  /**
   * ID reference to an element that labels this icon.
   * Alternative to `aria-label` for dynamic or localized labels.
   */
  'aria-labelledby'?: string

  /**
   * Ref forwarded to the underlying SVG element.
   * Useful for DOM access or measurements.
   */
  ref?: Ref<SVGSVGElement>
}

/** The FlagIcon component renders a scalable and accessible SVG flag icon based on a predefined country or region code, with customizable size and ARIA support */
export const FlagIcon: FC<FlagIconProps> = ({
  size = 'small',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  name,
  width,
  height,
  className,
  ref,
  ...props
}) => {
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
}