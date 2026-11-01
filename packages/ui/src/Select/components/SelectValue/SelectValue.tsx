import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { useSelectContext } from '../../contexts';

export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Placeholder text shown when no option is selected.
   *
   * Displayed when the select value is empty or undefined.
   * Once a value is selected, the placeholder is replaced
   * by the selected option’s content.
   */
  placeholder?: string;

  /**
   * Ref forwarded to the root span element.
   */
  ref?: Ref<HTMLSpanElement>;
}

/**
 * `SelectValue` is a visual component responsible for displaying
 * the current value of the Select inside the trigger (combobox).
 *
 * It shows either:
 * - the selected option’s content (passed as `children`), or
 * - a placeholder when no value is selected.
 *
 * Without `children` it shows a copy of the content of the selected option,
 * which exists only on the client and only while that option is rendered.
 * Pass the label as `children` when rendering on the server, when options are filtered,
 * or when the content of an option should not be copied.
 */
export const SelectValue: FC<SelectValueProps> = ({ className, placeholder, children, ref, ...props }) => {
  const { selected, setValueElement } = useSelectContext()

  const hasSelected = selected !== '' && selected !== null && selected !== undefined
  const hasPlaceholder = placeholder !== undefined
  const hasChildren = children !== undefined

  return (
    <span
      ref={ref}
      data-placeholder={hasPlaceholder && !hasSelected}
      className={csx(style.value, className)}
      {...props}
    >
      {hasSelected ? children : placeholder}
      {!hasChildren && <span ref={setValueElement} className={style.content} />}
    </span>
  )
}