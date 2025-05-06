import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the spinner.
   * Maps to a scalable design token or type scale.
   * Accepts values from 1 (smallest) to 11 (largest).
   */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

  /**
   * Visual color variant of the spinner.
   */
  variant?: 'primary' | 'secondary'

  /**
   * Ref to the spinner's root container.
   * Useful for imperative DOM access or measurement.
   */
  ref?: Ref<HTMLDivElement>
}

/** A Spinner is a UI component that indicates a loading or processing state, often displayed as a rotating circle or animated graphic, to show that the system is performing an action or waiting for a response */
export const Spinner: FC<SpinnerProps> = ({
  size = 3,
  variant = 'primary',
  className,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} data-size={size} data-variant={variant} className={csx(style.spinner, className)} {...props} />
  )
}