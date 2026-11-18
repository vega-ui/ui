import { MouseEventHandler, useCallback, useId } from 'react';
import { itemPart, MenuItemKind } from '@vega-ui/widgets/menu';
import { useOutput } from '../../internals/widget';
import { useMenuContext } from '../contexts';

export const useMenuItem = <ElementType extends Element>(kind: MenuItemKind, disabled: boolean, label: string | undefined, onClick: MouseEventHandler<ElementType> | undefined, value?: string) => {
  const { handle, size } = useMenuContext()
  const key = useId()
  const register = useCallback(
    (element: Element | null) => handle.elements.setItem(key, element, element ? { kind, disabled, label: label ?? element.textContent ?? '', value } : undefined),
    [handle, key, kind, disabled, label, value],
  )
  const attrs = useOutput(handle, itemPart, key)

  return { handle, size, register, attrs, onClick: disabled ? undefined : onClick }
}
