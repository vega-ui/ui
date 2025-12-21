import { FC } from 'react';
import { Text, TextProps } from '../../../Text';
import style from './style.module.css';

export type FieldsetLegendProps = TextProps

/**
 * `FieldsetLegend` is a semantic subcomponent of `Fieldset` used to render
 * the legend (title) for a group of related form controls.
 *
 * It composes the `Text` primitive and renders a native `<legend>` element
 * to preserve proper HTML semantics and accessibility for fieldsets.
 *
 * The component provides consistent typography and styling for fieldset
 * titles while allowing all standard `Text` props for customization.
 *
 * `FieldsetLegend` should be used within `FieldsetHeader` and directly
 * inside a `Fieldset` to ensure correct layout and a11y behavior.
 */
export const FieldsetLegend: FC<FieldsetLegendProps> = ({ children, ...props }) => {
  return (
    <Text className={style.legend} size={5} fontWeight={500} asChild {...props}>
      <legend>{children}</legend>
    </Text>
  )
}