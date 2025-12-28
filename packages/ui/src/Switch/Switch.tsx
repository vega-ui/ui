import { FC, HTMLAttributes, Ref } from 'react'
import style from './style.module.css'
import { csx } from '@vega-ui/utils'
import { SwitchSize, SwitchVariant } from './types';
import { SwitchProvider } from './contexts';

export interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * Visual variant of the checkbox, for theme or context switching.
   */
  variant?: SwitchVariant

  /**
   * Size of the checkbox input and its visual marker.
   */
  size?: SwitchSize

  /**
   * Ref to the native `<input role="switch" type="checkbox">` element.
   * Useful for managing focus, setting indeterminate manually, etc.
   */
  ref?: Ref<HTMLLabelElement>
}

/** A Switch is a UI component that allows users to toggle between two opposing states, such as on and off, typically representing a binary setting or preference. */
export const Switch: FC<SwitchProps> = ({
  ref,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <SwitchProvider size={size} variant={variant}>
      <label
        ref={ref}
        data-size={size}
        data-variant={variant}
        className={csx(style.switch, className)}
        {...props}
      />
    </SwitchProvider>
  )
}
