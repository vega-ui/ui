import {
  DetailedHTMLProps,
  FC,
  FocusEvent,
  InputEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  Ref,
  SyntheticEvent,
  useLayoutEffect,
} from 'react';
import { useFormReset } from '@vega-ui/hooks';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { usePinFieldContext } from '../../contexts';
import { VisuallyHidden } from '../../../VisuallyHidden';

export interface PinFieldInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'disabled' | 'maxLength'> {
  ref?: Ref<HTMLInputElement>
}

/**
 * PinFieldInput is the single, visually hidden `<input>` that backs the PinField UI.
 *
 * It stores the full PIN value in one place while the visible pin “cells” render the
 * per-character representation. The input is hidden via `VisuallyHidden` but remains
 * focusable and accessible for keyboard input, screen readers, and browser autofill.
 * It takes `value`, `defaultValue` and `onChange` like a native `<input>`; `disabled`
 * and `maxLength` come from `PinField`, so the slots and the input always agree.
 *
 * The component is fully integrated with `usePinFieldContext()` and is responsible for:
 * - Synchronizing the active cell index based on caret/selection position (`syncActive`)
 * - Resetting the active cell on blur (`setActive(-1)`)
 * - Detecting “select all” state and reflecting it in PinField (`setSelectedAll`)
 *
 * Selection handling:
 * - Uses `onSelect` to determine whether the whole value is selected
 *   (start === 0 && end === value.length) and updates `selectedAll` state.
 *
 * Notes:
 * - `onInput` schedules `syncActive()` in `requestAnimationFrame` to ensure the DOM
 *   selection state is up to date before computing the next active index.
 * - External event handlers passed via props are merged with internal handlers.
 */
export const PinFieldInput: FC<PinFieldInputProps> = ({
  ref,
  value,
  inputMode = 'numeric',
  onKeyDown: _onKeyDown,
  onBlur: _onBlur,
  onFocus: _onFocus,
  onInput: _onInput,
  onSelect: _onSelect,
  ...props
}) => {
  const {
    error,
    disabled,
    inputRef,
    innerInputRef,
    placeholder,
    setValue,
    setActive,
    syncActive,
    maxLength,
    setSelectedAll,
  } = usePinFieldContext()
  
  useLayoutEffect(() => {
    if (!innerInputRef.current) return
    setValue(innerInputRef.current.value)
  }, [value, innerInputRef, setValue])

  useFormReset(innerInputRef, () => {
    if (!innerInputRef.current) return
    setValue(innerInputRef.current.defaultValue)
  })

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value
    syncActive(value.length)
  }
  
  const onBlur = () => {
    setActive(-1)
  }
  
  const onInput = (e: InputEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    if (e.currentTarget.selectionStart === null) return;
    
    requestAnimationFrame(() => syncActive())
  }
  
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value
    const start= input.selectionStart

    if (e.shiftKey) return

    if (e.key === 'ArrowUp' || e.key === 'Home') {
      e.preventDefault()
      syncActive(0)
    }
    
    if (e.key === 'ArrowDown' || e.key === 'End') {
      e.preventDefault()
      syncActive(value.length)
    }
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      
      if (start === null) return;
      syncActive(start - 1)
    }
    
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      
      if (start === null) return
      syncActive(start + 1)
    }
  }
  
  const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value
    
    const start = input.selectionStart
    const end = input.selectionEnd
    
    const all = start === 0 && end === value.length && value.length !== 0
    setSelectedAll(all)
  }

  return (
    <VisuallyHidden asChild>
      <input
        disabled={disabled}
        aria-invalid={error}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        data-error={error}
        ref={mergeRefs([ref, innerInputRef, inputRef])}
        onSelect={mergeEventHandlers(onSelect, _onSelect)}
        onFocus={mergeEventHandlers(onFocus, _onFocus)}
        onBlur={mergeEventHandlers(onBlur, _onBlur)}
        onInput={mergeEventHandlers(onInput, _onInput)}
        onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
        {...props}
      />
    </VisuallyHidden>
  )
}