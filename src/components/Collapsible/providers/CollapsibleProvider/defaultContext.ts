import { Ref, TransitionEventHandler } from 'react';

export interface DefaultCollapsibleContext {
  opened: boolean
  hidden: boolean
  open: VoidFunction,
  close: VoidFunction
  contentRef?: Ref<HTMLDivElement>
  wrapperRef?: Ref<HTMLDivElement>
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>
}

export const defaultCollapsibleContext: DefaultCollapsibleContext = {
  opened: false,
  hidden: true,
  open: () => undefined,
  close: () => undefined,
  wrapperRef: undefined,
  contentRef: undefined,
  onTransitionEnd: undefined
}