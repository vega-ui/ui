const THRESHOLD = 3

export type DragIntent = 'pending' | 'along' | 'across'

export const dragIntentOf = (along: number, across: number): DragIntent => {
  if (Math.abs(along) < THRESHOLD && Math.abs(across) < THRESHOLD) return 'pending'

  return Math.abs(across) > Math.abs(along) ? 'across' : 'along'
}
