import { FC } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { MinusIcon } from '@vega-ui/icons';
import { useNumberFieldContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
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
  ...props
}) => {
  const { decrement, disabled: _disabled, isMin, size } = useNumberFieldContext()

  const onClick = () => {
    decrement()
  }

  return (
    <IconButton
      disabled={(disabled ?? _disabled) || isMin}
      variant='secondary'
      appearance='transparent'
      onClick={mergeEventHandlers(onClick, _onClick)}
      size={size}
      className={csx(style.button, className)}
      {...props}
    >
      {children ?? <Icon><MinusIcon/></Icon>}
    </IconButton>
  )
}