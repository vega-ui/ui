'use client';

import { ChangeEvent, FC, InputHTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useCheckboxContext } from '../../contexts';

export interface CheckboxHiddenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   *  The optional `ref` provides direct access to the underlying
   *  * `<input type="checkbox">` element for advanced use cases such
   *  * as focus management or imperative state inspection.
   */
  ref?: Ref<HTMLInputElement>
}

/**
 * `CheckboxHiddenInput` is the native form control backing the custom
 * `Checkbox` component.
 *
 * It renders an actual `<input type="checkbox">`, visually hidden from
 * the UI, to preserve native browser behavior such as form submission,
 * keyboard interaction, focus management, and accessibility semantics.
 *
 * The component synchronizes Checkbox state from context with the
 * underlying DOM input, including the special `indeterminate` property,
 * which is applied imperatively via a layout effect.
 *
 * This component acts as the single source of truth for form integration
 * and event handling, while all visual representation is delegated to
 * composable Checkbox subcomponents.
 */

export const CheckboxHiddenInput: FC<CheckboxHiddenInputProps> = ({ ref, onChange: _onChange, ...props }) => {
  const { disabled, checked, defaultChecked, onChangeChecked, indeterminate } = useCheckboxContext()
  
  const inputRef = useRef<HTMLInputElement>(null)
  
  useLayoutEffect(() => {
    if (!inputRef.current) return
    if (indeterminate !== undefined) inputRef.current.indeterminate = indeterminate
  }, [indeterminate]);
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked?.(e.currentTarget.checked)
  }
  
  return (
    <VisuallyHidden asChild ref={mergeRefs([inputRef, ref])}>
      <input
        type='checkbox'
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={mergeEventHandlers(onChange, _onChange)}
        {...props}
      />
    </VisuallyHidden>
  )
}