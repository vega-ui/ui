import { FC } from 'react';
import { Text, TextProps } from '../../../Text';
import { useCheckboxCardContext } from '../../contexts';
import { sizeMapper } from './helpers';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CheckboxCardDescriptionProps = TextProps

export const CheckboxCardDescription: FC<CheckboxCardDescriptionProps> = ({ className, children, ...props }) => {
  const { size } = useCheckboxCardContext()
  
  return <Text asChild size={sizeMapper(size)} className={csx(style.description, className)} {...props}><p>{children}</p></Text>
}