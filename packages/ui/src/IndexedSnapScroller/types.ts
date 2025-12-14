import { SnapScrollerApiRef } from '../SnapScroller';

export interface IndexedSnapScrollerApiRef extends SnapScrollerApiRef {
  reset(start?: number, resetKeys?: boolean): void
  indexes: number[]
}