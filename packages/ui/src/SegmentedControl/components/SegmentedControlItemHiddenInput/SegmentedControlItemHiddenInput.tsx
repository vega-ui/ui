import { FC, InputHTMLAttributes } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSegmentedControlContext, useSegmentedControlItemContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import style from './style.module.css'

export type SegmentedControlItemHiddenInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'name'>

/**
 * SegmentedControlItemHiddenInput
 *
 * A visually hidden native `<input type="radio">` used to integrate
 * `SegmentedControl` with native form behavior and accessibility APIs.
 *
 * Notes:
 * - This component is not meant to be used standalone
 * - It should be rendered within a `SegmentedControlItem` to ensure
 *   correct context and behavior
 */
export const SegmentedControlItemHiddenInput: FC<SegmentedControlItemHiddenInputProps> = ({ className, onChange: _onChange, ...props }) => {
  const { onChange, name, disabled, selected } = useSegmentedControlContext()
  const { value } = useSegmentedControlItemContext()
  
  return (
    <VisuallyHidden asChild>
      <input
        className={csx(style.input, className)}
        onChange={mergeEventHandlers(onChange, _onChange)}
        disabled={disabled}
        checked={value === selected}
        type='radio'
        {...props}
        value={value}
        name={name}
      />
    </VisuallyHidden>
  )
}