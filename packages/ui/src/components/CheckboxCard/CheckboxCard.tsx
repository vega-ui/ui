'use client';
import { FC, Ref } from 'react';
import { Card, CardProps } from '../Card';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { CheckboxCardProvider } from './providers/CheckboxCardProvider';
import { sizeMapper } from './utils';

export interface CheckboxCardProps extends Omit<CardProps, 'appearance'>, Pick<CheckboxProps, 'checked' | 'value' | 'indeterminate'> {
  /**
   * Custom CSS class for the root card-checkbox component.
   * Useful for overriding or extending base styles.
   */
  className?: string

  /**
   * Optional class name for the wrapper around the component.
   * Can be used to apply layout or grid-level styling.
   */
  wrapperClassName?: string

  /**
   * Disables the entire card interaction.
   * Applies a non-interactive and visually disabled state.
   */
  disabled?: boolean

  /**
   * Defines the layout direction of the card content.
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Variant that controls the visual style of the checkbox card.
   * Typically used to switch between brand or neutral themes.
   */
  variant?: 'primary' | 'secondary'

  /**
   * Controls whether the checkbox card is selected.
   * Used in controlled components for full state control.
   */
  checked?: boolean

  /**
   * Checkbox card value used in form submissions or selection groups.
   */
  value?: string

  /**
   * Displays an indeterminate visual state on the checkbox.
   * Must be manually managed — does not affect form behavior.
   */
  indeterminate?: boolean

  /**
   * Ref forwarded to the underlying checkbox input element.
   * Useful for imperative focus or state control.
   */
  ref?: Ref<HTMLInputElement>
}

/** A Checkbox Card is a UI component that combines a selectable checkbox with a card layout, allowing users to choose an option while displaying additional information in a structured format. */
export const CheckboxCard: FC<CheckboxCardProps> = ({
  children,
  size = 'medium',
  orientation = 'vertical',
  className,
  wrapperClassName,
  onChange,
  checked,
  indeterminate,
  value,
  disabled,
  variant = 'primary',
  ref,
  ...props
}) => {
  return (
    <CheckboxCardProvider size={size}>
      <label className={csx(style.checkboxCardWrapper, wrapperClassName)}>
        <Card ref={ref} data-orientation={orientation} data-variant={variant} className={csx(className, style.checkboxCard)}
              size={size} {...props}>
          <div className={style.content}>
            {children}
          </div>
          <Checkbox variant={variant} onChange={onChange} checked={checked} indeterminate={indeterminate} value={value}
                    disabled={disabled} size={sizeMapper(size)} />
        </Card>
      </label>
    </CheckboxCardProvider>
  )
}