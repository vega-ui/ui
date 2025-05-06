import { FC } from 'react';
import style from './style.module.css';
import { csx, inRange } from '@vega-ui/utils';
import { usePinFieldContext } from '../../hooks';

export interface PinFieldSlotProps {
  /**
   * The zero-based index of the slot within the PinField sequence.
   */
  index: number

  /**
   * Optional class name applied to the individual slot element.
   */
  className?: string
}

/** The PinFieldSlot component represents an individual character position within a PinField, exposing its index for customizing the rendering, behavior, or styling of that specific input cell. */
export const PinFieldSlot: FC<PinFieldSlotProps> = ({
  index,
  className,
}) => {
  const {
    inputId,
    value,
    inputRef,
    selectionRange,
    onSelectionRangeChange,
    placeholder,
    size,
    disabled,
    error,
    slotClassName,
  } = usePinFieldContext()

  const onClick = () => {
    if (!inputRef) return

    if (index <= value.length) {
      inputRef.current?.setSelectionRange(index, index + 1)
      onSelectionRangeChange?.([index, index + 1])
    }

    if (selectionRange && value.length === selectionRange[1]) {
      inputRef.current?.setSelectionRange(index, index + 1)
      onSelectionRangeChange?.([index, index + 1])
    }
  }

  return (
    <label
      data-size={size}
      htmlFor={inputId}
      aria-hidden='true'
      onClick={onClick}
      className={csx(style.slot, slotClassName, className)}
      data-focus={selectionRange ? inRange(index, selectionRange) && inRange(index + 1, selectionRange) : false}
      data-caret={index === selectionRange[0]}
      data-value={value[index]}
      data-disabled={disabled}
      data-error={error}
    >
      {placeholder && !value[index] ? placeholder?.[index] : value[index]}
    </label>
  )
}