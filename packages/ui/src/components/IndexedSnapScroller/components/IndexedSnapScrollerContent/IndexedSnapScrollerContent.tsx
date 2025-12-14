import { FC } from 'react';
import { SnapScrollerContent, SnapScrollerContentProps } from '../../../SnapScroller';
import { useIndexedSnapScrollerContext } from '../../contexts';

export type IndexedSnapScrollerContentProps = Omit<SnapScrollerContentProps, 'index'>

export const IndexedSnapScrollerContent: FC<IndexedSnapScrollerContentProps> = ({ ...props }) => {
  const { index } = useIndexedSnapScrollerContext()
  
  return (
    <SnapScrollerContent index={index} {...props} />
  )
}