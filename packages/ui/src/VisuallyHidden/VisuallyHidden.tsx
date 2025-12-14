import { FC, ReactNode, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { Slot } from '../Slot';

export interface VisuallyHiddenProps {
  /**
   * Optional class name for the hidden element.
   * Can be used to override or extend default visually hidden styles.
   */
  className?: string

  /**
   * Renders the content using a child component instead of a native <div>.
   * Useful for integrating into custom elements without extra wrappers.
   */
  asChild?: boolean

  /**
   * The content to be hidden visually but accessible via screen readers.
   * Often used for labels, instructions, or announcements.
   */
  children?: ReactNode

  /**
   * Ref to the visually hidden DOM element.
   * Useful for focus management or measurement in accessible workflows.
   */
  ref?: Ref<HTMLDivElement>
}

/** The VisuallyHidden component renders content that is invisible to sighted users but remains fully accessible to screen readers, enabling hidden labels, instructions, or accessibility-only text */
export const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  className,
  children,
  asChild,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'div';

  return (
    <Element {...props} className={csx(style.visuallyHidden, className)} ref={ref}>{children}</Element>
  )
}