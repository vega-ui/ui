import { FC, HTMLAttributes } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type MeterTrackProps = HTMLAttributes<HTMLDivElement>

/**
 * A visual track element for the `Meter` component that represents
 * the full available range of values.
 *
 * The track serves as the background layer on top of which the
 * current meter value (fill/indicator) is rendered.
 */
export const MeterTrack: FC<MeterTrackProps> = ({ className, ...props }) => {
  return <div className={csx(style.track, className)} {...props} />
}