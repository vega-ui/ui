'use client';

import { FC, ReactNode, useEffect, useId, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useSnapshot, useWidget, widgetEnvironment } from '../internals/widget';
import { TooltipProvider } from './contexts';
import { tooltipWarmUp } from './helpers';
import { isRendered, REPLACE_TOOLTIP, TooltipGroup, tooltipWidget } from '@vega-ui/widgets/tooltip';
import { anchorNameOf, Placement } from '../internals/anchor';

export interface TooltipProps {
  /**
   * Preferred placement of the tooltip relative to its trigger (e.g., 'top', 'bottom-start').
   * It flips to the opposite side when there is no room.
   *
   * @default 'bottom'
   */
  placement?: Placement

  /**
   * Delay (in milliseconds) before the tooltip appears on hover. It shows at once on keyboard focus,
   * and right after another tooltip closes.
   */
  delayOpen?: number

  /**
   * Delay (in milliseconds) before the tooltip disappears after the pointer leaves the trigger or the tooltip,
   * long enough to move the pointer onto the tooltip. It hides at once on blur.
   *
   * @default 250
   */
  delayClose?: number

  /**
   * The tooltips that warm each other up: right after one of them closes, the next one opens without `delayOpen`.
   * Create a separate group with `createTooltipGroup()`.
   *
   * @default the group of all tooltips on the page
   */
  group?: TooltipGroup

  /**
   * Controls the open state of the tooltip.
   * When set, the component becomes controlled.
   */
  open?: boolean

  /**
   * Initial open state for uncontrolled usage.
   */
  defaultOpen?: boolean

  /**
   * Callback fired when the open state changes.
   *
   * @param state - The new open state (`true` or `false`)
   */
  onChangeOpen?(state: boolean): void

  /**
   * The trigger and content of the tooltip.
   * Should include `TooltipTrigger` and `TooltipContent` components.
   */
  children?: ReactNode
}

/** A Tooltip is a UI component that provides brief, context-sensitive information when a user hovers over or focuses on an element, often displayed as a small popup near the element */
export const Tooltip: FC<TooltipProps> = ({
  placement = 'bottom',
  delayOpen = 500,
  delayClose = 250,
  group: givenGroup,
  open: controlledOpen,
  defaultOpen = false,
  onChangeOpen,
  children,
}) => {
  const id = useId();
  const [content, setContent] = useState<HTMLElement | null>(null);
  const group = givenGroup ?? tooltipWarmUp;
  const handle = useWidget(tooltipWidget, { delayOpen, delayClose, group, open: controlledOpen, defaultOpen, onChangeOpen }, widgetEnvironment);
  const rendered = useSnapshot(handle, isRendered);

  useEffect(() => {
    if (rendered) return group.hold(() => void handle.send(createInput(REPLACE_TOOLTIP)))
  }, [group, rendered, handle]);

  return (
    <TooltipProvider
      handle={handle}
      contentId={content?.id || id}
      placement={placement}
      anchorName={anchorNameOf(id)}
      setContent={setContent}
    >
      {children}
    </TooltipProvider>
  )
}
