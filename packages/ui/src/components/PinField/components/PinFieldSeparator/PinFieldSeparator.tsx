import { FC } from 'react';
import { usePinFieldContext } from '../../hooks';
import style from './style.module.css'

export const PinFieldSeparator: FC = () => {
  const { size } = usePinFieldContext()

  return (
    <div role='separator' data-size={size} className={style.separator} />
  )
}