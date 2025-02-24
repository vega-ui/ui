'use client';

import { RefObject, useEffect, useMemo, useRef } from 'react';
import { useControlledState, useResize } from '@adara-cs/hooks';
import { inRange } from '@adara-cs/utils';

interface UseSnapPointsOptions {
  containerRef?: RefObject<HTMLElement | null>
  snapPoints?: Array<`${number}px` | number>
  defaultSnapPoint?: number
  activeSnapPoint?: number,
  onChangeActiveSnapPoint?: (value: number) => void,
}

export const useSnapPoints = ({ snapPoints, containerRef, defaultSnapPoint, activeSnapPoint: controlledActiveSnapPoint, onChangeActiveSnapPoint }: UseSnapPointsOptions) => {
  const { height } = useResize()

  const defaultSet = useRef(false)

  const defaultActiveSnapPoint = defaultSnapPoint !== undefined ? 0 : snapPoints ? snapPoints?.length - 1 : 0
  const [activeSnapPoint, setActiveSnapPoint] = useControlledState(controlledActiveSnapPoint, defaultActiveSnapPoint, onChangeActiveSnapPoint)

  const hasSnapPoints = useMemo(() => snapPoints !== undefined && snapPoints.length !== 0, [snapPoints])

  const containerHeight = containerRef?.current?.clientHeight ?? height

  const snapPointsInDimensions = useMemo(() =>
    snapPoints ? snapPoints?.map((v: string | number) => typeof v === 'number' ? ((1 - v) * containerHeight) : (containerHeight - parseFloat(v))) : []
  , [snapPoints, containerHeight])

  const sortedSnapPointsInDimensions = useMemo(() => [...snapPointsInDimensions].sort((a, b) => a - b), [snapPointsInDimensions])

  useEffect(() => {
    if (!defaultSet.current && defaultSnapPoint !== undefined) {
      setActiveSnapPoint(sortedSnapPointsInDimensions.findIndex(v => v === snapPointsInDimensions[defaultSnapPoint]))
      defaultSet.current = true
    }
  }, [defaultSnapPoint, setActiveSnapPoint, snapPointsInDimensions, sortedSnapPointsInDimensions]);

  const activeSnapPointValue = useMemo(() =>
    sortedSnapPointsInDimensions.length !== 0
      ? sortedSnapPointsInDimensions[activeSnapPoint]
      : 0
    , [sortedSnapPointsInDimensions, activeSnapPoint]
  )

  const isFirstSnapPoint = useMemo(() => activeSnapPoint === 0, [activeSnapPoint])

  const findClosestSnapPointIndex = (dimension: number, direction?: -1 | 1) => {
    const firstSnapPoint = sortedSnapPointsInDimensions[0]
    const lastSnapPoint = sortedSnapPointsInDimensions[sortedSnapPointsInDimensions.length - 1]

    if (dimension > lastSnapPoint) return sortedSnapPointsInDimensions.length - 1
    if (dimension < firstSnapPoint) return 0

    for (let i = 0; i < sortedSnapPointsInDimensions.length - 1; i++) {
      const prev = sortedSnapPointsInDimensions[i]
      const next = sortedSnapPointsInDimensions[i + 1]

      if (inRange(dimension, [prev, next])) {
        // If the direction is transmitted, we look at which one is closer to it.
        if (direction) {
          if (direction >= 1) return i + 1
          else return i
        }

        // Otherwise, look at the distance to the nearest snap point.
        return Math.abs(prev - dimension) <= Math.abs(next - dimension) ? i : i + 1
      }
    }
  }

  return {
    defaultActiveSnapPoint,
    hasSnapPoints,
    isFirstSnapPoint,
    findClosestSnapPointIndex,
    activeSnapPointValue,
    snapPointsInDimensions,
    activeSnapPoint,
    sortedSnapPointsInDimensions,
    setActiveSnapPoint
  }
}