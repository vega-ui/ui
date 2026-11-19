'use client';
import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { toggleWidget } from '@vega-ui/widgets/toggle';
import { useOutput, useWidget, widgetEnvironment } from '../internals/widget';
import { Button, ButtonProps, ButtonShape } from '../Button';
import { Slot } from '../Slot';
import style from './style.module.css';

export interface ToggleProps extends Omit<ButtonProps, 'variant' | 'appearance'> {
  /**
   * Whether the toggle is pressed. Enables controlled mode when set.
   */
  pressed?: boolean

  /**
   * Whether the toggle is pressed on mount.
   */
  defaultPressed?: boolean

  /**
   * Called when a click, Enter or Space presses or releases the toggle.
   */
  onChangePressed?: (pressed: boolean) => void

  /**
   * Renders the only child element as the toggle instead of a Button, like a link.
   */
  asChild?: boolean

  /**
   * Disables the toggle, also the child element with `asChild`.
   */
  disabled?: boolean
}

/** Toggle is a button that stays pressed: a click, Enter or Space turns it on and off, and aria-pressed tells assistive technology its state. */
export const Toggle: FC<ToggleProps & ButtonShape> = ({
  pressed,
  defaultPressed,
  onChangePressed,
  asChild,
  children,
  ref,
  className,
  ...props
}) => {
  const handle = useWidget(toggleWidget, { pressed, defaultPressed, onChangePressed }, widgetEnvironment)
  const attrs = useOutput(handle, toggleWidget.output.root)
  const toggleRef = useMergeRefs([handle.root, ref])

  if (asChild) return (
    <Slot
      type='button'
      ref={toggleRef}
      variant='secondary'
      appearance='transparent'
      className={csx(style.toggle, className)}
      {...handle.listen(attrs, props)}
    >
      {children}
    </Slot>
  )

  return (
    <Button
      type='button'
      ref={toggleRef}
      variant='secondary'
      appearance='transparent'
      className={csx(style.toggle, className)}
      {...handle.listen(attrs, props)}
    >
      {children}
    </Button>
  )
}
