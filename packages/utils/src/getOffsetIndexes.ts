export const getOffsetIndexes = (start: number, dir: -1 | 1, size: number) => {
  const offsets: number[] = []
  
  if (dir > 0) {
    for (let i = 0; i < size; i++) {
      offsets.push(start + i * dir)
    }
  } else {
    for (let i = size - 1; i >= 0; i--) {
      offsets.push(start + i * dir)
    }
  }
  
  return offsets
}