import { cloneElement, HTMLAttributes, isValidElement, ReactElement, ReactNode } from 'react';
import { mergeProps } from '@vega-ui/utils';

export type SlotProps<Value> = Omit<HTMLAttributes<HTMLElement>, keyof Value> & Record<string, unknown> & {
  /** The single element that receives the props of `Slot`. */
  children: ReactNode
} & Value

export const Slot = <Value,>({ children, ...props }: SlotProps<Value>): ReactElement => {
  if (!isValidElement<{ [p: string]: unknown }>(children)) {
    throw new Error('[Slot] `asChild` must be a valid React-element.');
  }

  return cloneElement(
    children,
    mergeProps(props, children.props ?? {})
  )
}