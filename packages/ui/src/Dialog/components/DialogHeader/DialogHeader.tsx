'use client';

import { FC, HTMLAttributes } from 'react';
import { Heading } from '../../../Heading';
import { IconButton } from '../../../IconButton';
import style from './style.module.css';
import { useDialogContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import { X as CloseIcon } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

export interface DialogHeaderProps extends HTMLAttributes<HTMLElement> {
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

/** The DialogHeader component renders the top section of a modal dialog, typically containing a title and an optional close button, and supports accessibility via headingId for screen reader labeling */
export const DialogHeader: FC<DialogHeaderProps> = ({ title, headingId, withClose = true, className, ...props }) => {
  const { changeOpen } = useDialogContext()

  return (
    <header className={csx(style.header, className)} {...props}>
      {title && <Heading as='h2' id={headingId} className={style.title} size={5}>{title}</Heading>}
      {withClose &&
          <IconButton onClick={() => changeOpen(false)} size='medium'
                      variant='secondary' appearance='transparent'>
              <Icon><CloseIcon /></Icon>
          </IconButton>}
    </header>
  )
}