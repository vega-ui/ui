import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Slot } from '../Slot';
import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Defines the visual style of the button, affecting color schemes and emphasis.
   */
  variant?: 'primary' | 'secondary'

  /**
   * Adjusts the button's structural appearance (background, border, etc.).
   */
  appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'

  /**
   * Disables the button when true.
   * Prevents user interaction and applies a visually disabled state.
   */
  disabled?: boolean

  /**
   * Optional custom CSS class for the button element.
   * Useful for design system overrides or scoped styles.
   */
  className?: string

  /**
   * When true, renders the button as a child component using `Slot` (e.g., from Radix UI).
   * Enables polymorphic rendering — useful for making the button act as a link or custom tag.
   */
  asChild?: boolean

  /**
   * Content of the button — text, icon, or any React node.
   */
  children?: ReactNode

  /**
   * Ref forwarded to the native `<button>` element.
   * Allows direct DOM access for focus management or measuring.
   */
  ref?: Ref<HTMLButtonElement>
}

export const ButtonBase: FC<ButtonBaseProps> = ({
 className,
 asChild,
 children,
 disabled,
 variant = 'primary',
 appearance = 'fill',
 ref,
 ...props
}) => {
  const Element = asChild ? Slot : 'button';

  return (
    <Element
      {...props}
      disabled={disabled}
      data-variant={variant}
      data-appearance={appearance}
      ref={ref}
      className={csx(style.buttonBase, className)}
    >
      {children}
    </Element>
  )
}