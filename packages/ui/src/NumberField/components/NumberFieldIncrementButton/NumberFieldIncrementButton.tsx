import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { useSnapshot } from '../../../internals/widget';
import { INCREMENT } from '@vega-ui/widgets/number-field';
import { useNumberFieldContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type NumberFieldIncrementProps = ButtonProps

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
export const NumberFieldIncrementButton: FC<NumberFieldIncrementProps & ButtonShape> = ({
  disabled,
  className,
  ref,
  children,
  type = 'button',
  ...props
}) => {
  const { handle, disabled: _disabled, isMax, size } = useNumberFieldContext()
  const readOnly = useSnapshot(handle, (state) => state.readOnly)
  const mergedRef = useMergeRefs([handle.rootAt(INCREMENT), ref])

  return (
    <Button
      type={type}
      disabled={(disabled ?? _disabled) || isMax || readOnly}
      size={size}
      variant='secondary'
      appearance='transparent'
      className={csx(style.button, className)}
      {...handle.listen({}, props)}
      ref={mergedRef}>
      {children}
    </Button>
  )
}