'use client';
import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { toggleGroupWidget } from '@vega-ui/widgets/toggle-group';
import { useItem, useOutput } from '../../../internals/widget';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { Slot } from '../../../Slot';
import { useToolbarItem } from '../../../Toolbar/hooks';
import { useToggleGroupContext } from '../../contexts';
import style from './style.module.css';

export interface ToggleGroupToggleProps extends Omit<ButtonProps, 'value' | 'variant' | 'appearance'> {
  /**
   * The value the toggle adds to the value of its ToggleGroup when pressed.
   */
  value: string

  /**
   * Renders the only child element as the toggle instead of a Button, like a link.
   */
  asChild?: boolean

  /**
   * Disables the toggle, also the child element with `asChild`. The arrow keys of the ToggleGroup or a Toolbar skip it.
   */
  disabled?: boolean
}

/** ToggleGroupToggle is one toggle of a ToggleGroup: a `role="radio"` with aria-checked when one is pressed at a time, a button with aria-pressed with `multiple`. Inside a Toolbar it joins the arrow key navigation of the toolbar. */
export const ToggleGroupToggle: FC<ToggleGroupToggleProps & ButtonShape> = ({
  value,
  asChild,
  size,
  disabled: _disabled,
  children,
  ref,
  className,
  ...props
}) => {
  const { handle, size: groupSize, disabled: groupDisabled } = useToggleGroupContext()
  const disabled = groupDisabled === true || _disabled === true
  const register = useItem(handle, value, { disabled })
  const toolbar = useToolbarItem<HTMLButtonElement>(disabled)
  const toggleRef = useMergeRefs([register, toolbar.register, ref])
  const attrs = useOutput(handle, toggleGroupWidget.output.item, value)
  const merged = handle.merge({ ...attrs, ...toolbar.attrs }, props)

  if (asChild) return (
    <Slot
      type='button'
      ref={toggleRef}
      disabled={disabled || undefined}
      size={size ?? groupSize}
      variant='secondary'
      appearance='transparent'
      className={csx(style.toggle, className)}
      {...merged}
    >
      {children}
    </Slot>
  )

  return (
    <Button
      type='button'
      ref={toggleRef}
      disabled={disabled}
      size={size ?? groupSize}
      variant='secondary'
      appearance='transparent'
      className={csx(style.toggle, className)}
      {...merged}
    >
      {children}
    </Button>
  )
}
