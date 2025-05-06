import { FC, PropsWithChildren } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Text } from '../Text';

export interface FieldsetProps {
  /**
   * The main legend for the fieldset.
   * Rendered as the native `<legend>` element at the top.
   */
  legend?: string

  /**
   * Optional secondary text displayed below the legend.
   * Typically used for helper or descriptive context.
   */
  sublegend?: string

  /**
   * Visual appearance of the fieldset container.
   */
  appearance?: 'transparent' | 'outlined'

  /**
   * Custom CSS class applied to the fieldset element.
   * Useful for styling overrides or scoped themes.
   */
  className?: string
}

/** The Fieldset component groups related form elements together with an optional legend and sublegend, enhancing visual clarity and accessibility */
export const Fieldset: FC<PropsWithChildren<FieldsetProps>> = ({ className, appearance = 'transparent', sublegend, legend, children }) => {
  return (
    <fieldset data-appearance={appearance} className={csx(style.fieldset, className)}>
      {(legend || sublegend) && (
        <div className={style.head}>
          {legend && (
            <Text className={style.legend} size={5} fontWeight={500} asChild>
              <legend>
                {legend}
              </legend>
            </Text>
          )}
          {sublegend && <Text className={style.sublegend}>{sublegend}</Text>}
        </div>
      )}
      {children}
    </fieldset>
  );
}