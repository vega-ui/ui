'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useSnapshot } from '../../../internals/widget';
import styles from './style.module.css';
import { usePopoverContext } from '../../contexts';
import { CONTENT, isRendered, popoverWidget } from '@vega-ui/widgets/popover';

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Applies a visual shadow to the component container.
   * Adds elevation and depth, visually separating the content from the background.
   */
  shadowed?: boolean

  /**
   * Ref forwarded to the native `[popover]` element.
   * Useful for focus management, animations, or measuring position.
   */
  ref?: Ref<HTMLDivElement>
}

/** The PopoverContent component is the native `popover="auto"` panel of a Popover: the browser shows it in the top layer, closes it on an outside click or `Escape`, and returns focus to the trigger, while its children render only while it is open */
export const PopoverContent: FC<PopoverContentProps> = ({
  ref,
  shadowed = true,
  className,
  children,
  style,
  ...props
}) => {
  const { handle, contentId, placement = 'bottom', anchorName, setContent } = usePopoverContext()
  const attrs = useOutput(handle, popoverWidget.output.content)
  const rendered = useSnapshot(handle, isRendered)
  const mergedRef = useMergeRefs([handle.rootAt(CONTENT), setContent, ref])
  const [side, align = 'center'] = placement.split('-')

  return (
    <div
      id={contentId}
      ref={mergedRef}
      style={{ positionAnchor: anchorName, ...style }}
      data-shadowed={shadowed}
      data-side={side}
      data-align={align}
      className={csx(styles.content, className)}
      {...handle.listen(attrs, props)}
    >
      {rendered && children}
    </div>
  )
}
