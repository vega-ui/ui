'use client';

import { FC, InputHTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { mergeRefs } from '@vega-ui/utils';

export interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Sets the native `indeterminate` property of the input.
   * Often used when only some nested items are selected.
   * It has no HTML attribute, so it is applied imperatively.
   */
  indeterminate?: boolean

  /**
   *  The optional `ref` provides direct access to the underlying
   *  * `<input type="checkbox">` element for advanced use cases such
   *  * as focus management or imperative state inspection.
   */
  ref?: Ref<HTMLInputElement>
}

/**
 * `CheckboxInput` is the native form control backing the custom
 * `Checkbox` component.
 *
 * It renders an actual `<input type="checkbox">`, visually hidden from
 * the UI, to preserve native browser behavior such as form submission,
 * keyboard interaction, focus management, and accessibility semantics.
 *
 * Checked state is set on this input like on a native checkbox:
 * `checked`, `defaultChecked`, `onChange` and `disabled`. The
 * `indeterminate` prop is applied imperatively via a layout effect.
 *
 * This component acts as the single source of truth for form integration
 * and event handling, while all visual representation is delegated to
 * composable Checkbox subcomponents.
 */

export const CheckboxInput: FC<CheckboxInputProps> = ({ ref, indeterminate, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (!inputRef.current) return
    if (indeterminate !== undefined) inputRef.current.indeterminate = indeterminate
  }, [indeterminate]);

  return (
    <VisuallyHidden asChild ref={mergeRefs([inputRef, ref])}>
      <input
        type='checkbox'
        {...props}
      />
    </VisuallyHidden>
  )
}
