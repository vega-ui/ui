import { FC, ReactNode, Ref, SVGProps } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Slot } from '../Slot';
import { IconSize } from './types';

export interface IconProps extends SVGProps<SVGElement> {
  /**
   * Predefined size token for the icon.
   * Can be overridden by explicit width and height.
   */
  size?: IconSize

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
  children?: ReactNode
}

/** UI component for render SVG icons */
export const Icon: FC<IconProps> = ({
  size,
  ref,
  width,
  height,
  className,
  children,
  ...props
}) => {
  return (
    <Slot
      ref={ref}
      aria-hidden='true'
      className={csx(style.icon, className)}
      data-size={width || height ? undefined : size}
      stroke='currentColor'
      {...props}
    >
      {children}
    </Slot>
  )
}