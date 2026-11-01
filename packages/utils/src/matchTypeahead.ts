export const matchTypeahead = (
  items: ReadonlyArray<{ label: string, disabled?: boolean }>,
  query: string,
  activeIndex: number | null,
) => {
  const search = query.toLocaleLowerCase()
  const repeated = [...search].every((char) => char === search[0])
  const needle = repeated ? search[0] : search
  const start = activeIndex === null ? 0 : activeIndex + (repeated ? 1 : 0)

  for (let step = 0; step < items.length; step += 1) {
    const index = (start + step) % items.length
    const item = items[index]

    if (!item.disabled && item.label.trim().toLocaleLowerCase().startsWith(needle)) return index
  }

  return -1
}
