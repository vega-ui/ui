import { MouseEventHandler, useCallback, useId } from 'react';
import { itemPart, MenuItemKind } from '@vega-ui/widgets/menu';
import { useOutput } from '../../internals/widget';
import { useMenuContext } from '../contexts';

interface MenuItemExtras {
  readonly value?: string
  readonly keepOpen?: boolean
}

export const useMenuItem = <ElementType extends Element>(kind: MenuItemKind, disabled: boolean, label: string | undefined, onClick: MouseEventHandler<ElementType> | undefined, { value, keepOpen }: MenuItemExtras = {}) => {
  const context = useMenuContext()
  const { handle, size } = kind === 'submenu' ? context.parent ?? context : context
  const key = useId()
  const register = useCallback(
    (element: Element | null) => handle.elements.setItem(key, element, element ? { kind, disabled, label: label ?? element.textContent ?? '', value, keepOpen } : undefined),
    [handle, key, kind, disabled, label, value, keepOpen],
  )
  const attrs = useOutput(handle, itemPart, key)

  return { handle, size, register, attrs, onClick: disabled ? undefined : onClick }
}
