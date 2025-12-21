import { FC } from 'react';
import { Heading, HeadingProps } from '../../../Heading';

export type DialogTitleProps = HeadingProps

/**
 * `DialogTitle` is a presentational subcomponent of `Dialog` used to render
 * the main title of the drawer.
 *
 * It composes the `Heading` primitive and enforces semantic structure by
 * rendering as an `h2` element with a predefined size suitable for drawer
 * headers.
 */
export const DialogTitle: FC<DialogTitleProps> = (props) => {
  return <Heading as='h2' size={5} {...props} />
}