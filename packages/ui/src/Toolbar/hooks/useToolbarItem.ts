import { useCallback, useId } from 'react';
import { toolbarWidget } from '@vega-ui/widgets/toolbar';
import { useOutput } from '../../internals/widget';
import { useToolbarContext } from '../contexts';

export const useToolbarItem = <ElementType extends Element>(disabled: boolean) => {
  const { handle, inside } = useToolbarContext()
  const key = useId()
  const register = useCallback(
    (element: ElementType | null) => {
      if (inside) handle.elements.setItem(key, element, element ? { disabled } : undefined)
    },
    [handle, inside, key, disabled],
  )
  const attrs = useOutput(handle, toolbarWidget.output.item, key)

  return { register, attrs: inside ? attrs : undefined }
}
