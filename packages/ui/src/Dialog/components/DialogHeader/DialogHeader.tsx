'use client';

import { FC, HTMLAttributes } from 'react';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';

export type DialogHeaderProps = HTMLAttributes<HTMLElement>

/** The DialogHeader component renders the top section of a modal dialog, typically containing a title and an optional close button, and supports accessibility via headingId for screen reader labeling */
export const DialogHeader: FC<DialogHeaderProps> = ({ children, className, ...props }) => {
  return (
    <header className={csx(style.header, className)} {...props}>
      {children}
    </header>
  )
}