'use client';

import { FC } from 'react';
import { Heading } from '../../../Heading';
import { IconButton } from '../../../IconButton';
import styles from './style.module.css';
import { useModalContext } from '../../hooks';

export interface ModalHeaderProps {
  headingId?: string
  withClose?: boolean
  title?: string
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, headingId, withClose = true }) => {
  const { changeOpen } = useModalContext()

  return (
    <header className={styles.header}>
      {title && <Heading as='h2' id={headingId} className={styles.title} size={6}>{title}</Heading>}
      {withClose &&
          <IconButton onClick={() => changeOpen(false)} name='close' size='small'
                      variant='secondary' appearance='transparent'/>}
    </header>
  )
}