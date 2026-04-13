import { FC, useLayoutEffect } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { TextProps } from '../../../Text';
import { useSelectContext } from '../../contexts';

export interface SelectValueProps extends TextProps {
  /**
   * Placeholder text shown when no option is selected.
   *
   * Displayed when the select value is empty or undefined.
   * Once a value is selected, the placeholder is replaced
   * by the selected option’s content.
   */
  placeholder?: string;
}

/**
 * `SelectValue` is a visual component responsible for displaying
 * the current value of the Select inside the trigger (combobox).
 *
 * It shows either:
 * - the selected option’s content (passed as `children`), or
 * - a placeholder when no value is selected.
 */
export const SelectValue: FC<SelectValueProps> = ({ className, placeholder, children, ...props }) => {
  const { selected, valueRef, onHasValueChildrenChange } = useSelectContext()

  const hasSelected = selected !== '' && selected !== undefined
  const hasPlaceholder = placeholder !== undefined
  const hasChildren = children !== undefined
  
  useLayoutEffect(() => {
    onHasValueChildrenChange(hasChildren)
  }, [onHasValueChildrenChange, hasChildren])

  return (
    <span
      ref={valueRef}
      data-placeholder={hasPlaceholder && !hasSelected}
      className={csx(style.value, className)}
      {...props}
    >
      {hasSelected ? children : <>{placeholder}</>}
    </span>
  )
}