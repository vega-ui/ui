import { FC, MouseEvent } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PlusIcon } from '@vega-ui/icons';
import { useSnapshot } from '../../../internals/widget';
import { useNumberFieldContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type NumberFieldIncrementProps = IconButtonProps

/**
 * `NumberFieldIncrementButton` is an action control used within `NumberField`
 * to increase the current numeric value.
 *
 * It integrates with `NumberField` context and delegates all value updates
 * to the internal increment logic, ensuring behavior matches the native
 * `<input>` stepping semantics.
 *
 * This component does not manage state directly and is designed to work
 * exclusively as a child of `NumberField`.
 */
export const NumberFieldIncrementButton: FC<NumberFieldIncrementProps> = ({
  disabled,
  className,
  onClick: _onClick,
  children,
  type = 'button',
  ...props
}) => {
  const { handle, increment, disabled: _disabled, isMax, size } = useNumberFieldContext()
  const readOnly = useSnapshot(handle, (state) => state.readOnly)

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (!event.defaultPrevented) increment()
  }

  return (
    <IconButton
      type={type}
      disabled={(disabled ?? _disabled) || isMax || readOnly}
      size={size}
      onClick={onClick}
      variant='secondary'
      appearance='transparent'
      className={csx(style.button, className)}
      {...props}>
      {children ?? <Icon><PlusIcon/></Icon>}
    </IconButton>
  )
}