import {
  FC, FormEvent,
  InputHTMLAttributes,
  Ref,
  useId,
  useRef,
  useState
} from 'react';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
import { useControlledState } from '@adara-cs/hooks';
import { useMaskito } from '@maskito/react';
import { MaskitoOptions } from '@maskito/core';
import { PinFieldInput } from './components';
import { PinFieldProvider } from './providers';

export interface PinFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean
  className?: string
  wrapperClassName?: string
  placeholder?: string
  value?: string | number
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  ref?: Ref<HTMLInputElement>
  mask?: Array<RegExp | string> | RegExp
  onComplete?: (e: FormEvent<HTMLInputElement>) => void
}

export const PinField: FC<PinFieldProps> = ({
  className,
  wrapperClassName,
  placeholder,
  error,
  size = 'medium',
  hidden,
  ref,
  maxLength = 4,
  mask,
  children,
  id,
  disabled,
  onComplete,
  inputMode = 'numeric',
  autoComplete = 'one-time-code',
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const maskitoOptions: MaskitoOptions = {
    mask: mask ?? /^\d+$/
  }

  const inputMaskitoRef = useMaskito({ options: maskitoOptions });

  const [value, setValue] = useControlledState(undefined, '')
  const [selectionRange, setSelectionRange] = useState<[number, number] | []>([])

  const inputId = useId()

  return (
    <PinFieldProvider
      slotClassName={style.inputPinBlock}
      disabled={disabled}
      size={size}
      selectionRange={selectionRange}
      onSelectionRangeChange={setSelectionRange}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      inputRef={inputRef}
      inputId={id ?? inputId}
      error={error}
    >
      <div
        data-size={size}
        className={csx(style.inputWrapper, wrapperClassName)}
        hidden={hidden}
        onKeyDown={(e) => {
          const input = inputRef.current

          if (!input) return

          const selectionStart = input.selectionDirection === 'forward' ? input.selectionStart : input.selectionEnd
          const selectionEnd = input.selectionDirection === 'forward' ? input.selectionEnd : input.selectionStart

          if (e.key === 'ArrowLeft' && selectionStart !== null && selectionStart !== 0) {
            if (selectionStart === input.maxLength) inputRef.current?.setSelectionRange(selectionStart - 2, selectionStart - 1)
            else inputRef.current?.setSelectionRange(selectionStart - 1, selectionStart)
          }

          if (e.key === 'ArrowRight' && selectionEnd !== null && selectionEnd !== input.maxLength) {
            inputRef.current?.setSelectionRange(selectionEnd, selectionEnd + 1)
          }

          if (e.key === 'ArrowUp' && value.length > 0) {
            inputRef.current?.setSelectionRange(0, 1)
          }

          if (e.key === 'ArrowDown' && value.length > 0) {
            inputRef.current?.setSelectionRange(value.length - 1, value.length)
          }
        }}
      >
        <div className={style.group}>
          {children}
        </div>
        <PinFieldInput
          autoComplete={autoComplete}
          id={id ?? inputId}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          className={csx(className, style.input)}
          ref={mergeRefs([ref, inputRef, inputMaskitoRef])}
          error={error}
          onInput={(e) => setValue(e.currentTarget.value)}
          onSelectionRangeChange={setSelectionRange}
          onComplete={onComplete}
          inputMode={inputMode}
          onFocus={() => {
            if (selectionRange.length === 0 && maxLength) setSelectionRange([0, 1])
          }}
          {...props}
        />
      </div>
    </PinFieldProvider>
  )
}