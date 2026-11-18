'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { MenuRadioEntry, menuRadioGroupWidget } from '@vega-ui/widgets/menu';
import { useOutput, useWidget, widgetEnvironment } from '../../../internals/widget';
import { MenuRadioGroupProvider } from '../../contexts';
import style from '../MenuGroup/style.module.css'

export interface MenuRadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Value of the checked MenuRadioItem. Enables controlled mode when set.
   */
  value?: string

  /**
   * Value of the MenuRadioItem checked on mount.
   */
  defaultValue?: string

  /**
   * Called with the value of the MenuRadioItem the user checks.
   */
  onChangeValue?: (value: string) => void

  /**
   * Ref forwarded to the <div role="group"> element.
   */
  ref?: Ref<HTMLDivElement>
}

/** MenuRadioGroup is a group of MenuRadioItem where only one is checked. Name it with aria-label or aria-labelledby. */
export const MenuRadioGroup: FC<MenuRadioGroupProps> = ({
  value,
  defaultValue,
  onChangeValue,
  className,
  ref,
  ...props
}) => {
  const handle = useWidget(menuRadioGroupWidget, (items: readonly MenuRadioEntry[]) => ({
    items,
    value,
    defaultValue,
    onChangeValue: (next: string | null) => {
      if (next !== null) onChangeValue?.(next)
    },
  }), widgetEnvironment)
  const attrs = useOutput(handle, menuRadioGroupWidget.output.group)
  const groupRef = useMergeRefs([handle.root, ref])

  return (
    <MenuRadioGroupProvider handle={handle}>
      <div ref={groupRef} className={csx(style.group, className)} {...handle.merge(attrs, props)} />
    </MenuRadioGroupProvider>
  )
}
