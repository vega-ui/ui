import {
  FC,
  Ref,
  SyntheticEvent,
  KeyboardEvent,
  FormEvent,
  DetailedHTMLProps,
  InputHTMLAttributes
} from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';

export interface PinFieldInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string
  maxLength: number
  className?: string
  placeholder?: string
  ref?: Ref<HTMLInputElement>
  error?: boolean
  disabled?: boolean
  onSelectionRangeChange?: (range: [number, number]) => void
  onComplete?: (e: FormEvent<HTMLInputElement>) => void
}

export const PinFieldInput: FC<PinFieldInputProps> = ({
  id,
  maxLength,
  className,
  placeholder,
  ref,
  error,
  onInput: _onInput,
  disabled,
  onSelectionRangeChange,
  onComplete,
  ...props
}) => {
  const onSelect = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    const input = e.currentTarget

    if (!input) return

    const selectionStart = input.selectionDirection === 'forward' ? input.selectionStart : input.selectionEnd
    const selectionEnd = input.selectionDirection === 'forward' ? input.selectionEnd : input.selectionStart

    if (selectionStart === null || selectionEnd === null) return
    if (selectionStart === selectionEnd) {
      if (selectionEnd === input.maxLength) {
        input.setSelectionRange(selectionEnd - 1, selectionEnd)
        onSelectionRangeChange?.([selectionEnd - 1, selectionEnd])
        return
      }

      input.setSelectionRange(selectionEnd, selectionEnd + 1)
      onSelectionRangeChange?.([selectionEnd, selectionEnd + 1])

      return
    }

    onSelectionRangeChange?.([selectionStart, selectionEnd])
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    _onInput?.(e)

    if (e.currentTarget.value.length === maxLength) onComplete?.(e)
  }

  return (
    <input
      id={id}
      onSelect={onSelect}
      onInput={onInput}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-invalid={error}
      maxLength={maxLength}
      data-error={error}
      ref={ref}
      placeholder={placeholder}
      className={csx(style.input, className)}
      {...props}
    />
  )
}