import { FC } from 'react';
import style from './style.module.css';
import { csx, inRange } from '@adara-cs/utils';
import { usePinFieldContext } from '../../hooks';

export interface PinFieldSlotProps {
  index: number
}

export const PinFieldSlot: FC<PinFieldSlotProps> = ({ index }) => {
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
      className={csx(style.slot, slotClassName)}
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