import { FC, FieldsetHTMLAttributes, PropsWithChildren } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { FieldsetAppearance } from './types';

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * Visual appearance of the fieldset container.
   */
  appearance?: FieldsetAppearance
}

/** The Fieldset component groups related form elements together with an optional legend and sublegend, enhancing visual clarity and accessibility */
export const Fieldset: FC<PropsWithChildren<FieldsetProps>> = ({ className, appearance = 'transparent', children, ...props }) => {
  return (
    <fieldset data-appearance={appearance} className={csx(style.fieldset, className)} {...props}>
      {children}
    </fieldset>
  );
}