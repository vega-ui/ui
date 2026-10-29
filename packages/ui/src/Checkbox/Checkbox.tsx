import { FC, LabelHTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { CheckboxSize, CheckboxVariant } from './types';
import { CheckboxProvider } from './contexts';

export interface CheckboxProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Visual variant of the checkbox, for theme or context switching.
   */
  variant?: CheckboxVariant

  /**
   * Size of the checkbox input and its visual marker.
   */
  size?: CheckboxSize

  /**
   * Ref to the native label element.
   */
  ref?: Ref<HTMLLabelElement>
}

/** A Checkbox is a UI component that allows users to select one or multiple options from a set, toggling between checked and unchecked states. */
export const Checkbox: FC<CheckboxProps> = ({
  ref,
  variant = 'primary',
  size = 'md',
  className,
  children,
 ...props
}) => {
  return (
    <CheckboxProvider size={size} variant={variant}>
      <label
        className={csx(style.checkbox, className)}
        data-size={size}
        data-variant={variant}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    </CheckboxProvider>
  )
}