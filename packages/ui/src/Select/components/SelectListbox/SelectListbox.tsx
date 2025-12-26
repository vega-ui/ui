import { FC, HTMLAttributes, Ref } from 'react'
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import styles from './style.module.css';
import { useSelectContext } from '../../contexts';
import { FloatingList } from '@floating-ui/react';

export interface SelectListboxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref to the listbox container element.
   *
   * Used internally to connect the listbox to Floating UI
   * and can also be used externally for imperative access
   * (e.g. focus management or measurements).
   */
  ref?: Ref<HTMLDivElement>
}

/**
 * Container for Select options rendered as a listbox.
 *
 * Visibility is controlled via `data-status` and `hidden`, allowing
 * CSS-driven enter/exit animations without unmounting immediately.
 */
export const SelectListbox: FC<SelectListboxProps> = ({
  className,
  children,
  style,
  ref,
  ...props
}) => {
  const { context, status, listboxProps, listboxStyles, elementsRef, labelsRef, open } = useSelectContext()
  
  return (
    <div
      inert={!open}
      role='listbox'
      data-status={status}
      hidden={status === 'unmounted'}
      ref={mergeRefs([context.refs.setFloating, ref])}
      className={csx(styles.listbox, className)}
      style={{ ...listboxStyles, ...style }}
      {...mergeProps(props, listboxProps)}
    >
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        {children}
      </FloatingList>
    </div>
  )
}