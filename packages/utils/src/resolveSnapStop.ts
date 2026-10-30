import { nearest } from './nearest'

/**
 * Returns the stop a drag released at `position` settles at: the stop nearest
 * to it or, when `stepped`, the nearest of `current` and the stops next to it.
 */
export const resolveSnapStop = (stops: readonly number[], current: number, position: number, stepped = false) => {
  const sorted = [...stops].sort((a, b) => a - b)
  const index = sorted.indexOf(current)
  const reachable = stepped ? sorted.slice(Math.max(0, index - 1), index + 2) : sorted

  return reachable[nearest(reachable, position)]
}
