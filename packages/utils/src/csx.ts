export const csx = (...rest: (string | undefined)[]) => {
  const tokens = rest.flatMap((value) => value?.split(/\s+/) ?? []).filter(Boolean)
  return Array.from(new Set(tokens)).join(' ')
}
