import { FC, ReactNode, Ref, SVGProps } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Slot } from '../Slot';

export interface IconProps {
  /**
   * Predefined size token for the icon.
   * Can be overridden by explicit width and height.
   */
  size?: '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null

  /** Optional custom class name for styling */
  className?: string

  /** Explicit width in pixels (overrides `size` if set) */
  width?: number

  /** Explicit height in pixels (overrides `size` if set) */
  height?: number

  /** Ref to the SVG element */
  ref?: Ref<SVGSVGElement>
  
  /** Stroke thickness for SVG lines and shapes (in px or pt). */
  strokeWidth?: number

  /**
   * Icon content (required).
   * Accepts:
   * – icons from `~/icons`
   * – custom inline SVG
   * – third-party icon components (e.g. Lucide, Tabler)
   */
  children: ReactNode
}

/** UI component for render SVG icons */
export const Icon: FC<IconProps> = ({
  size = 'sm',
  ref,
  width,
  height,
  className,
  children,
  ...props
}) => {
  return (
    <Slot<SVGProps<SVGElement>>
      role='image'
      className={csx(style.icon, className)}
      ref={ref}
      data-size={width || height ? undefined : size}
      stroke='currentColor'
      width={width}
      height={height}
      {...props}
    >
      {children}
    </Slot>
  )
}