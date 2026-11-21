'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { toastRegionWidget } from '@vega-ui/widgets/toast';
import { useItem, useOutput } from '../internals/widget';
import { useToastContext, useToastRegionContext } from './contexts';
import style from './style.module.css';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the toast element.
   */
  ref?: Ref<HTMLDivElement>
}

/** Toast is one toast of a ToastRegion: a `role="status"` the screen reader reads once it appears, or pass `role="alert"` for an urgent one. It closes when its time runs out, on Escape, on a swipe or with a ToastClose. Name it with aria-labelledby. */
export const Toast: FC<ToastProps> = ({ className, ref, ...props }) => {
  const { handle } = useToastRegionContext()
  const { key } = useToastContext()
  const register = useItem(handle, key, undefined, toastRegionWidget.output.toast)
  const toastRef = useMergeRefs([register, ref])
  const attrs = useOutput(handle, toastRegionWidget.output.toast, key)

  return <div ref={toastRef} className={csx(style.toast, className)} {...handle.merge(attrs, props)} />
}
