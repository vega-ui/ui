import { Children, cloneElement, FC, HTMLAttributes, isValidElement, ReactElement, ReactNode } from 'react';
import { mergeProps } from '@adara-cs/utils';

export interface SlotProps extends HTMLAttributes<HTMLElement>, Record<string, unknown> {
  children: ReactNode
}

export const Slot: FC<SlotProps> = ({ children, ...props }) => {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('[Slot] `asChild` must be a valid React-element.');
  }

  const elementToClone = children as ReactElement<{ [p: string]: unknown }>

  return cloneElement(
    elementToClone,
    mergeProps(props, elementToClone.props ?? {})
  )
}