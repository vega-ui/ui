import { FC, HTMLAttributes, Ref } from 'react';
import { csx, mergeProps } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useStore } from '@vega-ui/react-kit/store';
import style from './style.module.css';
import { useSelectContext } from '../../contexts';
import { useListboxContext } from '../../../Listbox/contexts';

export interface SelectComboboxProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Ref to the underlying `<button>` element.
   *
   * Useful for focus management, positioning, and imperative access.
   */
  ref?: Ref<HTMLButtonElement>
}

/**
 * Select combobox trigger component.
 *
 * Renders a button with `role="combobox"` that acts as the main control
 * for opening and closing the Select dropdown
 *
 * Children are typically composed of:
 * - `SelectValue` (current value / placeholder)
 * - `SelectIcon` (dropdown indicator)
 */
export const SelectCombobox: FC<SelectComboboxProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  const { disabled, readOnly, size, variant, open, comboboxProps, setReference } = useSelectContext()
  const { id, store } = useListboxContext()
  const activeId = useStore(store, (state) => state.activeId)
  const mergedRef = useMergeRefs([ref, setReference])
  
  return (
    <button
      role='combobox'
      type='button'
      disabled={disabled}
      data-size={size}
      data-variant={variant}
      data-open={open}
      aria-readonly={readOnly}
      aria-haspopup='listbox'
      aria-expanded={Boolean(open)}
      aria-controls={id}
      popoverTarget={disabled || readOnly ? undefined : id}
      aria-activedescendant={open ? activeId : undefined}
      ref={mergedRef}
      className={csx(style.combobox, className)}
      {...mergeProps(comboboxProps, props)}
    >
      {children}
    </button>
  )
}