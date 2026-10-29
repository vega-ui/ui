'use client';
import { FC } from 'react';
import { Card, CardProps } from '../Card';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { CheckboxCardProvider } from './contexts';
import { CheckboxCardOrientation, CheckboxVariant } from './types';

export interface CheckboxCardProps extends Omit<CardProps, 'appearance'> {
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
  variant = 'primary',
  ...props
}) => {
  return (
    <CheckboxCardProvider variant={variant} size={size}>
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