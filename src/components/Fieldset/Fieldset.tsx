import { FC, PropsWithChildren } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';
import { Text } from '../Text';

export interface FieldsetProps {
  legend?: string
  sublegend?: string
  appearance?: 'transparent' | 'outlined'
  className?: string
}

export const Fieldset: FC<PropsWithChildren<FieldsetProps>> = ({ className, appearance = 'transparent', sublegend, legend, children }) => {
  return (
    <fieldset data-appearance={appearance} className={csx(style.fieldset, className)}>
      {(legend || sublegend) && (
        <div className={style.head}>
          {legend && <Text className={style.legend} size={5} fontWeight={500} as='legend'>{legend}</Text>}
          {sublegend && <Text className={style.sublegend}>{sublegend}</Text>}
        </div>
      )}
      {children}
    </fieldset>
  );
}