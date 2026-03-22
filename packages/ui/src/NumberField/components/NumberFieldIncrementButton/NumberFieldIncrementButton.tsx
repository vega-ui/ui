import { FC } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PlusIcon } from '@vega-ui/icons';
import { useNumberFieldContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
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
  ...props
}) => {
  const { increment, disabled: _disabled, isMax, size } = useNumberFieldContext()

  const onClick = () => {
    increment()
  }

  return (
    <IconButton
      disabled={(disabled ?? _disabled) || isMax}
      size={size}
      onClick={mergeEventHandlers(onClick, _onClick)}
      variant='secondary'
      appearance='transparent'
      className={csx(style.button, className)}
      {...props}>
      {children ?? <Icon><PlusIcon/></Icon>}
    </IconButton>
  )
}