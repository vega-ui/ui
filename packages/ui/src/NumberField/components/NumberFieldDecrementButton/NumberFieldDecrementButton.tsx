import { FC, MouseEvent } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { MinusIcon } from '@vega-ui/icons';
import { useSnapshot } from '../../../internals/widget';
import { useNumberFieldContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type NumberFieldDecrementProps = IconButtonProps

/**
 * `NumberFieldDecrementButton` is an action control used within `NumberField`
 * to decrease the current numeric value.
 *
 * It integrates with `NumberField` context and delegates all value updates
 * to the internal decrement logic, ensuring behavior matches the native
 * `<input>` stepping semantics.
 *
 * This component does not manage state directly and is designed to work
 * exclusively as a child of `NumberField`.
 */
export const NumberFieldDecrementButton: FC<NumberFieldDecrementProps> = ({
  disabled,
  className,
  children,
  onClick: _onClick,
  type = 'button',
  ...props
}) => {
  const { handle, decrement, disabled: _disabled, isMin, size } = useNumberFieldContext()
  const readOnly = useSnapshot(handle, (state) => state.readOnly)

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (!event.defaultPrevented) decrement()
  }

  return (
    <IconButton
      type={type}
      disabled={(disabled ?? _disabled) || isMin || readOnly}
      variant='secondary'
      appearance='transparent'
      onClick={onClick}
      size={size}
      className={csx(style.button, className)}
      {...props}
    >
      {children ?? <Icon><MinusIcon/></Icon>}
    </IconButton>
  )
}