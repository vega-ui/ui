import { Point, Rect } from '@vega-ui/core'

export interface Aim {
  readonly from: Point
  readonly rect: Rect
}

const SLACK = 4

const sideOf = (point: Point, start: Point, end: Point) => (point.x - end.x) * (start.y - end.y) - (start.x - end.x) * (point.y - end.y)

const inTriangle = (point: Point, first: Point, second: Point, third: Point) => {
  const sides = [sideOf(point, first, second), sideOf(point, second, third), sideOf(point, third, first)]
  const negative = sides.some((value) => value < 0)
  const positive = sides.some((value) => value > 0)

  return !(negative && positive)
}

export const aims = ({ from, rect }: Aim, point: Point) => {
  const towardEnd = rect.x >= from.x
  const edge = towardEnd ? rect.x : rect.x + rect.width
  const apex = { x: towardEnd ? from.x - SLACK : from.x + SLACK, y: from.y }

  return inTriangle(point, apex, { x: edge, y: rect.y }, { x: edge, y: rect.y + rect.height })
}
