import { FC } from 'react';
import { useResponsiveModalContext } from '../../hooks';
import { Heading, ModalHeader } from '@adara-cs/ui-kit-web';
import style from './style.module.css'

export interface ResponsiveModalHeaderProps {
  title?: string
  withClose?: boolean
}

export const ResponsiveModalHeader: FC<ResponsiveModalHeaderProps> = ({ title }) => {
  const { isBreakpoint } = useResponsiveModalContext()

  if (isBreakpoint) {
    return (
      <div className={style.header}>
        <Heading as='h3' size={6}>{title}</Heading>
      </div>
    )
  }

  return (
    <ModalHeader title={title} />
  )
}