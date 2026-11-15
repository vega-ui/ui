'use client';
import { FC, ReactNode } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { CollapsibleProvider } from './contexts';
import { collapsibleWidget } from '@vega-ui/widgets/collapsible';

export interface CollapsibleProps {
  /**
   * Controls whether the collapsible content is expanded.
   * If provided, the component acts as a controlled component.
   */
  open?: boolean
  
  /**
   * Controls whether the collapsible content default is expanded.
   */
  defaultOpen?: boolean;
  
  /**
   * Callback fired when the open state changes.
   * Called with the next boolean value when toggled.
   */
  onChangeOpen?: (value: boolean) => void

  /**
   * Optional callback that fires when the hidden (visibility) state changes.
   * This can differ from `open` if animations or delays are used.
   */
  onChangeHidden?: (value: boolean) => void

  /**
   * The content to render inside the collapsible container.
   * Can be a single node or a list of React nodes.
   */
  children?: ReactNode | ReactNode[]
  
  /**
   * ID of the collapsible content element.
   *
   * Used to:
   * - link trigger and content via accessibility attributes (`aria-controls`)
   * - expose the expanded region to assistive technologies
   * - provide a stable identifier for testing and DOM querying
   *
   * If not provided, an ID generated internally.
   */
  contentId?: string
}

/** The Collapsible component toggles visibility of its content, supporting controlled state and optional lifecycle callbacks for open and hidden changes */
export const Collapsible: FC<CollapsibleProps> = ({
  open,
  defaultOpen = false,
  onChangeOpen,
  onChangeHidden,
  contentId,
  children
}) => {
  const handle = useWidget(collapsibleWidget, { open, defaultOpen, onChangeOpen, onChangeHidden, contentId }, widgetEnvironment)

  return (
    <CollapsibleProvider handle={handle}>
      {children}
    </CollapsibleProvider>
  )
}
