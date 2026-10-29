import { FC, InputHTMLAttributes } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSegmentedControlContext, useSegmentedControlItemContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import style from './style.module.css'

export type SegmentedControlItemInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'name'>

/**
 * SegmentedControlItemInput
 *
 * A visually hidden native `<input type="radio">` used to integrate
 * `SegmentedControl` with native form behavior and accessibility APIs.
 *
 * Notes:
 * - This component is not meant to be used standalone
 * - It should be rendered within a `SegmentedControlItem` to ensure
 *   correct context and behavior
 */
export const SegmentedControlItemInput: FC<SegmentedControlItemInputProps> = ({ className, onChange: _onChange, ...props }) => {
  const { onChange, name, disabled, selected, defaultSelected } = useSegmentedControlContext()
  const { value } = useSegmentedControlItemContext()
  
  const controlled = selected !== undefined
  
  return (
    <VisuallyHidden asChild>
      <input
        className={csx(style.input, className)}
        onChange={mergeEventHandlers(onChange, _onChange)}
        disabled={disabled}
        checked={controlled ? value === selected : undefined}
        defaultChecked={controlled ? undefined : value === defaultSelected}
        type='radio'
        {...props}
        value={value}
        name={name}
      />
    </VisuallyHidden>
  )
}