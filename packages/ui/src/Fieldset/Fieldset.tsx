import { FC, PropsWithChildren } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { FieldsetAppearance } from './types.ts';

export interface FieldsetProps {
  /**
   * Visual appearance of the fieldset container.
   */
  appearance?: FieldsetAppearance

  /**
   * Custom CSS class applied to the fieldset element.
   * Useful for styling overrides or scoped themes.
   */
  className?: string
}

/** The Fieldset component groups related form elements together with an optional legend and sublegend, enhancing visual clarity and accessibility */
export const Fieldset: FC<PropsWithChildren<FieldsetProps>> = ({ className, appearance = 'transparent', children }) => {
  return (
    <fieldset data-appearance={appearance} className={csx(style.fieldset, className)}>
      {children}
    </fieldset>
  );
}