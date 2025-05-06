import { DetailedHTMLProps, FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /**
   * Optional custom CSS class for the card container.
   * Use this to override or extend default styles.
   */
  className?: string

  /**
   * Specifies the size of the card.
   * Affects padding, font size, and possibly layout behavior.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Defines the visual style of the card's surface.
   * Controls background and border visibility.
   */
  appearance?: 'outline' | 'transparent'

  /**
   * Ref forwarded to the card’s root element (`<div>`).
   * Useful for DOM measurements, scrolling, or imperative logic.
   */
  ref?: Ref<HTMLDivElement>
}

/** A Card is a UI component that groups related content and actions in a visually distinct container, often used for displaying information in a structured format. */
export const Card: FC<CardProps> = ({ children, size = 'medium', appearance = 'outline', className, ref, ...props }) => {
  return (
    <article ref={ref} data-size={size} data-appearance={appearance} className={csx(style.card, className)} {...props}>
      {children}
    </article>
  )
}