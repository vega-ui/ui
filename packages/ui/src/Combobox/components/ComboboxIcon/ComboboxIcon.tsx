import { FC } from 'react';
import { comboboxWidget } from '@vega-ui/widgets/combobox';
import { csx } from '@vega-ui/utils';
import { Icon, IconProps } from '../../../Icon';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useOutput } from '../../../internals/widget';
import { useComboboxContext } from '../../contexts';
import { sizeMapper } from './helpers';
import style from './style.module.css';

export type ComboboxIconProps = IconProps

/**
 * The icon of a `ComboboxTrigger`, sized by the `TextField` like the icon of a Select. It has `data-open` while the list is shown. Pass the icon as its children, such as a chevron.
 */
export const ComboboxIcon: FC<ComboboxIconProps> = ({ children, className, ...props }) => {
  const { size } = useTextFieldContext()
  const { handle } = useComboboxContext()
  const attrs = useOutput(handle, comboboxWidget.output.icon)

  return (
    <Icon className={csx(style.icon, className)} size={sizeMapper(size ?? 'md')} {...attrs} {...props}>
      {children}
    </Icon>
  )
}
