'use client';

import { FC, HTMLAttributes } from 'react';
import { Heading } from '../../../Heading';
import { IconButton } from '../../../IconButton';
import style from './style.module.css';
import { useModalContext } from '../../hooks';
import { csx } from '@vega-ui/utils';
import { CloseIcon } from '@vega-ui/icons';

export interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional ID used to associate the heading with ARIA attributes like `aria-labelledby`.
   * Improves accessibility for screen readers.
   */
  headingId?: string

  /**
   * Whether to render a close button within the header.
   * Common for modals that allow user-initiated dismissal.
   */
  withClose?: boolean

  /**
   * The main title text displayed in the modal header.
   */
  title?: string
}

/** The ModalHeader component renders the top section of a modal dialog, typically containing a title and an optional close button, and supports accessibility via headingId for screen reader labeling */
export const ModalHeader: FC<ModalHeaderProps> = ({ title, headingId, withClose = true, className, ...props }) => {
  const { changeOpen } = useModalContext()

  return (
    <header className={csx(style.header, className)} {...props}>
      {title && <Heading as='h2' id={headingId} className={style.title} size={5}>{title}</Heading>}
      {withClose &&
          <IconButton onClick={() => changeOpen(false)} size='small'
                      variant='secondary' appearance='transparent'>
              <CloseIcon />
          </IconButton>}
    </header>
  )
}