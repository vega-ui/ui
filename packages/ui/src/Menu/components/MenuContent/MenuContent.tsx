'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { CONTENT, menuWidget } from '@vega-ui/widgets/menu';
import { useOutput } from '../../../internals/widget';
import { useMenuContext } from '../../contexts';
import style from './style.module.css'

export interface MenuContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Ref forwarded to the <div role="menu"> element.
   */
  ref?: Ref<HTMLDivElement>
}

/** MenuContent is the menu itself: a popover with role="menu", named by its MenuTrigger unless you pass aria-label or aria-labelledby. */
export const MenuContent: FC<MenuContentProps> = ({
  className,
  style: _style,
  ref,
  ...props
}) => {
  const { handle, size, side, align, anchorName, content = menuWidget.output.content } = useMenuContext()
  const attrs = useOutput(handle, content)
  const contentRef = useMergeRefs([handle.rootAt(CONTENT), ref])
  const named = props['aria-label'] !== undefined || props['aria-labelledby'] !== undefined

  return (
    <div
      popover='auto'
      ref={contentRef}
      data-size={size}
      data-side={side}
      data-align={align}
      className={csx(style.content, className)}
      style={{ positionAnchor: anchorName, ..._style }}
      {...handle.listen(named ? { ...attrs, 'aria-labelledby': undefined } : attrs, props)}
    />
  )
}
