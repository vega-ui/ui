import { TransitionEventHandler } from 'react';

export interface DefaultCollapsibleContext {
  opened: boolean
  hidden: boolean
  open: VoidFunction,
  close: VoidFunction
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>
}

export const defaultCollapsibleContext: DefaultCollapsibleContext = {
  opened: false,
  hidden: true,
  open: () => undefined,
  close: () => undefined,
  onTransitionEnd: undefined
}