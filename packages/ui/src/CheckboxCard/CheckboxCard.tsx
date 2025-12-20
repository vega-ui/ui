'use client';
import { FC } from 'react';
import { Card, CardProps } from '../Card';
import { CheckboxProps } from '../Checkbox';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { CheckboxCardProvider } from './contexts';
import { CheckboxCardOrientation, CheckboxVariant } from './types.ts';

export interface CheckboxCardProps extends
  Omit<CardProps, 'appearance'>,
  Pick<CheckboxProps, 'onChangeChecked' | 'checked' | 'defaultChecked' | 'indeterminate' | 'disabled'> {
  /**
   * Defines the layout direction of the card content.
   */
  orientation?: CheckboxCardOrientation

  /**
   * Variant that controls the visual style of the checkbox card.
   * Typically used to switch between brand or neutral themes.
   */
  variant?: CheckboxVariant
}

/** A Checkbox Card is a UI component that combines a selectable checkbox with a card layout, allowing users to choose an option while displaying additional information in a structured format. */
export const CheckboxCard: FC<CheckboxCardProps> = ({
  children,
  size = 'md',
  orientation = 'vertical',
  className,
  onChangeChecked,
  checked,
  defaultChecked,
  indeterminate,
  disabled,
  variant = 'primary',
  ...props
}) => {
  return (
    <CheckboxCardProvider
      checked={checked}
      onChangedChecked={onChangeChecked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      indeterminate={indeterminate}
      variant={variant}
      size={size}
    >
      <Card
        data-orientation={orientation}
        data-variant={variant}
        className={csx(className, style.checkboxCard)}
        size={size}
        asChild
        {...props}
      >
        <label>{children}</label>
      </Card>
    </CheckboxCardProvider>
  )
}