import { FC, HTMLAttributes } from 'react';

export type FieldsetHeaderProps = HTMLAttributes<HTMLElement>

/**
 * `FieldsetHeader` is a structural subcomponent of `Fieldset` used to
 * group and layout header-related content, such as descriptions and
 * header actions. Keep `FieldsetLegend` outside of it, as the first child of `Fieldset`.
 *
 * It renders a semantic `<header>` element and accepts standard HTML
 * attributes for flexible composition and styling.
 */

export const FieldsetHeader: FC<FieldsetHeaderProps> = ({ ...props }) => {
  return <header {...props} />
}