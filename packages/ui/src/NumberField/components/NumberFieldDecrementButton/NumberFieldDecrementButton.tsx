import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { useSnapshot } from '../../../internals/widget';
import { DECREMENT } from '@vega-ui/widgets/number-field';
import { useNumberFieldContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type NumberFieldDecrementProps = ButtonProps

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
export const NumberFieldDecrementButton: FC<NumberFieldDecrementProps & ButtonShape> = ({
  disabled,
  className,
  children,
  ref,
  type = 'button',
  ...props
}) => {
  const { handle, disabled: _disabled, isMin, size } = useNumberFieldContext()
  const readOnly = useSnapshot(handle, (state) => state.readOnly)
  const mergedRef = useMergeRefs([handle.rootAt(DECREMENT), ref])

  return (
    <Button
      type={type}
      disabled={(disabled ?? _disabled) || isMin || readOnly}
      variant='secondary'
      appearance='transparent'
      size={size}
      className={csx(style.button, className)}
      {...handle.listen({}, props)}
      ref={mergedRef}
    >
      {children}
    </Button>
  )
}