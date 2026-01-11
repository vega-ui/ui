import { FC } from 'react';
import { Backdrop, BackdropProps } from '../../../Backdrop';
import { useDrawerContext } from '../../contexts';

export type DrawerBackdropProps = BackdropProps

export const DrawerBackdrop: FC<DrawerBackdropProps> = (props) => {
  const { transitionStatus } = useDrawerContext()
  return <Backdrop visible={transitionStatus === 'open'} {...props} />
}