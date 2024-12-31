import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '../../utils/css';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  size?: 'small' | 'medium' | 'large'
  appearance?: 'outline' | 'transparent'
}

export const Card = forwardRef<HTMLElement, PropsWithChildren<CardProps>>(({ children, size = 'medium', appearance = 'outline', className, ...props }) => {
  return (
    <article data-size={size} data-appearance={appearance} className={csx(style.card, className)} {...props}>
      {children}
    </article>
  )
})