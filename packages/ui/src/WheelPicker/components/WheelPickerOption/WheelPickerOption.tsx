'use client';

import { CSSProperties, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { SnapScrollerContent } from '../../../SnapScroller';
import { useItem } from '../../../internals/widget';
import { useWheelPickerColumnContext, useWheelPickerOptionContext } from '../../contexts';
import style from '../../style.module.css';

export interface WheelPickerOptionProps<Value extends string | number> extends HTMLAttributes<HTMLDivElement> {
  /**
   * The value of this option, passed to `onChangeValue` of its column once it is selected.
   */
  value: Value

  /**
   * If true, the column skips this option and moves off it when a scroll stops on it.
   * @default false
   */
  disabled?: boolean

  /**
   * Plain text of this option, used for typeahead and as `aria-valuetext` of the column instead of the text of its content.
   */
  label?: string

  /**
   * Ref forwarded to the row element.
   */
  ref?: Ref<HTMLDivElement>
}

/** WheelPickerOption is one option of a WheelPickerColumn, like an `option` of a `select`: a row that stays in place as a stop of the scroll, with a WheelPickerFace inside that turns with the wheel. The column reads its value and text, in a looped column shows it more than once */
export const WheelPickerOption = <Value extends string | number>({
  value,
  label,
  disabled,
  className,
  style: inline,
  children,
  ref,
  ...props
}: WheelPickerOptionProps<Value>) => {
  const { handle } = useWheelPickerColumnContext()
  const { index } = useWheelPickerOptionContext()
  const register = useItem(handle, index)
  const optionRef = useMergeRefs([register, ref])

  return (
    <SnapScrollerContent
      ref={optionRef}
      index={index}
      aria-hidden='true'
      className={csx(style.option, className)}
      data-disabled={disabled || undefined}
      style={{ '--wheel-picker-index': index, ...inline } as CSSProperties}
      {...props}
    >
      {children}
    </SnapScrollerContent>
  )
}
