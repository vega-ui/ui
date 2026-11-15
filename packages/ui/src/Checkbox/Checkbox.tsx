import { FC, LabelHTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { CheckboxSize, CheckboxVariant } from './types';
import { CheckboxProvider } from './contexts';
import { Slot } from '../Slot';

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
   * Ref to the native label element, or to the child element with `asChild`.
   */
  ref?: Ref<HTMLLabelElement>

  /**
   * Renders the checkbox as its only child instead of a `<label>`, for a checkbox inside another label.
   */
  asChild?: boolean
}

/** A Checkbox is a UI component that allows users to select one or multiple options from a set, toggling between checked and unchecked states. */
export const Checkbox: FC<CheckboxProps> = ({
  ref,
  asChild,
  variant = 'primary',
  size = 'md',
  className,
  children,
 ...props
}) => {
  const Element = asChild ? Slot : 'label'

  return (
    <CheckboxProvider size={size} variant={variant}>
      <Element
        className={csx(style.checkbox, className)}
        data-size={size}
        data-variant={variant}
        ref={ref}
        {...props}
      >
        {children}
      </Element>
    </CheckboxProvider>
  )
}