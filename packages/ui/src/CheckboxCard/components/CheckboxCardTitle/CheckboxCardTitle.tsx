import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Heading, HeadingProps } from '../../../Heading';
import { useCheckboxCardContext } from '../../contexts';
import { sizeMapper } from './helpers';
import style from './style.module.css'

export type CheckboxCardTitleProps = HeadingProps

export const CheckboxCardTitle: FC<CheckboxCardTitleProps> = ({ className, ...props }) => {
  const { size } = useCheckboxCardContext()
  console.log(size)
  return <Heading as='h4' className={csx(style.title, className)} size={sizeMapper(size)} {...props} />
}