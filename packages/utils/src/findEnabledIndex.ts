export const findEnabledIndex = (items: ReadonlyArray<{ disabled?: boolean }>, start: number, step: 1 | -1) => {
  for (let index = start; index >= 0 && index < items.length; index += step) {
    if (!items[index].disabled) return index
  }

  return -1
}
