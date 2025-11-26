import { FC } from 'react';
import { SnapScrollerContent, SnapScrollerContentProps } from '../../../SnapScroller';
import { useIndexesSnapScrollerContext } from '../../hooks';

export type IndexedSnapScrollerContentProps = Omit<SnapScrollerContentProps, 'index'>

export const IndexedSnapScrollerContent: FC<IndexedSnapScrollerContentProps> = ({ ...props }) => {
  const { index } = useIndexesSnapScrollerContext()
  
  return (
    <SnapScrollerContent index={index} {...props} />
  )
}