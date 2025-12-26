import {
  DetailedHTMLProps,
  FC,
  FocusEvent,
  InputEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  Ref,
  SyntheticEvent
} from 'react';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { usePinFieldContext } from '../../contexts';
import { VisuallyHidden } from '../../../VisuallyHidden';

export interface PinFieldHiddenInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  ref?: Ref<HTMLInputElement>
}

/**
 * PinFieldHiddenInput is the single, visually hidden `<input>` that backs the PinField UI.
 *
 * It stores the full PIN value in one place while the visible pin “cells” render the
 * per-character representation. The input is hidden via `VisuallyHidden` but remains
 * focusable and accessible for keyboard input, screen readers, and browser autofill.
 *
 * The component is fully integrated with `usePinFieldContext()` and is responsible for:
 * - Synchronizing the active cell index based on caret/selection position (`syncActive`)
 * - Writing the current value into PinField state on input (`setValue`)
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
export const PinFieldHiddenInput: FC<PinFieldHiddenInputProps> = ({
  ref,
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
    setActive,
    syncActive,
    setValue,
    maxLength,
    setSelectedAll,
  } = usePinFieldContext()
  
  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value
    syncActive(value.length)
  }
  
  const onBlur = () => {
    setActive(-1)
  }
  
  const onInput = (e: InputEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value;
    
    if (input.selectionStart === null) return;
    
    setValue(value)
    requestAnimationFrame(() => syncActive())
  }
  
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value
    const start= input.selectionStart
    
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      syncActive(0)
    }
    
    if (e.key === 'ArrowDown') {
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