import { DetailedHTMLProps, FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  size?: 'small' | 'medium' | 'large'
  appearance?: 'outline' | 'transparent'
  ref?: Ref<HTMLDivElement>
}

export const Card: FC<CardProps> = ({ children, size = 'medium', appearance = 'outline', className, ref, ...props }) => {
  return (
    <article ref={ref} data-size={size} data-appearance={appearance} className={csx(style.card, className)} {...props}>
      {children}
    </article>
  )
}