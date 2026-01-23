import { SnapScrollerApiRef } from '../SnapScroller';

export interface IndexedSnapScrollerApiRef extends SnapScrollerApiRef {
  setIndexTo(index: number): void;
  index: number
}