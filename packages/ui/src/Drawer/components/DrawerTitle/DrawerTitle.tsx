import { FC } from 'react';
import { Heading, HeadingProps } from '../../../Heading';

export type DrawerTitleProps = HeadingProps

/**
 * `DrawerTitle` is a presentational subcomponent of `Drawer` used to render
 * the main title of the drawer.
 *
 * It composes the `Heading` primitive and enforces semantic structure by
 * rendering as an `h3` element with a predefined size suitable for drawer
 * headers.
 */
export const DrawerTitle: FC<DrawerTitleProps> = (props) => {
  return <Heading as='h3' size={5} {...props} />
}